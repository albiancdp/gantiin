# 62-PERFORMANCE.md — Performance Review

## Purpose
Review and optimize performance across frontend, backend, database, and infrastructure.

## Input
- Production/staging build
- `docs/architecture/` (for reference)

## Process

1. Run Lighthouse audit for frontend performance.
2. Analyze bundle size.
3. Test API response times.
4. Review database query performance.
5. Document optimization opportunities.

## Output

```
docs/performance-report.md
```

## Template

```markdown
# Performance Report

## Lighthouse Scores

| Metric | Score | Target |
|--------|-------|--------|
| Performance | 85 | > 90 |
| Accessibility | 92 | > 95 |
| Best Practices | 90 | > 90 |
| SEO | 95 | > 95 |

### Core Web Vitals
| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| LCP | 2.8s | < 2.5s | ⚠️ Needs improvement |
| FID | 45ms | < 100ms | ✅ Good |
| CLS | 0.05 | < 0.1 | ✅ Good |

## Bundle Analysis

| Bundle | Size (gzip) | Target |
|--------|-------------|--------|
| Main JS | 145 KB | < 150 KB |
| Main CSS | 12 KB | < 20 KB |
| Page: Dashboard | 85 KB | < 100 KB |
| Page: Login | 45 KB | < 50 KB |

## API Performance

| Endpoint | p50 | p95 | p99 | Target |
|----------|-----|-----|-----|--------|
| GET /api/users | 45ms | 120ms | 250ms | < 200ms (p95) |
| POST /api/auth/login | 180ms | 350ms | 500ms | < 200ms (p95) |

## Database Performance

```sql
-- Slow query example
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
-- Index scan, 0.5ms ✅
```

## Optimization Recommendations

| # | Issue | Impact | Effort | Recommendation |
|---|-------|--------|--------|----------------|
| 1 | Large LCP image | High | Low | Add width/height, use next/image |
| 2 | Missing cache headers | Medium | Low | Add Cache-Control to static assets |
| 3 | N+1 query on dashboard | High | Medium | Use Prisma include/select |
