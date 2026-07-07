# Success Metrics

## Adoption Metrics

### User Acquisition
| Metric | Target (MVP) | Target (6 bulan) | How to Measure |
|--------|--------------|------------------|----------------|
| Unique Visitors | 1,000 | 50,000 | Plausible Analytics |
| Monthly Active Users | - | 10,000 | Plausible Analytics |
| New Users/month | 500 | 5,000 | Plausible Analytics |
| Return Users | - | 30% | Plausible Analytics |

### User Engagement
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Conversion Rate (visitor → converted) | 60% | Custom event |
| Average Session Duration | > 2 min | Plausible Analytics |
| Pages per Session | > 2 | Plausible Analytics |
| Bounce Rate | < 40% | Plausible Analytics |

---

## Performance Metrics

### Core Web Vitals
| Metric | Target | How to Measure |
|--------|--------|----------------|
| LCP (Largest Contentful Paint) | < 2.5s | Lighthouse, CrUX |
| FID (First Input Delay) | < 100ms | Lighthouse, CrUX |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse, CrUX |
| TTFB (Time to First Byte) | < 200ms | Lighthouse |

### Application Performance
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Conversion Time (file < 10MB) | < 5s | Custom metric |
| Conversion Time (file 10-50MB) | < 15s | Custom metric |
| Upload Time | < 2s | Custom metric |
| Download Time | < 1s | Custom metric |
| Bundle Size (gzipped) | < 200KB | Build analysis |

### Lighthouse Scores
| Category | Target |
|----------|--------|
| Performance | > 90 |
| Accessibility | > 90 |
| Best Practices | > 90 |
| SEO | > 90 |

---

## Quality Metrics

### Testing
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Unit Test Coverage | > 80% | Vitest |
| E2E Test Coverage | All P0 flows | Playwright |
| Bug Rate | < 5 bugs/month | GitHub Issues |
| Critical Bugs | 0 | GitHub Issues |

### User Satisfaction
| Metric | Target | How to Measure |
|--------|--------|----------------|
| User Satisfaction Score | > 4.5/5 | Feedback form |
| NPS (Net Promoter Score) | > 50 | Survey |
| Support Tickets | < 10/month | Email/form |
| Feature Requests | Tracked | GitHub Discussions |

---

## Business Metrics

### Revenue
| Metric | Target (6 bulan) | How to Measure |
|--------|------------------|----------------|
| Donation Revenue | Rp 5 juta/bulan | Saweria dashboard |
| Average Donation | Rp 50.000 | Saweria dashboard |
| Donation Conversion Rate | 1% | Donation / MAU |
| Monthly Donors | 100 | Saweria dashboard |

### Growth
| Metric | Target (6 bulan) | How to Measure |
|--------|------------------|----------------|
| Organic Traffic | 60% of total | Plausible Analytics |
| Social Mentions | 50/month | Social monitoring |
| Backlinks | 20 | Ahrefs/SEMrush |
| Domain Authority | 20 | Moz/Ahrefs |

---

## Tracking Implementation

### Analytics Events to Track

#### User Actions
```typescript
// File uploaded
track('file_uploaded', { 
  file_type: 'pdf', 
  file_size: 1024000 
})

// Conversion started
track('conversion_started', { 
  from_format: 'pdf', 
  to_format: 'text' 
})

// Conversion completed
track('conversion_completed', { 
  from_format: 'pdf', 
  to_format: 'text',
  duration_ms: 3200 
})

// File downloaded
track('file_downloaded', { 
  file_type: 'text',
  file_size: 512000 
})
```

#### Error Tracking
```typescript
// Conversion failed
track('conversion_failed', { 
  from_format: 'pdf',
  error_type: 'file_too_large' 
})

// Browser not supported
track('browser_not_supported', { 
  browser: 'ie11' 
})
```

### Dashboard Metrics (Weekly Review)
1. Total visitors this week
2. Total conversions this week
3. Average conversion time
4. Error rate
5. Top conversion types
6. Device breakdown (mobile vs desktop)
7. Browser breakdown
