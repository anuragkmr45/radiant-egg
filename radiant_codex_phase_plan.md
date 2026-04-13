# Radiant Engineering Next.js rebuild plan from `.make` files

## What was inspected
All six uploaded `.make` files were decoded successfully. Each file contained:
- `App.tsx`
- `globals.css`
- one `RESPONSIVE_SET` with `scalingMode: REFLOW`
- one visible `FRAME` named `Desktop`

## Important finding
The decoded files do **not** contain separate tablet/mobile artboards. The exports are desktop-first responsive canvases, not separate 1920 / 1440 / 1024 / 768 / 390 page designs. So:
- desktop parity can be matched very closely from the files
- tablet/mobile must be reconstructed from the reflow rules and visual proportions unless dedicated mobile captures are provided later

## Core design tokens found in the source
- Primary gold: `#FB9E13`
- Accent gold: `#FCA213`
- Deep navy: `#091D34`
- Brand navy: `#123352`
- Dark text navy: `#143152`
- Dark button text: `#0B1D32`
- Page background: `#F6F7F9`
- Card border: `#D8DEE4`
- Muted text: `#67737E`
- Muted on dark: `#B8BFC7`
- Secondary muted: `#7D8A92`
- Headings: `Plus Jakarta Sans`
- Body: `Inter`
- Rare contact/map font: `Roboto`
- Main content container: `1400px`
- Header height: `80px`

## Reusable component inventory
### Global layout
- `SiteHeader`
- `DesktopNav`
- `ServicesDropdown`
- `MobileNavDrawer`
- `SiteFooter`
- `PageContainer`
- `SectionHeader`
- `PrimaryButton`
- `SecondaryButton`
- `BadgePill`
- `IconLabel`
- `CTASection`

### Shared page sections
- `HomeHero`
- `InnerHero`
- `IntroTextSection`
- `FeatureCardGrid`
- `CardGrid3Col`
- `ClientLogoGrid`
- `IndustryGrid`
- `StatsStrip`

### Route-specific cards
- `ServiceCard`
- `ReasonCard`
- `ProjectCard`
- `AuditCapabilityCard`
- `MethodCard`
- `ApplicationListCard`
- `InspectionScopeCard`
- `ProcessStepCard`
- `StandardCard`
- `TeamCard`
- `GalleryTile`
- `ContactInfoCard`

### Form/media
- `TextField`
- `TextareaField`
- `SelectField`
- `MapCard` with lightweight fallback
- `ResponsiveMedia`

## Recommended source-of-truth structure
- `src/theme/tokens.ts` for semantic tokens
- `src/styles/tokens.css` for CSS custom properties
- `src/config/site.ts` for nav, contact info, footer links, CTA copy
- `src/content/*.ts` for page data before CMS
- later map that content shape 1:1 into CMS collections

## Recommended folder structure
```txt
src/
  app/
    (marketing)/
      layout.tsx
      page.tsx
      about/page.tsx
      services/
        consultancy/page.tsx
        ndt/page.tsx
        tpi/page.tsx
      contact/page.tsx
    sitemap.ts
    robots.ts
    not-found.tsx
    error.tsx
  components/
    layout/
    navigation/
    sections/
    cards/
    forms/
    media/
    ui/
  config/
    site.ts
  content/
    home.ts
    about.ts
    consultancy.ts
    ndt.ts
    tpi.ts
    contact.ts
  lib/
    cms/
    seo/
    utils/
    validation/
  styles/
    globals.css
    tokens.css
  theme/
    tokens.ts
  types/
```

## Code-quality guardrails
- TypeScript strict mode
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- never access unknown nested CMS data without `?.` and `??`
- validate CMS payloads before rendering
- no page-level giant JSX files
- server components by default, client only when needed
- replace remote `<img>` with `next/image`
- replace contact page heavy map DOM with lazy iframe/static preview
- create fallbacks for missing image, missing rich text, empty repeater items, empty CTA links
- accessible dropdown, drawer, and form labels

## Phase plan

### Phase 0 — Foundation and extraction baseline
Attach to Codex:
- all six `.make` files

Goal:
- scaffold project structure
- set up tokens, fonts, image strategy, route skeletons, linting, strict TS, utilities
- create placeholder pages and shared config/content files

