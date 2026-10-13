import type { ErrorComponentProps, ErrorRouteComponent } from "@tanstack/react-router";

function Full({ error, reset }: ErrorComponentProps) {
  void error;
  void reset;
  return null;
}

export const v6: ErrorRouteComponent = Full;
export const v7: ErrorRouteComponent = (props) => <Full {...props} />;
