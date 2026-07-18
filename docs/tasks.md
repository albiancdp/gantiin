# Task Breakdown

## Task ID Format: `{MODULE}-{NNN}`
- Example: `SETUP-001`, `LAND-001`, `UPLOAD-001`

## Convention
- Each task should be completable in 2-4 hours
- If a task exceeds 4 hours, break it down further

---

## ✅ Sprint 1 Tasks (Completed)

### SETUP-001: Initialize Next.js Project
- **Description:** Create new Next.js project with TypeScript, App Router, and Tailwind CSS
- **Module:** Project Setup
- **Estimated Hours:** 2
- **Dependencies:** None
- **Acceptance Criteria:**
  - [ ] `npx create-next-app@latest .` — Next.js 16 + TypeScript + Tailwind v4 + App Router + src dir
  - [ ] Project runs on localhost:3000
  - [ ] TypeScript strict mode enabled
  - [ ] Folder structure created

### SETUP-002: Install & Configure Shadcn/ui
- **Description:** Install Shadcn/ui and configure components
- **Module:** Project Setup
- **Estimated Hours:** 2
- **Dependencies:** SETUP-001
- **Acceptance Criteria:**
  - [ ] `npx shadcn@latest init` completed
  - [ ] Base components installed (Button, Card, Input, Sonner, Sheet)
  - [ ] Theme configured with custom colors
  - [ ] Components render correctly

### SETUP-003: Configure ESLint & Prettier
- **Description:** Set up code quality tools
- **Module:** Project Setup
- **Estimated Hours:** 1
- **Dependencies:** SETUP-001
- **Acceptance Criteria:**
  - [ ] ESLint config with Next.js rules
  - [ ] Prettier config with consistent style
  - [ ] `npm run lint` passes
  - [ ] Format on save configured

### SETUP-004: Create .gitignore & Initialize Git
- **Description:** Set up Git repository with proper ignore rules
- **Module:** Project Setup
- **Estimated Hours:** 0.5
- **Dependencies:** SETUP-001
- **Acceptance Criteria:**
  - [ ] .gitignore includes node_modules, .next, .env
  - [ ] Git repository initialized
  - [ ] Initial commit created

---

### THEME-001: Configure Tailwind Theme
- **Description:** Set up custom theme with Gantiin brand colors
- **Module:** Design System
- **Estimated Hours:** 2
- **Dependencies:** SETUP-002
- **Acceptance Criteria:**
  - [ ] Primary color: #6366F1 (Indigo)
  - [ ] Secondary color: #10B981 (Emerald)
  - [ ] Dark mode colors configured
  - [ ] CSS variables for all tokens
  - [ ] Font family: Inter + JetBrains Mono

### THEME-002: Create Global Styles
- **Description:** Set up global CSS with base styles
- **Module:** Design System
- **Estimated Hours:** 1
- **Dependencies:** THEME-001
- **Acceptance Criteria:**
  - [ ] CSS reset applied
  - [ ] Base typography styles
  - [ ] Scrollbar styling
  - [ ] Selection color

---

### LAYOUT-001: Create Header Component
- **Description:** Build responsive header with logo and navigation
- **Module:** Layout
- **Estimated Hours:** 3
- **Dependencies:** THEME-001
- **Acceptance Criteria:**
  - [ ] Logo "Gantiin" with icon
  - [ ] Navigation links (PDF, Image, Merge)
  - [ ] Theme toggle button
  - [ ] Mobile hamburger menu
  - [ ] Sticky header on scroll
  - [ ] Responsive (mobile, tablet, desktop)

### LAYOUT-002: Create Footer Component
- **Description:** Build footer with links and donation button
- **Module:** Layout
- **Estimated Hours:** 1.5
- **Dependencies:** THEME-001
- **Acceptance Criteria:**
  - [ ] Copyright notice
  - [ ] Privacy policy link
  - [ ] Donation button placeholder
  - [ ] Responsive layout

