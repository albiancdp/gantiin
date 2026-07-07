# Technical Recommendations

## Architecture

### Recommended Pattern: Static SPA with Client-Side Processing
- **Why:** 
  - Tidak perlu server (zero cost)
  - Privasi terjamin (file tidak离开 browser)
  - Deployment gratis di Vercel/Netlify/Cloudflare Pages
- **Trade-off:**
  - Tidak ada server-side processing
  - Bergantung pada kemampuan browser user
  - Tidak ada user accounts (localStorage only)

### Folder Structure
```
gantiin/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # Shadcn/ui components
│   │   ├── upload/             # File upload components
│   │   ├── convert/            # Conversion components
│   │   └── layout/             # Layout components
│   ├── lib/
│   │   ├── conversions/        # Conversion logic
│   │   │   ├── pdf.ts          # PDF conversion
│   │   │   ├── image.ts        # Image conversion
│   │   │   └── index.ts        # Main entry
│   │   ├── utils.ts            # Utility functions
│   │   └── constants.ts        # Constants
│   ├── hooks/                  # Custom React hooks
│   ├── store/                  # Zustand stores
│   └── types/                  # TypeScript types
├── public/                     # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Libraries & Tools

### Core Dependencies

| Library | Purpose | Size | Why This |
|---------|---------|------|----------|
| **next** | Framework | - | React framework terbaik, SEO-friendly |
| **react** | UI Library | - | Standard, ekosistem besar |
| **tailwindcss** | Styling | ~3KB | Utility-first, minimal CSS |
| **@shadcn/ui** | Components | ~50KB | Beautiful, accessible, customizable |
| **zustand** | State | ~1KB | Lightweight, simple API |
| **zod** | Validation | ~12KB | Type-safe, integrasi dengan TypeScript |

### Conversion Libraries

| Library | Purpose | Size | Why This |
|---------|---------|------|----------|
| **pdf.js** | PDF rendering | ~400KB | Standard untuk PDF di browser |
| **pdf-lib** | PDF manipulation | ~200KB | Create/edit PDF di browser |
| **browser-image-compression** | Image compression | ~50KB | Lightweight, bagus hasilnya |
| **file-saver** | File download | ~5KB | Simple API untuk download |
| **jszip** | ZIP creation | ~45KB | Untuk batch download |

### Development Tools

| Tool | Purpose |
|------|---------|
| **TypeScript** | Type safety |
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Vitest** | Unit testing |
| **Playwright** | E2E testing |

---

## Performance

### Optimization Strategies

#### 1. Code Splitting
- Lazy load conversion libraries
- Dynamic imports untuk heavy components
- Route-based code splitting (Next.js default)

#### 2. Caching
- **Service Worker:** Cache static assets
- **IndexedDB:** Cache conversion results
- **Memory Cache:** Cache loaded libraries

#### 3. Rendering Strategy
- **Landing Page:** Server-side rendered (SEO)
- **Converter Page:** Client-side rendered (interactive)
- **Static Pages:** Static generation (about, privacy policy)

#### 4. Image Optimization
- Next.js Image component untuk semua gambar
- WebP/AVIF format untuk performance
- Lazy loading untuk below-the-fold images

#### 5. Bundle Optimization
- Analyze bundle size regularly
- Remove unused code
- Tree shaking untuk libraries

### Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3s |
| Total Bundle Size | < 200KB (gzipped) |
| Conversion Time (10MB) | < 5s |

---

## Security

### Client-Side Security Measures

#### 1. Content Security Policy (CSP)
```http
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self';
  connect-src 'self';
  worker-src 'self' blob:;
```

#### 2. Input Validation
- Validate file types using magic bytes, not just extensions
- Limit file size (50MB max)
- Sanitize file names

#### 3. Memory Safety
- Revoke object URLs after use
- Close Web Workers after completion
- Limit concurrent conversions

#### 4. Privacy
- No server-side processing
- No analytics that tracks file contents
- Clear privacy policy
- No cookies for tracking

### What NOT to Do
- ❌ Jangan upload file ke server
- ❌ Jangan track nama file
- ❌ Jangan simpan file di localStorage (terlalu besar)
- ❌ Jangan gunakan third-party analytics yang invasive

---

## Accessibility

### WCAG 2.1 AA Compliance

#### 1. Keyboard Navigation
- Semua interactive elements bisa diakses dengan keyboard
- Focus visible yang jelas
- Skip navigation link

#### 2. Screen Reader Support
- ARIA labels untuk semua icons
- Live regions untuk status updates
- Semantic HTML structure

#### 3. Color Contrast
- Minimum 4.5:1 untuk normal text
- Minimum 3:1 untuk large text
- Test dengan color blindness simulators

#### 4. Responsive Design
- Text bisa di-zoom sampai 200%
- Tidak ada horizontal scrolling
- Touch targets minimum 44px

---

## Testing Strategy

### Unit Tests (Vitest)
- Test semua conversion functions
- Test utility functions
- Test Zod schemas
- Target: > 80% coverage

### Integration Tests
- Test file upload flow
- Test conversion flow
- Test download flow
- Test error handling

### E2E Tests (Playwright)
- Test complete user journey
- Test mobile viewport
- Test different file types
- Test error scenarios

### Manual Testing
- Test di berbagai browser (Chrome, Firefox, Safari, Edge)
- Test di berbagai device (mobile, tablet, desktop)
- Test dengan file yang berbeda ukuran
- Test dengan koneksi lambat
