"use client";

import { DottedSurface } from "@/components/ui/dotted-surface";
import { markBackgroundReady } from "@/lib/site-intro";

/** Global galaxy + dotted space field. */
export function SiteBackground() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 right-0 left-0 -z-20 h-lvh min-h-svh overflow-hidden bg-cover bg-center bg-no-repeat lg:inset-0 lg:h-auto"
        style={{
          backgroundImage: "url('/background/galaxy-nebula.webp')",
        }}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(9,9,11,0.86)_0%,rgba(9,9,11,0.52)_42%,rgba(9,9,11,0.28)_100%)]"
        />
      </div>
      <DottedSurface onReady={markBackgroundReady} />
    </>
  );
}
