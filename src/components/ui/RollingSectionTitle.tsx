"use client";

import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { useGsapReducedMotion } from "@/hooks/useGsapReducedMotion";
import { gsap, initGsap, ScrollTrigger } from "@/lib/gsap";

type Reel = {
  copies: number;
  to: number;
  duration: number;
};

/** Keeps reel lengths stable across server and client rendering. */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value =
      (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function buildReel(charIndex: number): Reel {
  const random = mulberry32(charIndex * 1013 + 7);
  const to = 3 + Math.floor(random() * 3);

  return {
    copies: to + 1,
    to,
    duration: 2.4 + random() * 1.2,
  };
}

export function RollingSectionTitle({ title }: { title: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useGsapReducedMotion();
  const words = title.trim().split(/\s+/);
  let charIndex = 0;

  useGSAP(
    () => {
      initGsap();
      const container = containerRef.current;
      if (!container || prefersReducedMotion) return;

      const reels = gsap.utils.toArray<HTMLElement>(
        "[data-rolling-reel]",
        container,
      );
      gsap.set(reels, { "--reel-offset": 0 });

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        once: true,
        onEnter: () => {
          reels.forEach((reel) => {
            gsap.to(reel, {
              "--reel-offset": Number(reel.dataset.reelTo),
              duration: Number(reel.dataset.reelDuration),
              ease: "expo.out",
            });
          });
        },
      });

      return () => trigger.kill();
    },
    {
      scope: containerRef,
      dependencies: [title, prefersReducedMotion],
      revertOnUpdate: true,
    },
  );

  return (
    <span ref={containerRef} aria-label={title}>
      {words.map((word, wordIndex) => {
        const outlined = wordIndex < words.length - 1;

        return (
          <span key={`${word}-${wordIndex}`} aria-hidden>
            {word.split("").map((char) => {
              const reel = buildReel(charIndex++);

              return (
                <span
                  key={`${char}-${charIndex}`}
                  className={
                    outlined
                      ? "mega-outline relative inline-block align-top"
                      : "relative inline-block align-top text-foreground"
                  }
                >
                  <span className="block invisible">{char}</span>
                  <span className="absolute inset-0 overflow-hidden">
                    <span
                      data-rolling-reel
                      data-reel-to={reel.to}
                      data-reel-duration={reel.duration}
                      style={
                        prefersReducedMotion
                          ? ({ "--reel-offset": reel.to } as CSSProperties)
                          : undefined
                      }
                      className="block will-change-transform [transform:translate3d(0,calc(-1em*1.02*var(--reel-offset,0)),0)]"
                    >
                      {Array.from({ length: reel.copies }, (_, copy) => (
                        <span
                          key={copy}
                          className="block h-[1.02em] w-full text-center"
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              );
            })}
            {wordIndex < words.length - 1 && " "}
          </span>
        );
      })}
    </span>
  );
}
