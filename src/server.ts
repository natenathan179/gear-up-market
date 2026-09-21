import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { SITE_URL } from "./lib/seo";

const CANONICAL_HOST = new URL(SITE_URL).host;

// www, the bare domain and plain http all route to this Worker; without a
// redirect, search engines crawl and index each as a separate copy of every
// page (duplicate-content warnings), and plain http leaves visitors on an
// unencrypted connection instead of landing on the canonical https URL.
function canonicalUrlRedirect(request: Request): Response | undefined {
  const url = new URL(request.url);
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
