export const SITE_URL = "https://gymequipmentmarketplace.com";

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
