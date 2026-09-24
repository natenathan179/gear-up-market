import { countries, type CountryCode } from "@/lib/region";

export const SITE_URL = "https://gymequipmentmarketplace.com";

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteUrl(pathOrUrl: string): string {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : canonicalUrl(pathOrUrl);
}

// Builds the hreflang alternate-language link cluster for a page that has
// equivalent versions across countries, plus an x-default pointing at the
// US path. Pass every locale's path for that page, including this one.
export function hreflangLinks(paths: Partial<Record<CountryCode, string>>) {
  const entries = Object.entries(paths) as [CountryCode, string][];
  const defaultPath = paths.us ?? entries[0]?.[1];
  const links = entries.map(([country, path]) => ({
    rel: "alternate",
    hreflang: countries[country].hreflang,
    href: canonicalUrl(path),
  }));
  if (defaultPath) {
    links.push({ rel: "alternate", hreflang: "x-default", href: canonicalUrl(defaultPath) });
  }
  return links;
}
