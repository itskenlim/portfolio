# Global Galaxy Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a static, visible galaxy backdrop across the entire portfolio without reducing foreground readability or removing the existing space field.

**Architecture:** Generate one wide bitmap asset and render it as a fixed decorative sibling within `SiteBackground`. Keep `DottedSurface` intact; position the galaxy layer below the page content and apply a dark blend/overlay so the existing Three.js space field and text remain legible.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS, generated WebP asset, existing Three.js `DottedSurface`

---

## File structure

- Create: `public/background/galaxy-nebula.webp` — dark cyan-violet galaxy asset sized for wide and mobile crops.
- Modify: `src/components/SiteBackground.tsx` — add the fixed decorative galaxy layer before the existing surface.
- Test: no visual-regression framework is configured; validate static references plus TypeScript, lint, build, and browser checks when runtime is available.

### Task 1: Generate and add the galaxy asset

**Files:**

- Create: `public/background/galaxy-nebula.webp`

- [ ] **Step 1: Generate one wide decorative galaxy image**

Create a 16:9 dark-space image with a cyan and violet nebula sweeping diagonally across the outer frame, sparse stars, deep navy-black negative space behind central content, no text, planets, spacecraft, or logos. Export as WebP at 1920×1080.

- [ ] **Step 2: Place the asset in the public background directory**

Save the generated file exactly as `public/background/galaxy-nebula.webp` so it resolves as `/background/galaxy-nebula.webp` without runtime imports.

### Task 2: Layer the galaxy globally

**Files:**

- Modify: `src/components/SiteBackground.tsx:6-8`

- [ ] **Step 1: Add a decorative fixed image layer**

Render a `div` before `DottedSurface` with `aria-hidden`, fixed viewport coverage, `pointer-events-none`, a negative stacking level, and an inline `backgroundImage: "url('/background/galaxy-nebula.webp')"`. Use `bg-cover bg-center bg-no-repeat` and a low opacity so it is visible but does not overpower content.

- [ ] **Step 2: Add the readability veil on the same layer**

Use a dark transparent gradient/overlay on the image layer to keep the middle of the viewport darker than the outer nebula. Keep the layer static: no transform, animation, scroll listener, or parallax behavior.

- [ ] **Step 3: Preserve the existing space surface**

Keep `<DottedSurface onReady={markBackgroundReady} />` unchanged so the current star/asteroid scene and intro readiness signal continue to work.

### Task 3: Verify global use and visual safety

**Files:**

- Modify: `src/components/SiteBackground.tsx`

- [ ] **Step 1: Check asset reference and fixed-layer scope**

Run: `grep -RIn --exclude-dir=node_modules 'galaxy-nebula.webp' src public && sed -n '1,80p' src/components/SiteBackground.tsx`

Expected: the asset appears only in `SiteBackground`, which remains mounted once in the root layout.

- [ ] **Step 2: Run static validation**

Run: `git diff --check && npm run typecheck && npm run lint && npm run build`

Expected: no diff whitespace errors and all project commands exit with code 0.

- [ ] **Step 3: Commit the feature**

Run: `git add public/background/galaxy-nebula.webp src/components/SiteBackground.tsx docs/superpowers/plans/2026-09-07-global-galaxy-background.md && git commit -m 'feat: add global galaxy backdrop'`

Expected: the commit contains the generated asset, global layer, and plan.
