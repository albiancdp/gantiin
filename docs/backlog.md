# Product Backlog (Updated)

## Priority Legend
- **P0 (Must Have):** Critical for launch
- **P1 (Should Have):** Important but not critical
- **P2 (Could Have):** Nice to have
- **P3 (Won't Have):** Future consideration

---

## Epic: Project Setup

### Feature: Project Scaffolding
- **User Story:** As a developer, I want to set up the project so that I can start building features.
- **Acceptance Criteria:**
  - [ ] Next.js project created with TypeScript
  - [ ] Tailwind CSS configured
  - [ ] Shadcn/ui installed and configured
  - [ ] ESLint and Prettier configured
  - [ ] Project structure created
  - [ ] Git repository initialized
- **Priority:** P0
- **Estimate:** S (2 hours)

### Feature: CI/CD Pipeline
- **User Story:** As a developer, I want to set up CI/CD so that code is automatically tested and deployed.
- **Acceptance Criteria:**
  - [ ] GitHub Actions workflow created
  - [ ] Lint and type check on PR
  - [ ] Auto-deploy to Vercel on merge to main
- **Priority:** P1
- **Estimate:** S (2 hours)

---

## Epic: Landing Page

### Feature: Hero Section
- **User Story:** As a visitor, I want to see a compelling hero section so that I understand what Gantiin does.
- **Acceptance Criteria:**
  - [ ] Headline: "Gantiin aja, gampang kok!"
  - [ ] Subheadline: "Konversi file gratis, aman, dan tanpa batas"
  - [ ] CTA button to start converting
  - [ ] Responsive design
  - [ ] Dark/Light mode support
- **Priority:** P0
- **Estimate:** S (3 hours)

### Feature: Features Section
- **User Story:** As a visitor, I want to see the features so that I know what Gantiin can do.
- **Acceptance Criteria:**
  - [ ] Feature cards (PDF, Image, Merge, Split)
  - [ ] Icons for each feature
  - [ ] Brief descriptions
  - [ ] Responsive grid
- **Priority:** P0
- **Estimate:** S (2 hours)

### Feature: Supported Formats Section
- **User Story:** As a visitor, I want to see all supported formats so that I know if my file is supported.
- **Acceptance Criteria:**
  - [ ] List of PDF formats (PDF → TXT)
  - [ ] List of Image formats (PNG, JPG, WEBP)
  - [ ] List of PDF tools (Merge, Split)
  - [ ] Visual icons for each format
- **Priority:** P1
- **Estimate:** S (2 hours)

### Feature: How It Works Section
- **User Story:** As a visitor, I want to see how it works so that I know it's easy to use.
- **Acceptance Criteria:**
  - [ ] 3-step process (Upload → Convert → Download)
  - [ ] Visual illustrations
  - [ ] Numbered steps
- **Priority:** P1
- **Estimate:** S (2 hours)

### Feature: Privacy Section
- **User Story:** As a privacy-conscious visitor, I want to understand how my files are protected.
- **Acceptance Criteria:**
  - [ ] "Client-Side Processing" explanation
  - [ ] "File tidak pernah meninggalkan browser" message
  - [ ] Visual diagram showing client-side flow
  - [ ] Comparison with competitors (optional)
- **Priority:** P1
- **Estimate:** S (2 hours)

### Feature: Footer
- **User Story:** As a visitor, I want to see footer with links and donation button.
- **Acceptance Criteria:**
  - [ ] Copyright notice
  - [ ] Privacy policy link
  - [ ] Donation button
  - [ ] Social links (optional)
- **Priority:** P1
- **Estimate:** S (1 hour)

---

## Epic: File Upload

### Feature: Drag & Drop Upload
- **User Story:** As a user, I want to drag & drop files so that uploading is fast and easy.
- **Acceptance Criteria:**
  - [ ] Visual drop zone with border
  - [ ] Drag over state (highlight)
  - [ ] File type validation
  - [ ] File size validation (50MB max)
  - [ ] Error toast for invalid files
  - [ ] Mobile touch support
- **Priority:** P0
- **Estimate:** M (4 hours)

### Feature: Click-to-Browse Upload
- **User Story:** As a user, I want to click to browse files as an alternative to drag & drop.
- **Acceptance Criteria:**
  - [ ] File input trigger
  - [ ] Same validation as drag & drop
  - [ ] Keyboard accessible
- **Priority:** P0
- **Estimate:** S (2 hours)

### Feature: File Preview
- **User Story:** As a user, I want to preview the file before converting so that I know it's the right file.
- **Acceptance Criteria:**
  - [ ] PDF: Show first page thumbnail
  - [ ] Image: Show image preview
  - [ ] Show file name, size, type
  - [ ] Remove file button
- **Priority:** P1
- **Estimate:** M (4 hours)

### Feature: Multiple File Upload
- **User Story:** As a user, I want to upload multiple files for batch conversion.
- **Acceptance Criteria:**
  - [ ] Support multiple file selection
  - [ ] Show file list
  - [ ] Remove individual files
  - [ ] Clear all files
- **Priority:** P2
- **Estimate:** M (4 hours)

---

## Epic: PDF Conversion

### Feature: PDF to Text
- **User Story:** As a user, I want to convert PDF to text so that I can copy and edit the content.
- **Acceptance Criteria:**
  - [ ] Upload PDF file
  - [ ] Extract text from all pages
  - [ ] Preserve basic formatting
  - [ ] Show progress during conversion
  - [ ] Display text result
  - [ ] Download as .txt file
  - [ ] Copy to clipboard button
  - [ ] Handle encrypted PDFs
- **Priority:** P0
- **Estimate:** L (8 hours)

### Feature: PDF to Image (P1)
- **User Story:** As a user, I want to convert PDF pages to images (PNG/JPG).
- **Acceptance Criteria:**
  - [ ] Upload PDF file
  - [ ] Select output format (PNG/JPG)
  - [ ] Preview page thumbnails
  - [ ] Select pages to convert
  - [ ] Download as images
  - [ ] Quality adjustment for JPG
- **Priority:** P1
- **Estimate:** L (8 hours)

### Feature: Image to PDF (P1)
- **User Story:** As a user, I want to convert images to PDF document.
- **Acceptance Criteria:**
  - [ ] Upload image (PNG, JPG, WEBP)
  - [ ] Preview image
  - [ ] Add multiple images
  - [ ] Reorder images
  - [ ] Download as PDF
  - [ ] Page size options (A4, Letter, etc.)
- **Priority:** P1
- **Estimate:** L (8 hours)

### Feature: PDF Merge
- **User Story:** As a user, I want to merge multiple PDFs into one so that I can combine documents.
- **Acceptance Criteria:**
  - [ ] Upload multiple PDFs
  - [ ] Show file list with order
  - [ ] Reorder files via drag & drop
  - [ ] Merge all PDFs
  - [ ] Download merged PDF
  - [ ] Handle different page sizes
- **Priority:** P1
- **Estimate:** L (6 hours)

### Feature: PDF Split
- **User Story:** As a user, I want to split a PDF so that I can extract specific pages.
- **Acceptance Criteria:**
  - [ ] Upload single PDF
  - [ ] Select pages to extract
  - [ ] Preview page thumbnails
  - [ ] Download split PDF
- **Priority:** P1
- **Estimate:** M (5 hours)

### Feature: PDF Compress (P2)
- **User Story:** As a user, I want to compress PDF to reduce file size.
- **Acceptance Criteria:**
  - [ ] Upload PDF file
  - [ ] Show original file size
  - [ ] Compression quality options
  - [ ] Show compressed file size
  - [ ] Download compressed PDF
- **Priority:** P2
- **Estimate:** M (5 hours)

### Feature: PDF Rotate (P2)
- **User Story:** As a user, I want to rotate PDF pages.
- **Acceptance Criteria:**
  - [ ] Upload PDF file
  - [ ] Preview pages
  - [ ] Rotate individual pages
  - [ ] Download rotated PDF
- **Priority:** P2
- **Estimate:** S (3 hours)

### Feature: PDF Page Numbers (P2)
- **User Story:** As a user, I want to add page numbers to PDF.
- **Acceptance Criteria:**
  - [ ] Upload PDF file
  - [ ] Select position (top/bottom, left/center/right)
  - [ ] Preview with page numbers
  - [ ] Download PDF with page numbers
- **Priority:** P2
- **Estimate:** S (3 hours)

---

## Epic: Image Conversion

### Feature: Image Format Conversion
- **User Story:** As a user, I want to convert images between formats (PNG, JPG, WebP).
- **Acceptance Criteria:**
  - [ ] Upload image (PNG, JPG, WebP)
  - [ ] Select target format
  - [ ] Adjust quality (JPG/WebP)
  - [ ] Preview original and converted
  - [ ] Show file size comparison
  - [ ] Download converted image
- **Priority:** P0
- **Estimate:** L (6 hours)

### Feature: Image Resize
- **User Story:** As a user, I want to resize images so that they fit specific dimensions.
- **Acceptance Criteria:**
  - [ ] Input width/height
  - [ ] Maintain aspect ratio option
  - [ ] Preview resized image
  - [ ] Show new dimensions
  - [ ] Download resized image
- **Priority:** P1
- **Estimate:** M (4 hours)

### Feature: Image Compress
- **User Story:** As a user, I want to compress images so that file size is smaller.
- **Acceptance Criteria:**
  - [ ] Upload image
  - [ ] Show original file size
  - [ ] Compression quality slider
  - [ ] Preview compressed image
  - [ ] Show new file size and reduction %
  - [ ] Download compressed image
- **Priority:** P1
- **Estimate:** M (4 hours)

### Feature: Image Crop (P2)
- **User Story:** As a user, I want to crop images to specific dimensions.
- **Acceptance Criteria:**
  - [ ] Upload image
  - [ ] Crop area selector
  - [ ] Preview cropped image
  - [ ] Download cropped image
- **Priority:** P2
- **Estimate:** M (4 hours)

### Feature: Image Rotate (P2)
- **User Story:** As a user, I want to rotate images.
- **Acceptance Criteria:**
  - [ ] Upload image
  - [ ] Rotate 90° CW/CCW
  - [ ] Flip horizontal/vertical
  - [ ] Download rotated image
- **Priority:** P2
- **Estimate:** S (2 hours)

### Feature: HEIC to JPG (P2)
- **User Story:** As an iPhone user, I want to convert HEIC to JPG so that I can use the image anywhere.
- **Acceptance Criteria:**
  - [ ] Upload HEIC file
  - [ ] Convert to JPG
  - [ ] Quality adjustment
  - [ ] Download JPG
- **Priority:** P2
- **Estimate:** S (3 hours)

---

## Epic: UX

### Feature: Dark/Light Mode
- **User Story:** As a user, I want to toggle dark/light mode for comfortable viewing.
- **Acceptance Criteria:**
  - [ ] Toggle button in header
  - [ ] System preference detection
  - [ ] Save preference to localStorage
  - [ ] Smooth transition
  - [ ] All components support both modes
- **Priority:** P1
- **Estimate:** S (3 hours)

### Feature: Mobile Responsive
- **User Story:** As a mobile user, I want the app to work well on my phone.
- **Acceptance Criteria:**
  - [ ] Responsive breakpoints (mobile, tablet, desktop)
  - [ ] Touch-friendly targets (44px min)
  - [ ] Readable text on mobile
  - [ ] No horizontal scroll
- **Priority:** P0
- **Estimate:** M (included in all components)

### Feature: Error Handling
- **User Story:** As a user, I want clear error messages so that I know what went wrong.
- **Acceptance Criteria:**
  - [ ] Invalid file type error
  - [ ] File too large error
  - [ ] Conversion failed error
  - [ ] Network error (if any)
  - [ ] Toast notifications
  - [ ] Error boundary for crashes
- **Priority:** P0
- **Estimate:** M (4 hours)

### Feature: Loading States
- **User Story:** As a user, I want to see loading states so that I know the app is working.
- **Acceptance Criteria:**
  - [ ] Skeleton loading for components
  - [ ] Progress bar during conversion
  - [ ] Spinner for buttons
  - [ ] Disabled state during loading
- **Priority:** P1
- **Estimate:** S (3 hours)

### Feature: Keyboard Shortcuts (P2)
- **User Story:** As a power user, I want keyboard shortcuts for faster workflow.
- **Acceptance Criteria:**
  - [ ] Cmd+K for command palette
  - [ ] Enter to convert
  - [ ] Ctrl+D to download
  - [ ] Help overlay for shortcuts
- **Priority:** P2
- **Estimate:** S (3 hours)

### Feature: History (P2)
- **User Story:** As a user, I want to see my conversion history.
- **Acceptance Criteria:**
  - [ ] Save conversions to localStorage
  - [ ] Show history list
  - [ ] Re-download previous files
  - [ ] Clear history
- **Priority:** P2
- **Estimate:** M (4 hours)

---

## Epic: SEO

### Feature: SEO Optimization
- **User Story:** As a site owner, I want the site to be SEO-friendly so that users can find it via search.
- **Acceptance Criteria:**
  - [ ] Meta title and description
  - [ ] Open Graph tags
  - [ ] Structured data (JSON-LD)
  - [ ] Semantic HTML
  - [ ] Alt text for images
  - [ ] sitemap.xml
  - [ ] robots.txt
- **Priority:** P0
- **Estimate:** S (3 hours)

### Feature: Landing Pages per Format (P2)
- **User Story:** As a site owner, I want dedicated landing pages for each conversion type.
- **Acceptance Criteria:**
  - [ ] /pdf-to-text landing page
  - [ ] /png-to-jpg landing page
  - [ ] /merge-pdf landing page
  - [ ] SEO optimized for each
- **Priority:** P2
- **Estimate:** M (4 hours)

---

## Epic: Analytics

### Feature: Analytics Integration
- **User Story:** As a site owner, I want to track user behavior so that I can improve the product.
- **Acceptance Criteria:**
  - [ ] Plausible Analytics integrated
  - [ ] Track page views
  - [ ] Track conversion events
  - [ ] Track errors
  - [ ] Privacy-friendly (no personal data)
- **Priority:** P1
- **Estimate:** S (2 hours)

---

## Epic: Donation

### Feature: Donation Button
- **User Story:** As a user, I want to donate to support Gantiin so that it stays free.
- **Acceptance Criteria:**
  - [ ] Donation button in header/footer
  - [ ] Link to Saweria
  - [ ] "Powered by donations" text
  - [ ] Thank you message after donation
- **Priority:** P1
- **Estimate:** S (2 hours)

### Feature: Donation Tiers (P2)
- **User Story:** As a supporter, I want to see different donation tiers.
- **Acceptance Criteria:**
  - [ ] Tier 1: Rp 10.000 (Terima kasih)
  - [ ] Tier 2: Rp 25.000 (Supporter)
  - [ ] Tier 3: Rp 50.000 (Premium Supporter)
  - [ ] Badge on profile (optional)
- **Priority:** P2
- **Estimate:** S (3 hours)

---

## Epic: PWA (P2)

### Feature: PWA Support
- **User Story:** As a mobile user, I want to install Gantiin like a native app.
- **Acceptance Criteria:**
  - [ ] Service worker configured
  - [ ] Manifest file
  - [ ] Install prompt
  - [ ] Offline support (basic)
  - [ ] App icons
- **Priority:** P2
- **Estimate:** M (4 hours)

---

## Epic: Browser Extension (P3)

### Feature: Chrome Extension
- **User Story:** As a power user, I want a browser extension for quick access.
- **Acceptance Criteria:**
  - [ ] Right-click to convert
  - [ ] Popup with converter
  - [ ] Quick access to Gantiin
- **Priority:** P3
- **Estimate:** L (8 hours)

---

## Backlog Summary

| Epic | P0 Stories | P1 Stories | P2 Stories | P3 Stories | Total Estimate |
|------|------------|------------|------------|------------|----------------|
| Project Setup | 1 | 1 | 0 | 0 | 4h |
| Landing Page | 2 | 3 | 0 | 0 | 12h |
| File Upload | 2 | 1 | 1 | 0 | 14h |
| PDF Conversion | 1 | 4 | 3 | 0 | 41h |
| Image Conversion | 1 | 2 | 4 | 0 | 23h |
| UX | 2 | 2 | 2 | 0 | 17h |
| SEO | 1 | 0 | 1 | 0 | 7h |
| Analytics | 0 | 1 | 0 | 0 | 2h |
| Donation | 0 | 1 | 1 | 0 | 5h |
| PWA | 0 | 0 | 1 | 0 | 4h |
| Browser Extension | 0 | 0 | 0 | 1 | 8h |
| **Total** | **10** | **15** | **13** | **1** | **137h** |

---

## Format Support Summary

### P0 - MVP
| Format | Conversion | Priority |
|--------|------------|----------|
| PDF | PDF → TXT | P0 |
| PNG | PNG → JPG, WEBP | P0 |
| JPG | JPG → PNG, WEBP | P0 |
| WEBP | WEBP → PNG, JPG | P0 |

### P1 - Extended
| Format | Conversion | Priority |
|--------|------------|----------|
| PDF | PDF → Image (PNG/JPG) | P1 |
| Image | Image → PDF | P1 |
| PDF | PDF Merge | P1 |
| PDF | PDF Split | P1 |
| Image | Image Resize | P1 |
| Image | Image Compress | P1 |

### P2 - Growth
| Format | Conversion | Priority |
|--------|------------|----------|
| DOC/DOCX | DOC ↔ PDF | P2 |
| PPT/PPTX | PPT ↔ PDF | P2 |
| XLS/XLSX | XLS ↔ PDF | P2 |
| PDF | PDF Compress | P2 |
| PDF | PDF Rotate | P2 |
| PDF | PDF Page Numbers | P2 |
| Image | Image Crop | P2 |
| Image | Image Rotate | P2 |
| HEIC | HEIC → JPG | P2 |
| GIF | GIF Support | P2 |
| SVG | SVG Support | P2 |

### P3 - Future
| Format | Conversion | Priority |
|--------|------------|----------|
| OCR | Image → Text | P3 |
| PDF | PDF Unlock/Protect | P3 |
| Advanced | AI Summarizer | P3 |
| Extension | Browser Extension | P3 |
