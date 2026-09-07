# Global galaxy background

## Goal

Give the portfolio a visible, static galaxy background across every section while maintaining readable content and the existing dotted-surface effect.

## Design

Generate one wide, dark galaxy bitmap with cyan and violet nebula light, sparse stars, and generous dark negative space. Add it to the existing global `SiteBackground` layer behind `DottedSurface`; it remains fixed while page content scrolls.

## Layering and readability

The galaxy sits above the page base color and below the dotted surface and application content. A dark responsive overlay prevents the image from competing with text, controls, and form surfaces. The asset is decorative and receives no semantic markup.

## Scope

- Add one generated galaxy asset under `public/background/`.
- Modify only the global background component and styles necessary to layer and size it.
- Preserve the existing dotted surface and keep the background static on all viewports.

## Validation

- Confirm the asset is referenced only by the global background layer.
- Check layering at desktop and mobile widths and verify foreground content remains readable.
- Run typecheck, lint, and build where the runtime is available.
