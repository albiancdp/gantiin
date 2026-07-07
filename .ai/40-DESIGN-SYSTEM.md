# 40-DESIGN-SYSTEM.md — Design System

## Purpose
Define the visual design system: colors, typography, spacing, components, and icons.

## Input
- `docs/discovery/user-personas.md` (from 10-DISCOVERY)
- `docs/research/ui-trends.md` (from 11-RESEARCH)

## Process

1. Define color palette (primary, secondary, neutral, semantic).
2. Choose typography (font family, sizes, weights).
3. Define spacing and sizing grid.
4. List UI components and their variants.
5. Choose icon library.

## Output

```
docs/design-system.md
```

## Template

```markdown
# Design System

## Colors

### Brand Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | #2563EB | Primary buttons, links, active states |
| `--color-primary-foreground` | #FFFFFF | Text on primary backgrounds |
| `--color-secondary` | #F59E0B | Secondary actions, accents |

### Neutral Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-background` | #FFFFFF | Page background |
| `--color-foreground` | #0F172A | Primary text |
| `--color-muted` | #F1F5F9 | Muted backgrounds |
| `--color-muted-foreground` | #64748B | Secondary text |

### Semantic Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | #10B981 | Success states |
| `--color-warning` | #F59E0B | Warning states |
| `--color-error` | #EF4444 | Error states |
| `--color-info` | #3B82F6 | Information states |

## Typography

### Font Family
- Primary: `Inter` (sans-serif)
- Monospace: `JetBrains Mono` (for code)

### Font Sizes

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--text-xs` | 0.75rem | 1rem | Captions, labels |
| `--text-sm` | 0.875rem | 1.25rem | Secondary text |
| `--text-base` | 1rem | 1.5rem | Body text |
| `--text-lg` | 1.125rem | 1.75rem | Large body |
| `--text-xl` | 1.25rem | 1.75rem | Subheadings |
| `--text-2xl` | 1.5rem | 2rem | Section headings |
| `--text-3xl` | 1.875rem | 2.25rem | Page headings |

## Spacing

Based on 4px grid:
- `--space-1`: 0.25rem (4px)
- `--space-2`: 0.5rem (8px)
- `--space-3`: 0.75rem (12px)
- `--space-4`: 1rem (16px)
- `--space-6`: 1.5rem (24px)
- `--space-8`: 2rem (32px)
- `--space-12`: 3rem (48px)
- `--space-16`: 4rem (64px)

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 0.25rem | Inputs, small elements |
| `--radius-md` | 0.5rem | Cards, modals |
| `--radius-lg` | 0.75rem | Large containers |
| `--radius-full` | 9999px | Badges, pills |

## Components

Based on Shadcn/ui components:
- Button (primary, secondary, outline, ghost, destructive)
- Input (text, select, textarea, file)
- Card (default, interactive)
- Dialog / Modal
- Dropdown Menu
- Navigation (sidebar, topbar, tabs)
- Table (sortable, filterable)
- Badge
- Toast / Notification
- Skeleton (loading states)

## Icons

- Library: Lucide React
- Size: 16px (sm), 20px (md), 24px (lg)
- Style: Stroke-based, consistent 2px stroke width
