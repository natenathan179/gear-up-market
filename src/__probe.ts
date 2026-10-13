import { lazy } from "react";
import type { ErrorRouteComponent } from "@tanstack/react-router";

const Comp = ({ error, reset }: { error: Error; reset: () => void }) => {
  void error;
  void reset;
  return null;
};

export const v1: ErrorRouteComponent = Comp;
export const v2: ErrorRouteComponent = (props) => Comp(props);
export const v3: ErrorRouteComponent = () => null;
export const v4: ErrorRouteComponent = Object.assign(Comp, {
  preload: () => Promise.resolve(),
});
export const v5: ErrorRouteComponent = lazy(() => Promise.resolve({ default: Comp }));