### LAYOUT-003: Create Container Component
- **Description:** Build reusable container component
- **Module:** Layout
- **Estimated Hours:** 0.5
- **Dependencies:** THEME-001
- **Acceptance Criteria:**
  - [ ] Max-width container
  - [ ] Responsive padding
  - [ ] Centered content

---

### LANDING-001: Build Hero Section
- **Description:** Create compelling hero section for landing page
- **Module:** Landing Page
- **Estimated Hours:** 3
- **Dependencies:** LAYOUT-001
- **Acceptance Criteria:**
  - [ ] Headline: "Gantiin aja, gampang kok!"
  - [ ] Subheadline explaining features
  - [ ] CTA button: "Mulai Konversi"
  - [ ] Illustration/icon
  - [ ] Responsive design
  - [ ] Dark/Light mode

### LANDING-002: Build Features Section
- **Description:** Create features grid section
- **Module:** Landing Page
- **Estimated Hours:** 2
- **Dependencies:** LAYOUT-001
- **Acceptance Criteria:**
  - [ ] 3 feature cards (PDF, Image, Merge)
  - [ ] Icons for each feature
  - [ ] Brief descriptions
  - [ ] Responsive grid (1 col mobile, 3 col desktop)
  - [ ] Hover effects

### LANDING-003: Build How It Works Section
- **Description:** Create step-by-step section
- **Module:** Landing Page
- **Estimated Hours:** 2
- **Dependencies:** LAYOUT-001
- **Acceptance Criteria:**
  - [ ] 3 steps (Upload → Convert → Download)
  - [ ] Numbered indicators
  - [ ] Brief descriptions
  - [ ] Visual illustrations
  - [ ] Responsive layout

### LANDING-004: Build Landing Page
- **Description:** Assemble landing page with all sections
- **Module:** Landing Page
- **Estimated Hours:** 1
- **Dependencies:** LANDING-001, LANDING-002, LANDING-003
- **Acceptance Criteria:**
  - [ ] All sections rendered
  - [ ] Smooth scroll between sections
  - [ ] SEO meta tags
  - [ ] OG image configured

---

### DARK-001: Implement Theme Provider
- **Description:** Create theme context and provider
- **Module:** Theme
- **Estimated Hours:** 1.5
- **Dependencies:** THEME-001
- **Acceptance Criteria:**
  - [ ] ThemeContext created
  - [ ] ThemeProvider wraps app
  - [ ] Supports 'light', 'dark', 'system'
  - [ ] Saves to localStorage
  - [ ] Applies class to <html>

### DARK-002: Create Theme Toggle Button
- **Description:** Build toggle button for dark/light mode
- **Module:** Theme
- **Estimated Hours:** 1
- **Dependencies:** DARK-001
- **Acceptance Criteria:**
  - [ ] Sun/Moon icon toggle
  - [ ] Smooth transition animation
  - [ ] Accessible (aria-label)
  - [ ] Shows current state

---

### SEO-001: Configure Meta Tags
- **Description:** Set up SEO meta tags for all pages
- **Module:** SEO
- **Estimated Hours:** 1.5
- **Dependencies:** LANDING-004
- **Acceptance Criteria:**
  - [ ] Title template: "%s | Gantiin"
  - [ ] Meta description
  - [ ] Open Graph tags
  - [ ] Twitter cards
  - [ ] Canonical URLs

### SEO-002: Create sitemap.xml & robots.txt
- **Description:** Generate sitemap and robots file
- **Module:** SEO
- **Estimated Hours:** 1
- **Dependencies:** SEO-001
- **Acceptance Criteria:**
  - [ ] sitemap.xml with all pages
  - [ ] robots.txt allowing crawling
  - [ ] Dynamic generation

---

## Sprint 1 Summary

