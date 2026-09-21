export const SITE_URL = "https://gymequipmentmarketplace.com";

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteUrl(pathOrUrl: string): string {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : canonicalUrl(pathOrUrl);
}