Verify:
- app builds cleanly
- no giant inline styles in final app code
- tokens exist in one place only
- header/footer placeholders render on all routes

Codex prompt:
```txt
Phase 0. Inspect all attached .make files first. Scaffold a Next.js App Router project with TypeScript, strict settings, Tailwind v4, and a clean src-based structure. Create route skeletons for home, about, services/consultancy, services/ndt, services/tpi, and contact. Add a single source of truth for theme tokens, typography, spacing, shadows, radii, nav links, contact info, and CTA config. Keep server components by default. Add lint/type-safe utilities, error.tsx, not-found.tsx, sitemap.ts, robots.ts, and page metadata placeholders. Do not implement final page UI yet.
```

### Phase 1 — Design system + shared chrome
Attach to Codex:
- home `.make`
- about `.make`
- contact `.make`
- consultancy `.make`

Goal:
- build `SiteHeader`, `ServicesDropdown`, `MobileNavDrawer`, `SiteFooter`, `PageContainer`, `SectionHeader`, buttons, card shell, badges, CTA shell
- match shared spacing, typography, borders, and shadows from the files

Verify:
- header height is 80px
- main container max width is 1400px
- colors and typography are tokenized
- footer is identical across pages
- desktop/tablet/mobile nav behavior is production-ready

Codex prompt:
```txt
Phase 1. Use the attached .make files only to extract shared UI patterns. Implement the shared design system and chrome: SiteHeader, services dropdown, mobile drawer, SiteFooter, PageContainer, SectionHeader, PrimaryButton, SecondaryButton, badge/chip, generic card shell, and CTA section shell. Match the source spacing, typography, borders, shadows, colors, and hover/focus states as closely as possible. Keep all theme values centralized. Do not hardcode page-specific content inside shared components.
```

### Phase 2 — Home page
Attach to Codex:
- home `.make`

Goal:
- build the home page exactly from the reference
- sections: hero, certification strip, about intro, core services, why choose us, industries, client logos, final CTA

Verify:
- compare at 1920, 1440, 1024, 768, 390
- hero spacing, gradient overlays, CTA spacing, card heights, logo strip alignment
- sticky header overlap is correct

Codex prompt:
```txt
Phase 2. Build the home page from the attached home .make file using the shared system already created. Reproduce the hero, certification strip, about intro, core services grid, why choose us, industries grid, client/logo section, and final CTA. Keep the page component thin and move each section into reusable section components. Match spacing, hierarchy, borders, shadows, and image treatment as closely as possible. Make the layout responsive for 1920, 1440, 1024, 768, and 390 widths.
```

### Phase 3 — About page
Attach to Codex:
- about `.make`

Goal:
- build about hero, who we are, strengths, leadership/team cards, gallery/work section, CTA

Verify:
- compare at 1920, 1440, 1024, 768, 390
- card heights, headline widths, image crop consistency, CTA spacing

Codex prompt:
```txt
Phase 3. Build the about page from the attached about .make file. Use reusable components where possible and add new ones only when the pattern is unique: inner hero, strengths grid, team cards, gallery/work tiles, and final CTA. Keep typography and spacing consistent with the existing shared system. Ensure responsive behavior is clean and visually faithful at 1920, 1440, 1024, 768, and 390 widths.
```

### Phase 4 — Shared services-page template
Attach to Codex:
- consultancy `.make`
- ndt `.make`
- tpi `.make`

Goal:
- extract common structure across service pages before implementing route-specific content
- build service hero, section intro blocks, 3-column content card grids, process/steps grid, standards grid, service CTA

Verify:
- all three routes share layout primitives without duplication
- section spacing and hero treatment are consistent

Codex prompt:
```txt
Phase 4. Inspect the three attached service-page .make files together and create a shared service-page template system. Extract common patterns into reusable sections and cards: service hero, intro block, 3-column card grid, steps/process grid, standards grid, and final CTA. Reduce duplication heavily while preserving visual fidelity.
```

### Phase 5 — Consultancy page
Attach to Codex:
- consultancy `.make`

Goal:
- implement consultancy-specific sections
- special solutions section, design drawings section, audit/residual-life section, past projects, CTA

