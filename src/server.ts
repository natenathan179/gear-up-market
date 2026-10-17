import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { SITE_URL } from "./lib/seo";
import {
  LOVABLE_ASSET_PREFIX,
  PRODUCT_IMAGE_PROXY_PREFIX,
  lovablePreviewHost,
} from "./lib/product-utils";

const CANONICAL_HOST = new URL(SITE_URL).host;

// Product photos live on Lovable's preview host, which marks every response
// `X-Robots-Tag: noindex, nofollow` — correct for an in-editor preview
// environment, but it means Google Merchant Center and Google Image Search
// both refuse to use those URLs directly (see resolveLovableAssetPath in
// lib/product-utils.ts, which points image URLs at this proxy instead of the
// preview host). This just re-serves the same bytes from our own domain
// without that header, cached at the edge so most requests never leave
// Cloudflare to hit the preview host at all.
const PRODUCT_IMAGE_CACHE_CONTROL = "public, max-age=31536000, immutable";
const PRODUCT_IMAGE_FETCH_TIMEOUT_MS = 8_000;

// Called before the main try/catch below (this isn't a page render, so it
// shouldn't wait behind one), so it has to fail safely on its own — a slow
// or unreachable preview host must not hang or throw past this function.
async function productImageProxy(
  request: Request,
  pathname: string,
): Promise<Response | undefined> {
  if (!pathname.startsWith(PRODUCT_IMAGE_PROXY_PREFIX)) return undefined;
  // HEAD used to fall through to the SSR handler and 404, and image crawlers
  // (Merchant Center included) may probe with HEAD before fetching. Serve it
  // from the same GET response, minus the body.
  if (request.method === "HEAD") {
    const get = await productImageProxy(new Request(request.url, { method: "GET" }), pathname);
    return get && new Response(null, { status: get.status, headers: get.headers });
  }
  if (request.method !== "GET") return undefined;

  const cache = typeof caches !== "undefined" ? await caches.open("product-images") : undefined;
  const cached = await cache?.match(request);
  if (cached) return cached;

  const previewHost = lovablePreviewHost();
  if (!previewHost) return new Response("Not found", { status: 404 });

  const search = new URL(request.url).search;
  const upstreamPath = LOVABLE_ASSET_PREFIX + pathname.slice(PRODUCT_IMAGE_PROXY_PREFIX.length);
  try {
    const upstream = await fetch(`https://${previewHost}${upstreamPath}${search}`, {
      signal: AbortSignal.timeout(PRODUCT_IMAGE_FETCH_TIMEOUT_MS),
    });
    if (!upstream.ok || !upstream.body) {
      return new Response("Not found", {
        status: upstream.status === 200 ? 502 : upstream.status,
      });
    }

    const response = new Response(upstream.body, {
      status: 200,
      headers: {
        "content-type": upstream.headers.get("content-type") ?? "application/octet-stream",
        "cache-control": PRODUCT_IMAGE_CACHE_CONTROL,
      },
    });
    await cache?.put(request, response.clone());
    return response;
  } catch (error) {
    console.error(error);
    return new Response("Bad gateway", { status: 502 });
  }
}

// www, the bare domain and plain http all route to this Worker; without a
// redirect, search engines crawl and index each as a separate copy of every
// page (duplicate-content warnings), and plain http leaves visitors on an
// unencrypted connection instead of landing on the canonical https URL.
//
// Only hosts that are genuinely aliases of the live domain take part in this.
// Lovable's preview host, the *.lovable.app deployment URL and the local dev
// server have to serve normally — bouncing them to a domain that isn't
// connected yet would send every visitor to a dead URL.
function canonicalUrlRedirect(request: Request): Response | undefined {
  const url = new URL(request.url);
  const isLiveDomain = url.host === CANONICAL_HOST || url.host === `www.${CANONICAL_HOST}`;
  if (!isLiveDomain) return undefined;
  if (url.host === CANONICAL_HOST && url.protocol === "https:") return undefined;
  url.host = CANONICAL_HOST;
  url.protocol = "https:";
  return Response.redirect(url, 301);
}

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// Every page response left this Worker with no Cache-Control at all, so
// Cloudflare's edge never served a repeat request without re-running SSR and
// re-querying Supabase from scratch — the dominant remaining cost once the
// query itself was trimmed. Product/listing data doesn't change second to
// second, so a short edge cache turns most visits into an edge hit with no
// Worker execution or database round trip at all. s-maxage governs the
// shared/edge cache; max-age=0 keeps browsers revalidating instead of
// holding a stale copy of a page whose price/availability can change.
const PAGE_CACHE_CONTROL = "public, max-age=0, s-maxage=120, stale-while-revalidate=600";

// Conservative allowlist rather than a denylist: only ever cache plain GET
// page loads, and skip anything auth-gated or session-shaped even though
// their actual per-user content is client-rendered, not part of the SSR
// shell — the cost of excluding them is nothing, and it removes any risk of
// serving one visitor's cached response to another.
function isCacheablePageRequest(request: Request, pathname: string): boolean {
  if (request.method !== "GET") return false;
  if (pathname.startsWith("/admin")) return false;
  if (pathname.startsWith("/cart")) return false;
  return true;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const redirect = canonicalUrlRedirect(request);
    if (redirect) return redirect;

    const pathname = new URL(request.url).pathname;

    const imageProxyResponse = await productImageProxy(request, pathname);
    if (imageProxyResponse) return imageProxyResponse;

    const cacheable = typeof caches !== "undefined" && isCacheablePageRequest(request, pathname);
    const cache = cacheable ? await caches.open("pages") : undefined;
    if (cache) {
      const hit = await cache.match(request);
      if (hit) return hit;
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);

      if (
        cache &&
        normalized.status === 200 &&
        (normalized.headers.get("content-type") ?? "").includes("text/html")
      ) {
        normalized.headers.set("cache-control", PAGE_CACHE_CONTROL);
        await cache.put(request, normalized.clone());
      }

      return normalized;
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
