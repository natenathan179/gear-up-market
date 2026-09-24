export type CountryCode = "us" | "ca" | "uk";

interface CountryInfo {
  hreflang: string;
  htmlLang: string;
  label: string;
  prefix: string;
  currency: string;
  symbol: string;
  // Static USD conversion rate — display-only estimate (checkout is
  // inquiry-based and always settles in USD), so this needs no live FX feed,
  // just periodic manual updates as rates drift.
  rate: number;
}

export const countries: Record<CountryCode, CountryInfo> = {
  us: {
    hreflang: "en-US",
    htmlLang: "en-US",
    label: "United States",
    prefix: "",
    currency: "USD",
    symbol: "$",
    rate: 1,
  },
  ca: {
    hreflang: "en-CA",
    htmlLang: "en-CA",
    label: "Canada",
    prefix: "/ca",
    currency: "CAD",
    symbol: "CA$",
    rate: 1.38,
  },
  uk: {
    hreflang: "en-GB",
    htmlLang: "en-GB",
    label: "United Kingdom",
    prefix: "/uk",
    currency: "GBP",
    symbol: "£",
    rate: 0.79,
  },
};

export function formatPrice(usdAmount: number, country: CountryCode = "us"): string {
  const { symbol, rate } = countries[country];
  return `${symbol}${Math.round(usdAmount * rate).toLocaleString()}`;
}

export function countryFromPathname(pathname: string): CountryCode {
  if (pathname === "/ca" || pathname.startsWith("/ca/")) return "ca";
  if (pathname === "/uk" || pathname.startsWith("/uk/")) return "uk";
  return "us";
}