Verify:
- compare at 1920, 1440, 1024, 768, 390
- project card rhythm, bullet/chip spacing, text widths, CTA spacing

Codex prompt:
```txt
Phase 5. Build the consultancy services page from the attached consultancy .make file using the shared services-page system. Implement the page-specific sections, especially the project cards and the structural audit/residual-life content blocks. Keep the JSX modular and avoid repeating markup patterns already solved in shared components.
```

### Phase 6 — NDT page
Attach to Codex:
- ndt `.make`

Goal:
- implement NDT methods, applications/industries, equipment/components, CTA

Verify:
- compare at 1920, 1440, 1024, 768, 390
- method card alignment, list spacing, heading rhythm

Codex prompt:
```txt
Phase 6. Build the NDT page from the attached ndt .make file using the shared services-page system. Implement the NDT methods cards, applications/industries section, equipment/components section, and CTA. Match spacing and card proportions closely, and keep the page responsive across 1920, 1440, 1024, 768, and 390 widths.
```

### Phase 7 — TPI page
Attach to Codex:
- tpi `.make`

Goal:
- implement inspection scope, process steps, codes/standards, CTA

Verify:
- compare at 1920, 1440, 1024, 768, 390
- standards grid and step cards stay readable without layout collapse

Codex prompt:
```txt
Phase 7. Build the TPI page from the attached tpi .make file using the shared services-page system. Implement the inspection-scope cards, process steps, compliance/codes section, and CTA. Match visual hierarchy and spacing very closely and preserve clarity on tablet and mobile widths.
```

### Phase 8 — Contact page
Attach to Codex:
- contact `.make`

Goal:
- build contact hero, contact info strip, enquiry form, direct contacts, map card
- replace the exported heavy static Google Maps DOM with a lightweight map solution

Verify:
- compare at 1920, 1440, 1024, 768, 390
- form grid collapses cleanly, labels align, map height and card balance feel correct
- no layout shifts on submit/error states

Codex prompt:
```txt
Phase 8. Build the contact page from the attached contact .make file. Implement the hero, office/contact details, enquiry form, direct-contact cards, and a lightweight map card. Do not copy the huge static Google Maps DOM from the export; replace it with a performant accessible solution with graceful fallback. Add robust form state handling, validation hooks, and safe defaults.
```

### Phase 9 — CMS integration
Attach to Codex:
- no .make files required

Goal:
- map all page content into editable collections/globals
- keep UI untouched while swapping local content source to CMS

Recommended CMS path:
- start with **Decap CMS** if the priority is free hosting and Git-based editing
- choose **Payload CMS** only if you want a richer admin and can also manage database/storage/email setup

Verify:
- every heading, paragraph, list, CTA, contact detail, SEO field, and media asset is editable
- missing CMS values do not break rendering

Codex prompt:
```txt
Phase 9. Integrate a CMS without changing the visual UI. Keep the existing content shape and swap the source from local content files to CMS-backed data. Every page section, CTA, image, SEO field, nav item, footer field, and contact detail must be editable. Add validation and fallbacks so missing CMS data never crashes rendering.
```

### Phase 10 — QA, pixel-fit pass, SEO, performance
Attach to Codex:
- all six `.make` files

Goal:
- final polish pass
- fix all visual mismatches
- tune performance, metadata, structured data, image sizes, motion, and accessibility

Verify:
- full-page screenshot comparison at 1920, 1440, 1024, 768, 390
- CLS/LCP issues addressed
- metadata, sitemap, robots, and schema are present
- reduced-motion support works

Codex prompt:
```txt
Phase 10. Perform the final pixel-fit and production-hardening pass using all attached .make files. Remove remaining visual mismatches, tighten spacing and typography, optimize images and loading behavior, add page-level metadata and structured data, improve accessibility, support prefers-reduced-motion, and make sure the final app is clean, modular, and production-ready.
```

## Reusable verification prompt after each phase
```txt
Verify the affected route(s) against the attached .make reference at 1920, 1440, 1024, 768, and 390 widths. Check container width, section spacing, font sizes, line heights, image crop, card heights, border radius, shadows, header overlap, footer spacing, and interactive states. List every mismatch still remaining, fix them, then re-run the verification until the route is visually consistent and responsive.
```
