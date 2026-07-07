# 82-POST-RELEASE.md — Post-Release Review

## Purpose
Document future improvements, technical debt, and known issues after release.

## Input
- All phase outputs
- QA report (from 80-QA)
- Bug report (from 61-BUGFIX)

## Process

1. Review all deferred items and TODO comments.
2. Document technical debt incurred during development.
3. List known issues that were not fixed before release.
4. Prioritize improvements for the next cycle.

## Output

```
docs/post-release.md
```

## Template

```markdown
# Post-Release Review

## Future Improvements

| # | Improvement | Impact | Effort | Priority |
|---|-------------|--------|--------|----------|
| 1 | Implement real-time notifications | High | Medium | P1 |
| 2 | Add dark mode support | Medium | Low | P2 |
| 3 | Implement file export (PDF/CSV) | Medium | Medium | P2 |
| 4 | Multi-language i18n support | High | High | P3 |

## Technical Debt

| # | Item | Module | Impact | Effort to Fix |
|---|------|--------|--------|---------------|
| 1 | Auth service has too many responsibilities | Auth | Medium | 4 hours |
| 2 | No error boundary on dashboard page | Dashboard | Low | 1 hour |
| 3 | Inline styles in legacy components | UI | Low | 3 hours |
| 4 | Missing TypeScript strict mode on 2 files | Config | Medium | 1 hour |

## Known Issues

| # | Issue | Severity | Workaround | Planned Fix |
|---|-------|----------|------------|-------------|
| 1 | Slow initial load on slow connections | Medium | Lazy loading implemented | Sprint 3 |
| 2 | Notifications don't work in Safari | Low | Use Chrome/Firefox | Sprint 4 |

## Lessons Learned

### What went well
- <!-- e.g. PRD-first approach reduced rework -->
- <!-- e.g. Early testing caught critical bugs -->

### What could be improved
- <!-- e.g. More time needed for discovery phase -->
- <!-- e.g. Better communication between frontend and backend -->

### Action Items for Next Release
1. <!-- e.g. Allocate more time for design review -->
2. <!-- e.g. Add performance budgets earlier -->
3. <!-- e.g. Schedule security audit earlier -->
```

## Checklist

- [ ] Future improvements documented and prioritized
- [ ] Technical debt items recorded with estimates
- [ ] Known issues listed with workarounds
- [ ] Lessons learned captured
- [ ] Action items defined for next release
- [ ] File saved to `docs/post-release.md`
