# Contact Pill Row Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every contact-link pill use the existing scrubbed reveal, so wrapped mobile rows animate in their visual order.

**Architecture:** `ContactSection` already owns the `useScrubBlockReveal` scope. Each existing `Button` gets a wrapper with the same reveal attributes used by stack pills. The shared hook continues to supply animation, breakpoints, and reduced-motion behavior.

**Tech Stack:** Next.js 16, React 19, TypeScript, GSAP, Tailwind CSS

---

## File structure

- Modify: `src/components/ContactSection.tsx` — give each contact button an individual reveal wrapper.
- Create: no production files.
- Test: no test harness exists for this presentational marker change; validate with TypeScript, ESLint, and the production build.

### Task 1: Reveal contact pills individually

**Files:**

- Modify: `src/components/ContactSection.tsx:83-97`

- [ ] **Step 1: Inspect the button map**

Run: `sed -n '81,101p' src/components/ContactSection.tsx`

Expected: the `Button` is returned directly from `links.map` inside `flex flex-wrap gap-3`.

- [ ] **Step 2: Add the reveal wrapper**

Change the map return to the following complete JSX:

```tsx
return (
  <div key={link.label} data-scrub-reveal className="gsap-reveal">
    <Button
      href={link.href}
      variant={link.variant}
      external={link.external}
      className="inline-flex gap-2"
    >
      <Icon />
      {link.label}
    </Button>
  </div>
);
```

- [ ] **Step 3: Type-check the project**

Run: `npm run typecheck`

Expected: exit code 0 with no TypeScript errors.

- [ ] **Step 4: Lint the project**

Run: `npm run lint`

Expected: exit code 0 with no ESLint errors.

- [ ] **Step 5: Build the production application**

Run: `npm run build`

Expected: exit code 0 and a completed Next.js production build.

- [ ] **Step 6: Commit the implementation**

Run: `git add src/components/ContactSection.tsx docs/superpowers/plans/2026-09-07-contact-pill-row-animation.md && git commit -m 'feat: animate contact pills individually'`

Expected: the commit contains the component and plan changes.
