# Folder Structure

```
gantiin/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # CI pipeline
│       └── deploy.yml                # Deploy to Vercel
├── .ai/                              # AI framework (not deployed)
├── docs/                             # Documentation (not deployed)
├── public/
│   ├── favicon.ico                   # Favicon
│   ├── og-image.png                  # OG image
│   └── robots.txt                    # Robots file
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Landing page
│   │   ├── globals.css               # Global styles
│   │   ├── pdf/
│   │   │   └── page.tsx              # PDF converter page
│   │   ├── image/
│   │   │   └── page.tsx              # Image converter page
│   │   └── merge/
│   │       └── page.tsx              # PDF merge page
│   ├── components/
│   │   ├── ui/                       # Shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── select.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── toast.tsx
│   │   │   └── skeleton.tsx
│   │   ├── upload/
│   │   │   ├── DropZone.tsx
│   │   │   ├── FileInput.tsx
│   │   │   └── FilePreview.tsx
│   │   ├── convert/
│   │   │   ├── ConvertButton.tsx
│   │   │   ├── ConvertProgress.tsx
│   │   │   └── ConvertResult.tsx
│   │   ├── donation/
│   │   │   ├── DonateButton.tsx
│   │   │   └── DonateModal.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── ThemeToggle.tsx
│   │       └── Container.tsx
│   ├── lib/
│   │   ├── conversions/
│   │   │   ├── index.ts              # Main entry
│   │   │   ├── pdf.ts                # PDF conversion
│   │   │   ├── image.ts              # Image conversion
│   │   │   ├── engine.ts             # Conversion engine
│   │   │   └── types.ts              # Conversion types
│   │   ├── utils.ts                  # Utility functions
│   │   ├── constants.ts              # Constants
│   │   ├── validations.ts            # Zod schemas
│   │   └── analytics.ts              # Analytics helper
│   ├── hooks/
│   │   ├── useFileUpload.ts          # File upload hook
│   │   ├── useConversion.ts          # Conversion hook
│   │   └── useTheme.ts               # Theme hook
│   ├── store/
│   │   ├── theme.ts                  # Theme store
│   │   └── converter.ts              # Converter store
│   └── types/
│       ├── file.ts                   # File types
│       └── conversion.ts             # Conversion types
├── workers/
│   ├── pdf.worker.ts                 # PDF Web Worker
│   └── image.worker.ts               # Image Web Worker
├── prisma/                           # Not used (no database)
├── docker-compose.yml                # Not used (no server)
├── Dockerfile                        # Not used (static)
├── next.config.ts                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── package.json                      # Dependencies
├── .env.example                      # Environment variables
├── .gitignore                        # Git ignore
├── README.md                         # Project readme
└── LICENSE                           # MIT License
```

## Key Files Description

### Configuration Files
| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration (output: 'export' for static) |
| `tailwind.config.ts` | Tailwind CSS configuration with custom theme |
| `tsconfig.json` | TypeScript strict mode configuration |
| `package.json` | Dependencies and scripts |

### Source Files
| Directory | Purpose |
|-----------|---------|
| `src/app/` | Next.js App Router pages |
| `src/components/ui/` | Shadcn/ui base components |
| `src/components/upload/` | File upload components |
| `src/components/convert/` | Conversion UI components |
| `src/lib/conversions/` | Core conversion logic |
| `src/hooks/` | Custom React hooks |
| `src/store/` | Zustand stores |
| `workers/` | Web Worker scripts |

### Not Used
| Directory | Reason |
|-----------|--------|
| `prisma/` | No database (client-side only) |
| `docker-compose.yml` | No server to containerize |
| `Dockerfile` | Static site, no server |