| Task ID | Task | Hours | Dependencies |
|---------|------|-------|--------------|
| SETUP-001 | Initialize Next.js Project | 2 | None |
| SETUP-002 | Install & Configure Shadcn/ui | 2 | SETUP-001 |
| SETUP-003 | Configure ESLint & Prettier | 1 | SETUP-001 |
| SETUP-004 | Create .gitignore & Initialize Git | 0.5 | SETUP-001 |
| THEME-001 | Configure Tailwind Theme | 2 | SETUP-002 |
| THEME-002 | Create Global Styles | 1 | THEME-001 |
| LAYOUT-001 | Create Header Component | 3 | THEME-001 |
| LAYOUT-002 | Create Footer Component | 1.5 | THEME-001 |
| LAYOUT-003 | Create Container Component | 0.5 | THEME-001 |
| LANDING-001 | Build Hero Section | 3 | LAYOUT-001 |
| LANDING-002 | Build Features Section | 2 | LAYOUT-001 |
| LANDING-003 | Build How It Works Section | 2 | LAYOUT-001 |
| LANDING-004 | Build Landing Page | 1 | LANDING-001-003 |
| DARK-001 | Implement Theme Provider | 1.5 | THEME-001 |
| DARK-002 | Create Theme Toggle Button | 1 | DARK-001 |
| SEO-001 | Configure Meta Tags | 1.5 | LANDING-004 |
| SEO-002 | Create sitemap.xml & robots.txt | 1 | SEO-001 |
| **Total** | | **24.5h** | |

---

## ✅ Sprint 2 Tasks (Completed)

### UPLOAD-001: Create DropZone Component
- **Description:** Build drag & drop file upload area
- **Module:** File Upload
- **Estimated Hours:** 4
- **Dependencies:** THEME-001
- **Acceptance Criteria:**
  - [ ] Visual drop zone with dashed border
  - [ ] Drag over state (highlight border, change bg)
  - [ ] Drop handler with file validation
  - [ ] Click-to-browse fallback
  - [ ] Mobile touch support
  - [ ] Accessible (keyboard, screen reader)

### UPLOAD-002: Create File Validation Utility
- **Description:** Build file type and size validation
- **Module:** File Upload
- **Estimated Hours:** 2
- **Dependencies:** None
- **Acceptance Criteria:**
  - [ ] Validate file type (magic bytes, not just extension)
  - [ ] Validate file size (50MB max)
  - [ ] Return validation result with error message
  - [ ] Support multiple file types

### UPLOAD-003: Create FilePreview Component
- **Description:** Build file preview after upload
- **Module:** File Upload
- **Estimated Hours:** 3
- **Dependencies:** UPLOAD-001
- **Acceptance Criteria:**
  - [ ] PDF: Show first page thumbnail
  - [ ] Image: Show image preview
  - [ ] Show file name, size, type
  - [ ] Remove file button
  - [ ] Loading state while generating preview

---

### PDF-001: Install pdf.js Library
- **Description:** Install and configure pdf.js for PDF processing
- **Module:** PDF Conversion
- **Estimated Hours:** 1
- **Dependencies:** None
- **Acceptance Criteria:**
  - [ ] `pdfjs-dist` (v6) installed
  - [ ] Worker configured (lazy, via `new URL(..., import.meta.url)`)
  - [ ] Basic PDF loading works

### PDF-002: Implement PDF to Text Conversion
- **Description:** Build core PDF to text conversion logic
- **Module:** PDF Conversion
- **Estimated Hours:** 4
- **Dependencies:** PDF-001
- **Acceptance Criteria:**
  - [ ] Extract text from all pages
  - [ ] Preserve line breaks
  - [ ] Handle multi-column layouts
  - [ ] Return text content
  - [ ] Handle encrypted PDFs (show error)

### PDF-003: Create PDF Conversion Page
- **Description:** Build PDF converter page UI
- **Module:** PDF Conversion
- **Estimated Hours:** 3
- **Dependencies:** PDF-002, UPLOAD-001
- **Acceptance Criteria:**
  - [ ] Page layout with DropZone
  - [ ] File preview for PDF
  - [ ] Convert button
  - [ ] Progress indicator
  - [ ] Result display
  - [ ] Download button

### PDF-004: Implement Text Download
- **Description:** Build download mechanism for converted text
- **Module:** PDF Conversion
- **Estimated Hours:** 2
- **Dependencies:** PDF-002
- **Acceptance Criteria:**
  - [ ] Create blob from text
  - [ ] Trigger download with filename
  - [ ] Copy to clipboard button
  - [ ] Handle download errors

