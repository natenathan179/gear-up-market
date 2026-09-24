import { createContext, useContext, type ReactNode } from "react";
import type { CountryCode } from "@/lib/region";

const RegionContext = createContext<CountryCode>("us");

export function RegionProvider({
  country,
  children,
}: {
  country: CountryCode;
  children: ReactNode;
}) {
  return <RegionContext.Provider value={country}>{children}</RegionContext.Provider>;
}

export function useRegion(): CountryCode {
  return useContext(RegionContext);
}
