# Contact pill row animation

## Goal

Animate each contact pill with the same scroll-scrub reveal treatment used by individual technology-stack pills. On narrow viewports, where the contact links wrap into two rows, the first row reveals before the second according to the existing item order.

## Design

`ContactSection` already owns a `useScrubBlockReveal` scope. Each contact `Button` will be placed in its own `data-scrub-reveal` / `gsap-reveal` wrapper within the existing flex-wrap container. The established hook will bind the animation to each pill, preserving its responsive configuration and reduced-motion behavior.

## Scope

- Change only `src/components/ContactSection.tsx`.
- Preserve all contact destinations, button variants, external-link behavior, spacing, and wrapping.
- Add no animation library, breakpoint-specific JavaScript, or custom timeline.

## Validation

- Run lint after the component change.
- Confirm the contact buttons each carry the existing reveal marker and that the project type-check/build succeeds.
