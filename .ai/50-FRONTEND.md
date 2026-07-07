# 50-FRONTEND.md — Frontend Implementation

## Purpose
Implement the frontend based on the design system, UI/UX specs, and API contracts.

## Input
- `docs/design-system.md` (from 40-DESIGN-SYSTEM)
- `docs/uiux/` (from 41-UIUX)
- `docs/architecture/api-design.md` (from 23-API-DESIGN)
- `docs/tasks.md` (from 32-TASK-BREAKDOWN)

## Rules
- **Read all input files thoroughly before writing any code.**
- Follow the folder structure defined in architecture.
- Use Shadcn/ui components as the base UI library.
- Use Tailwind CSS for styling — no CSS modules or styled-components.
- All forms must use React Hook Form + Zod for validation.
- All data fetching must use TanStack Query.
- All state management must use Zustand (for global state).
- Components must be typed with TypeScript.

## Implementation Order

1. Project scaffolding (Next.js, dependencies, configs)
2. Design system tokens (Tailwind config, CSS variables, global styles)
3. Base UI components (Button, Input, Card, Dialog, etc.)
4. Layout components (Sidebar, Header, Page containers)
5. Feature components per sprint/task breakdown
6. Pages and routing
7. API integration

## Code Quality

- Lint: `npm run lint` (ESLint + Next.js config)
- Format: Prettier (consistent formatting)
- Types: Strict TypeScript mode, no `any` types
- Components: Single responsibility, reusable
- Server Components: Use by default, Client Components only when needed

## Error Handling

- Global error boundary for React errors
- TanStack Query error handling for API errors
- Form validation errors displayed inline
- Toast notifications for success/error feedback

## Performance

- Use Next.js Image component for images
- Lazy load below-the-fold content
- Dynamic imports for heavy components
- Route prefetching for anticipated navigation
- Bundle analysis before merging to main