---

### CONV-001: Create Conversion Engine
- **Description:** Build main conversion orchestration logic
- **Module:** Conversion Engine
- **Estimated Hours:** 3
- **Dependencies:** PDF-002
- **Acceptance Criteria:**
  - [ ] Main convertFile() function
  - [ ] Route to correct converter based on type
  - [ ] Handle progress callbacks
  - [ ] Handle errors gracefully
  - [ ] Return typed results

### CONV-002: Create Conversion Progress Component
- **Description:** Build progress indicator for conversions
- **Module:** Conversion UI
- **Estimated Hours:** 2
- **Dependencies:** CONV-001
- **Acceptance Criteria:**
  - [ ] Progress bar with percentage
  - [ ] Status text (Loading, Converting, Done)
  - [ ] Animated transitions
  - [ ] Error state

### CONV-003: Create ConvertResult Component
- **Description:** Build result display with download button
- **Module:** Conversion UI
- **Estimated Hours:** 2
- **Dependencies:** CONV-001
- **Acceptance Criteria:**
  - [ ] Show converted content (text or image)
  - [ ] Download button
  - [ ] Copy button (for text)
  - [ ] Convert another button

---

### ERR-001: Implement Error Handling
- **Description:** Build comprehensive error handling
- **Module:** Error Handling
- **Estimated Hours:** 2
- **Dependencies:** All
- **Acceptance Criteria:**
  - [ ] Error types defined
  - [ ] Toast notifications for errors
  - [ ] Error boundary for crashes
  - [ ] Fallback UI for errors

### ERR-002: Create Toast Notification System
- **Description:** Build toast notification component
- **Module:** Error Handling
- **Estimated Hours:** 1.5
- **Dependencies:** THEME-001
- **Acceptance Criteria:**
  - [ ] Success, error, warning, info variants
  - [ ] Auto-dismiss after 5 seconds
  - [ ] Stack multiple toasts
  - [ ] Accessible

---

## Sprint 2 Summary

| Task ID | Task | Hours | Dependencies |
|---------|------|-------|--------------|
| UPLOAD-001 | Create DropZone Component | 4 | THEME-001 |
| UPLOAD-002 | Create File Validation Utility | 2 | None |
| UPLOAD-003 | Create FilePreview Component | 3 | UPLOAD-001 |
| PDF-001 | Install pdf.js Library | 1 | None |
| PDF-002 | Implement PDF to Text Conversion | 4 | PDF-001 |
| PDF-003 | Create PDF Conversion Page | 3 | PDF-002, UPLOAD-001 |
| PDF-004 | Implement Text Download | 2 | PDF-002 |
| CONV-001 | Create Conversion Engine | 3 | PDF-002 |
| CONV-002 | Create Conversion Progress Component | 2 | CONV-001 |
| CONV-003 | Create ConvertResult Component | 2 | CONV-001 |
| ERR-001 | Implement Error Handling | 2 | All |
| ERR-002 | Create Toast Notification System | 1.5 | THEME-001 |
| **Total** | | **29.5h** | |

---

## ✅ Sprint 2.5 Tasks (Completed)

### UCONV-001: Create Conversion Registry
- **Description:** Build registry tipe file → daftar opsi konversi (sumber kebenaran untuk UI & engine)
- **Module:** Conversion Engine
- **Estimated Hours:** 1
- **Dependencies:** Sprint 2
- **Acceptance Criteria:**
  - [ ] `CONVERSION_REGISTRY` di `src/lib/conversions/registry.ts`
  - [ ] Entri untuk pdf, png, jpeg, webp, heic, svg
  - [ ] Field: id, title, description, outputLabel, icon, implemented, requiresMultiple

