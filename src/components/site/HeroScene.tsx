import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";

const HeroTreadmill = lazy(() => import("./HeroTreadmill"));

export function HeroScene() {
  return (
    <div
      className="relative h-[300px] w-full sm:h-[380px] lg:h-[460px]"
      aria-hidden="true"
      role="presentation"
    >
      <div className="pointer-events-none absolute inset-0 rounded-full bg-primary/15 blur-3xl" />
      <ClientOnly fallback={null}>
        <Suspense fallback={null}>
          <HeroTreadmill />
        </Suspense>
      </ClientOnly>
    </div>
  );
}
