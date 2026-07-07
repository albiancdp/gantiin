# 42-DESIGN-REVIEW.md — Design Review

## Purpose
Review the UI/UX design for issues, inconsistencies, accessibility problems, and usability concerns before implementation begins.

## Input
- `docs/uiux/` (from 41-UIUX)
- `docs/design-system.md` (from 40-DESIGN-SYSTEM)

## Process

1. Review all pages and flows against UX best practices.
2. Check UI consistency with the design system.
3. Audit accessibility (WCAG 2.1 AA).
4. Document issues found and recommendations.

## Output

```
docs/design-review.md
```

## Template

```markdown
# Design Review

## UX Issues

| # | Issue | Page/Component | Severity | Recommendation |
|---|-------|----------------|----------|----------------|
| 1 | No loading state on login button | Login | High | Add spinner to button during API call |
| 2 | Error messages not associated with fields | Login | Medium | Use aria-describedby for error messages |
| 3 | No confirmation before destructive action | Dashboard | High | Add confirmation dialog |

## UI Issues

| # | Issue | Page/Component | Severity | Recommendation |
|---|-------|----------------|----------|----------------|
| 1 | Inconsistent button padding | All | Medium | Use design system spacing tokens |
| 2 | Missing hover states on cards | Dashboard | Low | Add subtle shadow on hover |

## Accessibility Issues

| # | Issue | WCAG Criterion | Severity | Recommendation |
|---|-------|----------------|----------|----------------|
| 1 | Low contrast on secondary text | 1.4.3 (AA) | High | Increase contrast ratio to 4.5:1 |
| 2 | Missing form labels | 4.1.2 (AA) | High | Add visible labels or aria-labels |
| 3 | Keyboard navigation broken in modal | 2.1.1 (AA) | High | Trap focus, add Escape handler |

## Consistency Check

- [ ] Colors match design system tokens
- [ ] Typography uses defined scale
- [ ] Spacing follows 4px grid
- [ ] Button styles are consistent
- [ ] Icon sizes are uniform
- [ ] Border radii are consistent

## Conclusion

<!-- Summary of overall quality and blockers -->
```