### UCONV-002: Create ConversionOptions Component
- **Description:** Build grid opsi "Bisa dikonversi ke:" setelah file diupload
- **Module:** Conversion UI
- **Estimated Hours:** 2
- **Dependencies:** UCONV-001
- **Acceptance Criteria:**
  - [ ] Grid kartu opsi (1 col mobile, 2 col desktop)
  - [ ] Badge "Segera" untuk opsi yang belum implemented (disabled)
  - [ ] Accessible (button native, focus ring)

### UCONV-003: Create UniversalConverter Component
- **Description:** Build orchestrator flow universal: upload → deteksi → pilih opsi → konversi → hasil
- **Module:** Conversion Engine
- **Estimated Hours:** 2
- **Dependencies:** UCONV-002
- **Acceptance Criteria:**
  - [ ] Props allowedTypes + accept untuk pre-filter per halaman
  - [ ] Reuse DropZone, FilePreview, ConvertProgress, ConvertResult
  - [ ] Opsi requiresMultiple redirect ke /merge

### UCONV-004: Create /konversi Page
- **Description:** Build halaman konversi universal + update navigasi
- **Module:** Pages
- **Estimated Hours:** 1
- **Dependencies:** UCONV-003
- **Acceptance Criteria:**
  - [ ] Halaman /konversi menerima semua tipe file
  - [ ] Nav: tambah link "Semua Konversi"
  - [ ] CTA hero/header/footer mengarah ke /konversi
  - [ ] Sitemap include /konversi

### UCONV-005: Refactor /pdf ke UniversalConverter
- **Description:** Ganti PdfConverter dengan UniversalConverter (allowedTypes: pdf)
- **Module:** Pages
- **Estimated Hours:** 1.5
- **Dependencies:** UCONV-003
- **Acceptance Criteria:**
  - [ ] /pdf memakai UniversalConverter
  - [ ] PdfConverter.tsx dihapus
  - [ ] Flow PDF→Teks tetap berfungsi

---

## Sprint 2.5 Summary

| Task ID | Task | Hours | Dependencies |
|---------|------|-------|--------------|
| UCONV-001 | Create Conversion Registry | 1 | Sprint 2 |
| UCONV-002 | Create ConversionOptions Component | 2 | UCONV-001 |
| UCONV-003 | Create UniversalConverter Component | 2 | UCONV-002 |
| UCONV-004 | Create /konversi Page | 1 | UCONV-003 |
| UCONV-005 | Refactor /pdf ke UniversalConverter | 1.5 | UCONV-003 |
| **Total** | | **7.5h** | |

---

## ✅ Sprint 3 Tasks (Completed)

### IMG-001: Create Canvas Image Utilities
- **Description:** Build shared Canvas API helpers (load, draw, export blob) + deteksi WebP encoder
- **Module:** Image Conversion
- **Estimated Hours:** 1
- **Dependencies:** None
- **Acceptance Criteria:**
  - [ ] Utility fileToImageBitmap/loadImage
  - [ ] Utility canvasToBlob dengan quality parameter
  - [ ] Deteksi dukungan WebP encode + fallback @jsquash/webp (lazy)
  - [ ] Types configured

### IMG-002: Implement Image Format Conversion
- **Description:** Build image format conversion logic
- **Module:** Image Conversion
- **Estimated Hours:** 3
- **Dependencies:** IMG-001
- **Acceptance Criteria:**
  - [ ] PNG → JPG conversion
  - [ ] JPG → PNG conversion
  - [ ] PNG/JPG → WebP conversion
  - [ ] SVG → PNG/JPG conversion
  - [ ] Quality adjustment (1-100)
  - [ ] Return blob result

### IMG-003: Activate Image Options in Universal Converter
- **Description:** Aktifkan opsi gambar di registry + panel konfigurasi (format, quality) di UniversalConverter, pasang di halaman /image
- **Module:** Image Conversion
- **Estimated Hours:** 3
- **Dependencies:** IMG-002, UCONV-003
- **Acceptance Criteria:**
  - [ ] Halaman /image memakai UniversalConverter
  - [ ] Opsi image-convert/resize/compress aktif di registry
  - [ ] Format selector (PNG, JPG, WebP) setelah pilih opsi
  - [ ] Quality slider (untuk JPG/WebP)
  - [ ] Preview original dan converted
  - [ ] File size comparison
  - [ ] Download button

