# High-Level Architecture

## Architecture Style
**Static SPA with Client-Side Processing**

Gantiin adalah Next.js application yang di-deploy sebagai static site. Semua processing file dilakukan di browser menggunakan Web APIs (File API, Web Workers, WASM). Tidak ada server-side processing atau database.

## Diagram

```mermaid
graph TB
    subgraph Browser
        UI[Next.js UI]
        State[Zustand Store]
        Workers[Web Workers]
        WASM[WASM Modules]
        Storage[IndexedDB/LocalStorage]
    end
    
    subgraph External
        Vercel[Vercel CDN]
        Analytics[Plausible Analytics]
        Donation[Saweria API]
    end
    
    UI --> State
    UI --> Workers
    Workers --> WASM
    Workers --> Storage
    Vercel --> UI
    UI --> Analytics
    UI --> Donation
    
    style UI fill:#6366F1,color:#fff
    style Workers fill:#10B981,color:#fff
    style WASM fill:#10B981,color:#fff
```

## Key Decisions

### Why Next.js (Static Export)
- **SEO:** Server-side rendering untuk landing page
- **Performance:** Static generation untuk fast load
- **Developer Experience:** Hot reload, TypeScript, great DX
- **Deployment:** Zero-config deploy ke Vercel

### Why Client-Side Processing
- **Privacy:** File tidak pernah meninggalkan browser
- **Cost:** Zero server cost (100% free hosting)
- **Scalability:** Tidak ada server bottleneck
- **Offline:** Bisa bekerja tanpa internet (setelah initial load)

### Why Web Workers
- **Performance:** Tidak memblokir UI thread
- **UX:** Progress bar bisa update selama konversi
- **Memory:** isolate memory per worker

### Why WASM
- **Performance:** 10-100x lebih cepat dari JavaScript untuk processing
- **Library Support:** Banyak libraries konversi tersedia dalam WASM
- **Compatibility:** Support di semua browser modern

## Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Next.js UI
    participant W as Web Worker
    participant C as Conversion Library
    
    U->>UI: Upload File (Drag & Drop)
    UI->>UI: Validate File (type, size)
    UI->>W: Send File to Worker
    W->>C: Process Conversion
    C-->>W: Return Result
    W-->>UI: Send Converted File
    UI-->>U: Show Preview + Download
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **UI Framework** | Next.js 14 (App Router) | React framework with SSR |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Components** | Shadcn/ui | UI component library |
| **State** | Zustand | Global state management |
| **Validation** | Zod | Schema validation |
| **PDF** | pdf.js + pdf-lib | PDF processing |
| **Image** | browser-image-compression | Image processing |
| **Download** | file-saver | File download |
| **Analytics** | Plausible | Privacy-friendly analytics |
| **Hosting** | Vercel | Static hosting |
| **Domain** | Custom (.com/.id) | Brand identity |
