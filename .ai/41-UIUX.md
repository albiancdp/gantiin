# 41-UIUX.md — UI/UX Design

## Purpose
Design the user interface and experience: wireframes, page layouts, user flows, responsive behavior, and animations.

## Input
- `docs/discovery/user-journey.md` (from 10-DISCOVERY)
- `docs/design-system.md` (from 40-DESIGN-SYSTEM)
- `docs/PRD.md` (from 13-PRD)

## Process

1. Review user journeys and PRD features.
2. Create wireframes for each page/screen.
3. Define page layouts and component placement.
4. Map user flows between pages.
5. Define responsive breakpoints.
6. Specify animations and transitions.

## Output

```
docs/uiux/
├── pages.md
├── flows.md
├── responsive.md
└── animations.md
```

## Template

### Pages

```markdown
# Page Inventory

## Page: Login
- **Route:** /login
- **Purpose:** User authentication
- **Layout:** Centered card layout
- **Key Components:**
  - Logo/App name (top)
  - Email input field
  - Password input field with show/hide toggle
  - Login button (primary, full width)
  - Register link (below form)
  - Forgot password link

## Page: Dashboard
- **Route:** /dashboard
- **Purpose:** Main overview after login
- **Layout:** Sidebar + main content
- **Key Components:**
  - Sidebar navigation
  - Header with user menu
  - Stats cards (4-column grid)
  - Recent activity list
  - Quick action buttons
```

### Flows

```markdown
# User Flows

## Flow: User Registration → Dashboard
1. User visits /register
2. Fills in email, password, name
3. Submits form
4. Sees success message with email verification prompt
5. Clicks verification link in email
6. Redirected to /login
7. Logs in
8. Redirected to /dashboard

## Flow: ...
```

### Responsive

```markdown
# Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, bottom navigation |
| Tablet | 640px - 1024px | Two column, collapsible sidebar |
| Desktop | > 1024px | Full layout with sidebar |

## Mobile Considerations
- Touch targets: minimum 44x44px
- No hover-dependent interactions
- Swipe gestures for common actions
- Bottom sheet instead of modal
```

### Animations

```markdown
# Animations & Transitions

## Page Transitions
- Route changes: Fade + slide (300ms ease-in-out)
- Modal: Scale up + fade in (200ms)

## Micro-interactions
- Button hover: Scale 1.02 + shadow (150ms)
- Input focus: Border color transition (200ms)
- Toast: Slide in from right (300ms)
- Skeleton loading: Pulse animation (1.5s loop)

## Performance
- Use CSS transforms (GPU accelerated)
- Avoid animating layout properties (width, height, top)
- Use Framer Motion for complex animations
