# Sprint Plan

## Assumptions
- Sprint duration: 2 weeks
- Team: 1 developer (solo)
- Capacity: ~40 hours per sprint
- Velocity: ~20 story points per sprint (adjusted for solo dev)

---

## Sprint 1: Foundation
**Goal:** Project setup dan landing page live

**Target:** Minggu 1-2

| Story | Points | Hours | Dependencies |
|-------|--------|-------|--------------|
| Project scaffolding (Next.js, TypeScript, Tailwind, Shadcn) | 3 | 4h | None |
| Design system setup (theme, colors, typography) | 2 | 3h | Scaffolding |
| Layout components (Header, Footer, Container) | 2 | 3h | Design system |
| Landing page - Hero section | 3 | 4h | Layout |
| Landing page - Features section | 2 | 3h | Hero |
| Landing page - How it works section | 2 | 2h | Features |
| Dark/Light mode toggle | 2 | 3h | Layout |
| SEO setup (meta, OG tags, sitemap) | 2 | 3h | Landing page |
| **Total** | **18** | **25h** | |

**Sprint Goal:** Landing page live di Vercel dengan dark mode

---

## Sprint 2: Core Upload & PDF
**Goal:** File upload dan PDF→Text conversion working

**Target:** Minggu 3-4

| Story | Points | Hours | Dependencies |
|-------|--------|-------|--------------|
| Drag & Drop upload component | 3 | 4h | Sprint 1 |
| Click-to-browse upload | 1 | 2h | Drop zone |
| File validation (type, size) | 2 | 3h | Upload |
| File preview component | 2 | 4h | Upload |
| PDF to text conversion (core) | 5 | 8h | Upload |
| Conversion progress UI | 2 | 3h | PDF conversion |
| Download mechanism | 2 | 3h | Conversion |
| Error handling & toast notifications | 2 | 3h | All |
| **Total** | **19** | **30h** | |

**Sprint Goal:** User bisa upload PDF dan download text hasil konversi

---

## Sprint 3: Image Conversion
**Goal:** Image format conversion working

**Target:** Minggu 5-6

| Story | Points | Hours | Dependencies |
|-------|--------|-------|--------------|
| Image format conversion (PNG↔JPG↔WebP) | 5 | 6h | Sprint 2 |
| Quality adjustment slider | 2 | 3h | Image conversion |
| Image preview (original vs converted) | 2 | 3h | Image conversion |
| File size comparison display | 1 | 2h | Image conversion |
| Image resize feature | 3 | 4h | Image conversion |
| Image compress feature | 3 | 4h | Image conversion |
| Mobile responsive polish | 2 | 3h | All |
| **Total** | **18** | **25h** | |

**Sprint Goal:** User bisa konversi, resize, dan compress gambar

---

## Sprint 4: Extended PDF & Polish
**Goal:** PDF merge/split, performance optimization, launch ready

**Target:** Minggu 7-8

| Story | Points | Hours | Dependencies |
|-------|--------|-------|--------------|
| PDF merge feature | 3 | 5h | Sprint 2 |
| PDF split feature | 3 | 5h | Sprint 2 |
| Batch file selection (multiple files) | 2 | 3h | Sprint 2 |
| Performance optimization | 2 | 4h | All |
| Analytics integration (Plausible) | 1 | 2h | All |
| Donation button (Saweria) | 1 | 2h | All |
| Final testing & bug fixes | 2 | 4h | All |
| Documentation (README) | 1 | 2h | All |
| **Total** | **15** | **27h** | |

**Sprint Goal:** MVP launch ready dengan semua fitur core

---

## Sprint 5: Growth Features (Bulan 3)
**Goal:** PWA, history, keyboard shortcuts

**Target:** Bulan 3

| Story | Points | Hours | Dependencies |
|-------|--------|-------|--------------|
| PWA setup (service worker, manifest) | 3 | 5h | MVP |
| History feature (localStorage) | 3 | 5h | MVP |
| Keyboard shortcuts | 2 | 3h | MVP |
| Share functionality | 2 | 3h | MVP |
| Blog setup (MDX) | 2 | 4h | MVP |
| Content marketing (first 3 posts) | 2 | 5h | Blog |
| **Total** | **14** | **25h** | |

**Sprint Goal:** Enhanced user experience dan content marketing

---

## Sprint 6: Monetization (Bulan 4-5)
**Goal:** Revenue features, API beta

**Target:** Bulan 4-5

| Story | Points | Hours | Dependencies |
|-------|--------|-------|--------------|
| Donation tiers page | 2 | 3h | MVP |
| "Support Gantiin" page | 2 | 3h | Donation |
| Sponsor logos section | 1 | 2h | Donation |
| Monthly report to donors | 2 | 4h | Donation |
| API for developers (beta) | 5 | 8h | MVP |
| API documentation | 2 | 3h | API |
| **Total** | **14** | **23h** | |

**Sprint Goal:** Revenue generation dan developer API

---

## Sprint Summary

| Sprint | Goal | Stories | Points | Hours | Target |
|--------|------|---------|--------|-------|--------|
| S1 | Foundation | 8 | 18 | 25h | Minggu 1-2 |
| S2 | Core Upload & PDF | 8 | 19 | 30h | Minggu 3-4 |
| S3 | Image Conversion | 7 | 18 | 25h | Minggu 5-6 |
| S4 | Extended PDF & Polish | 8 | 15 | 27h | Minggu 7-8 |
| S5 | Growth Features | 6 | 14 | 25h | Bulan 3 |
| S6 | Monetization | 6 | 14 | 23h | Bulan 4-5 |
| **Total** | | **43** | **98** | **155h** | **5 bulan** |

---

## Velocity Tracking

| Sprint | Planned | Completed | Velocity |
|--------|---------|-----------|----------|
| S1 | 18 | - | - |
| S2 | 19 | - | - |
| S3 | 18 | - | - |
| S4 | 15 | - | - |
| S5 | 14 | - | - |
| S6 | 14 | - | - |
