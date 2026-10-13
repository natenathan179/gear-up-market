import { countries, type CountryCode } from "@/lib/region";

export const SITE_URL = "https://gymequipmentmarketplace.com";

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteUrl(pathOrUrl: string): string {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : canonicalUrl(pathOrUrl);
}

// The marketplace's platform-wide baseline return policy — on top of
// whatever additional warranty an individual dealer or refurbisher offers.
// Kept as one source of truth because it's declared twice: once as its own
// MerchantReturnPolicy block on /returns-and-refunds (for that page's own
// rich-result eligibility), and once nested under every product's Offer via
// hasMerchantReturnPolicy (Google's documented way of tying return-policy
// structured data to Merchant Center's per-product listings). Both must
// stay identical to what's promised in the page's own body text.
export const RETURN_POLICY = {
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 14,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/ReturnShippingFees",
  itemDefectReturnFees: "https://schema.org/FreeReturn",
  refundType: "https://schema.org/FullRefund",
  applicableCountry: ["US", "CA", "GB"],
} as const;

export function merchantReturnPolicySchema() {
  return { "@type": "MerchantReturnPolicy", ...RETURN_POLICY };
}

// Builds the hreflang alternate-language link cluster for a page that has
// equivalent versions across countries, plus an x-default pointing at the
// US path. Pass every locale's path for that page, including this one.
export function hreflangLinks(paths: Partial<Record<CountryCode, string>>) {
  const entries = Object.entries(paths) as [CountryCode, string][];
  const defaultPath = paths.us ?? entries[0]?.[1];
  const links = entries.map(([country, path]) => ({
    rel: "alternate",
    hrefLang: countries[country].hreflang,
    href: canonicalUrl(path),
  }));
  if (defaultPath) {
    links.push({ rel: "alternate", hrefLang: "x-default", href: canonicalUrl(defaultPath) });
  }
  return links;
}
