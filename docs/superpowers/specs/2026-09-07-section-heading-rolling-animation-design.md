# Section heading rolling animation

## Goal

Animate every shared section title with a rolling-letter entrance when its heading scrolls into view, while retaining the existing outlined leading words and solid final word.

## Design

Adapt the supplied GSAP reel animation into the shared `SectionMegaHeading` component. Each non-space character renders a deterministic reel whose final character retains its existing text treatment. A ScrollTrigger starts the reels once when the heading enters the viewport; it does not replace the section-level scrubbed reveal or its upward exit.

## Accessibility and responsiveness

The component remains responsive through the existing `section-mega` typography. For `prefers-reduced-motion`, characters render in their final positions without reel motion.

## Scope

- Modify the shared heading implementation and no individual section components.
- Reuse the installed GSAP and `@gsap/react` packages.
- Preserve `SectionMegaHeading`'s `title` and `className` API and the `MegaTitleText` visual treatment.

## Validation

- Check that the shared heading is still used by all section components.
- Run typecheck, lint, and production build where the runtime is available.