### IMG-004: Implement Image Resize
- **Description:** Build image resize feature
- **Module:** Image Conversion
- **Estimated Hours:** 3
- **Dependencies:** IMG-001
- **Acceptance Criteria:**
  - [ ] Width/height inputs
  - [ ] Maintain aspect ratio checkbox
  - [ ] Preview resized image
  - [ ] Show new dimensions
  - [ ] Download resized image

### IMG-005: Implement Image Compress
- **Description:** Build image compression feature
- **Module:** Image Conversion
- **Estimated Hours:** 3
- **Dependencies:** IMG-001
- **Acceptance Criteria:**
  - [ ] Compression quality slider
  - [ ] Show original file size
  - [ ] Show compressed file size
  - [ ] Show reduction percentage
  - [ ] Preview compressed image
  - [ ] Download compressed image

### IMG-006: Implement HEIC to JPG Conversion
- **Description:** Build HEIC→JPG conversion untuk foto iPhone (fitur P0)
- **Module:** Image Conversion
- **Estimated Hours:** 3
- **Dependencies:** IMG-003
- **Acceptance Criteria:**
  - [ ] `heic-to` installed & lazy-loaded (WASM ~2MB)
  - [ ] HEIC/HEIF file validation (magic bytes)
  - [ ] Convert HEIC → JPG (dan PNG)
  - [ ] Quality slider support
  - [ ] Preview + download result
  - [ ] Graceful error untuk file HEIC corrupt

---

### RESPONSIVE-001: Mobile Responsive Polish
- **Description:** Ensure all components work well on mobile
- **Module:** UX
- **Estimated Hours:** 3
- **Dependencies:** All Sprint 1-2 components
- **Acceptance Criteria:**
  - [ ] All pages responsive
  - [ ] Touch targets 44px min
  - [ ] No horizontal scroll
  - [ ] Text readable on mobile
  - [ ] Test on iPhone SE, iPhone 12, Android

---

## ✅ Sprint 3 Summary

| Task ID | Task | Hours | Dependencies |
|---------|------|-------|--------------|
| ✅ IMG-001 | Create Canvas Image Utilities | 1 | None |
| ✅ IMG-002 | Implement Image Format Conversion | 3 | IMG-001 |
| ✅ IMG-003 | Create Image Conversion Page (ImageConfig + aktivasi registry + /image) | 3 | IMG-002, UniversalConverter |
| ✅ IMG-004 | Implement Image Resize | 3 | IMG-001 |
| ✅ IMG-005 | Implement Image Compress | 3 | IMG-001 |
| ✅ IMG-006 | Implement HEIC to JPG Conversion | 3 | IMG-003 |
| ✅ RESPONSIVE-001 | Mobile Responsive Polish | 3 | All |
| **Total** | | **19h** | |

---

## ✅ Sprint 4 Tasks (Completed)

### PDF-005: Install @cantoo/pdf-lib Library
- **Description:** Install @cantoo/pdf-lib (fork pdf-lib yang aktif maintained) untuk PDF manipulation
- **Module:** PDF Conversion
- **Estimated Hours:** 1
- **Dependencies:** None
- **Acceptance Criteria:**
  - [ ] `@cantoo/pdf-lib` installed (lazy-loaded)
  - [ ] Basic PDF creation works

### PDF-006: Implement PDF Merge
- **Description:** Build PDF merge feature
- **Module:** PDF Conversion
- **Estimated Hours:** 4
- **Dependencies:** PDF-005
- **Acceptance Criteria:**
  - [ ] Upload multiple PDFs
  - [ ] Show file list
  - [ ] Reorder via drag & drop
  - [ ] Merge all PDFs
  - [ ] Download merged PDF
  - [ ] Handle different page sizes

### PDF-007: Create PDF Merge Page
- **Description:** Build PDF merge page UI
- **Module:** PDF Conversion
- **Estimated Hours:** 3
- **Dependencies:** PDF-006
- **Acceptance Criteria:**
  - [ ] Page layout with DropZone (multiple)
  - [ ] File list with reorder
  - [ ] Merge button
  - [ ] Progress indicator
  - [ ] Download button

