# Section Heading Rolling Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Roll each shared section-heading letter into place when its heading enters the viewport, preserving outlined and solid title words.

**Architecture:** Create one client-side `RollingSectionTitle` component that owns the GSAP reels and its one-time ScrollTrigger. `SectionMegaHeading` remains the shared public API and delegates its heading content to that component, so all existing section usages receive the effect without individual edits.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, GSAP, `@gsap/react`, Tailwind CSS

---

## File structure

- Create: `src/components/ui/RollingSectionTitle.tsx` — deterministic character reels, viewport trigger, reduced-motion fallback, and outlined-word styling.
- Modify: `src/components/ui/SectionHeading.tsx` — use the rolling title inside the existing `h2` API.
- Test: no component-test framework is configured; validate with TypeScript, ESLint, production build, and static usage checks.

### Task 1: Add the reusable rolling title

**Files:**

- Create: `src/components/ui/RollingSectionTitle.tsx`

- [ ] **Step 1: Add a client component with deterministic reel metadata**

Create a `"use client"` component accepting `title: string`. Split `title.trim()` into words, mark every word except the last as outlined, and render each non-space character as a visually hidden final-size glyph plus an overflow-clipped vertical reel. Use a seeded PRNG based on the character index to produce identical server and client reel lengths.

- [ ] **Step 2: Animate reels once on heading viewport entry**

Use the existing `initGsap`, `gsap`, and `ScrollTrigger` exports from `@/lib/gsap`, plus `useGSAP`. Set each reel to its starting CSS custom property, then create a one-time ScrollTrigger using `trigger: containerRef.current`, `start: "top 85%"`, and `once: true`. On enter, animate each reel’s custom-property value from zero to its deterministic final offset with `expo.out`, durations between 2.4 and 3.6 seconds.

- [ ] **Step 3: Preserve accessibility and reduced motion**

Give the parent visual title an `aria-label` containing the complete title and set all reel glyphs to `aria-hidden`. Use `useGsapReducedMotion`; when enabled, render each reel at its final offset and do not create ScrollTrigger animation.

### Task 2: Route all shared headings through the rolling component

**Files:**

- Modify: `src/components/ui/SectionHeading.tsx:10-34`

- [ ] **Step 1: Replace inline mega-title rendering with the reusable component**

Import `RollingSectionTitle` and replace `<MegaTitleText title={title} />` in `SectionMegaHeading` with `<RollingSectionTitle title={title} />`. Retain the existing `<h2 className={cn("section-mega", className)}>` wrapper, its `title` and `className` props, and the exported `MegaTitleText` helper for compatibility.

- [ ] **Step 2: Confirm shared usage remains centralized**

Run: `grep -RIn --exclude-dir=node_modules 'SectionMegaHeading' src/components`

Expected: About, Contact, Process, Projects, TechStack, and Testimonials import the shared heading; no individual section duplicates animation logic.

### Task 3: Verify the change

**Files:**

- Modify: `src/components/ui/RollingSectionTitle.tsx`
- Modify: `src/components/ui/SectionHeading.tsx`

- [ ] **Step 1: Check whitespace and TypeScript**

Run: `git diff --check && npm run typecheck`

Expected: no diff whitespace errors and TypeScript exits with code 0.

- [ ] **Step 2: Lint and build**

Run: `npm run lint && npm run build`

Expected: both commands exit with code 0.

- [ ] **Step 3: Commit the feature**

Run: `git add src/components/ui/RollingSectionTitle.tsx src/components/ui/SectionHeading.tsx docs/superpowers/plans/2026-09-07-section-heading-rolling-animation.md && git commit -m 'feat: animate section heading letters'`

Expected: the commit contains the reusable rolling title, shared-heading integration, and implementation plan.