### PDF-008: Implement PDF Split
- **Description:** Build PDF split feature
- **Module:** PDF Conversion
- **Estimated Hours:** 4
- **Dependencies:** PDF-005
- **Acceptance Criteria:**
  - [ ] Upload single PDF
  - [ ] Show page thumbnails
  - [ ] Select pages to extract
  - [ ] Download split PDF

---

### PERF-001: Performance Optimization
- **Description:** Optimize app performance
- **Module:** Performance
- **Estimated Hours:** 3
- **Dependencies:** All
- **Acceptance Criteria:**
  - [ ] Lighthouse score > 90
  - [ ] Bundle size < 200KB
  - [ ] Lazy load conversion libraries
  - [ ] Optimize images

---

### ANALYTICS-001: Integrate Umami Analytics
- **Description:** Set up privacy-friendly analytics via self-hosted Umami
- **Module:** Analytics
- **Estimated Hours:** 2
- **Dependencies:** None
- **Acceptance Criteria:**
  - [ ] Umami script added (umami.alltech.web.id)
  - [ ] Website ID configured via env variable
  - [ ] Custom events configured
  - [ ] Track conversions
  - [ ] Track errors

---

### DONATE-001: Create Donation Button
- **Description:** Build donation button component
- **Module:** Donation
- **Estimated Hours:** 1.5
- **Dependencies:** None
- **Acceptance Criteria:**
  - [ ] Button in header/footer
  - [ ] Link to Saweria
  - [ ] "Powered by donations" text
  - [ ] Accessible

---

### TESTING-001: Write Unit Tests
- **Description:** Write unit tests for core functions
- **Module:** Testing
- **Estimated Hours:** 3
- **Dependencies:** All
- **Acceptance Criteria:**
  - [ ] Test file validation
  - [ ] Test PDF conversion
  - [ ] Test image conversion
  - [ ] Coverage > 80%

---

### DOCS-001: Create README
- **Description:** Write project documentation
- **Module:** Documentation
- **Estimated Hours:** 2
- **Dependencies:** All
- **Acceptance Criteria:**
  - [ ] Project description
  - [ ] Features list
  - [ ] Installation guide
  - [ ] Usage guide
  - [ ] Contributing guide
  - [ ] License

---

## ✅ Sprint 4 Summary

| Task ID | Task | Hours | Dependencies |
|---------|------|-------|--------------|
| ✅ PDF-005 | Install @cantoo/pdf-lib | 1 | None |
| ✅ PDF-006 | Implement PDF Merge (mergePdfs + page) | 4 | PDF-005 |
| ✅ PDF-007 | Create PDF Merge Page (multi-file dropzone, reorder) | 3 | PDF-006 |
| ✅ PDF-008 | Implement PDF Split (first page extract) | 4 | PDF-005 |
| ✅ PERF-001 | Performance Optimization (lazy load all libs) | 3 | All |
| ✅ ANALYTICS-001 | Integrate Umami Analytics (script + env) | 2 | None |
| ✅ DONATE-001 | Donation Button (Saweria link di Footer) | 1.5 | None |
| ✅ TESTING-001 | Final testing & bug fixes | 3 | All |
| ✅ DOCS-001 | Documentation (README + AGENTS.md) | 2 | All |
| **Total** | | **23.5h** | |

---

## All Sprints Summary

| Sprint | Total Hours | Task Count |
|--------|-------------|------------|
| ✅ Sprint 1 | 24.5h | 17 tasks |
| ✅ Sprint 2 | 29.5h | 12 tasks |
| ✅ Sprint 2.5 | 7.5h | 5 tasks |
| ✅ Sprint 3 | 19h | 7 tasks |
| ✅ Sprint 4 | 23.5h | 9 tasks |
| ✅ Sprint 6 (partial) | 8h | 3 tasks |
| **Total** | **112h** | **53 tasks** |
