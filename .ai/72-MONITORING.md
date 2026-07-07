# 72-MONITORING.md — Monitoring & Operations

## Purpose
Set up monitoring, logging, health checks, and backup strategies for production.

## Input
- `docs/deployment/` (from 70-DEPLOYMENT)

## Process

1. Configure structured logging.
2. Set up health check endpoint.
3. Configure error tracking (Sentry).
4. Define backup strategy.
5. Set up uptime monitoring.

## Output

```
docs/monitoring.md
```

## Template

```markdown
# Monitoring & Operations

## Logging

### Tool: Pino (structured logging)
```typescript
import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV !== 'production'
    ? { target: 'pino-pretty' }
    : undefined,
})
```

Log format (production):
```json
{
  "level": 30,
  "time": 1704067200000,
  "msg": "User logged in",
  "userId": "abc-123",
  "requestId": "req-456"
}
```

## Health Check Endpoint

`GET /api/health`

```typescript
// Response (200 OK)
{
  status: 'healthy',
  timestamp: '2024-01-01T00:00:00Z',
  uptime: 3600,
  database: 'connected',
  version: '1.0.0'
}
```

## Error Tracking

### Tool: Sentry
```typescript
// next.config.ts
import { withSentryConfig } from '@sentry/nextjs'

const nextConfig = { /* ... */ }

export default withSentryConfig(nextConfig, {
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

- Capture all unhandled errors
- Set up performance tracing
- Configure alert rules for error spikes

## Backup Strategy

### Database Backup
- **Frequency:** Daily full backup, hourly WAL archiving
- **Retention:** 30 days daily, 12 months monthly
- **Storage:** S3-compatible object storage
- **Command:**
  ```bash
  pg_dump -Fc -f backup_$(date +%Y%m%d).dump $DATABASE_URL
  ```

### File Backups
- Uploaded files backed up daily
- Configuration files backed up on change

## Uptime Monitoring

### Tool: Better Stack / Uptime Robot
- Monitor: Health check endpoint every 5 minutes
- Alert: Email + Slack notification on downtime
- SLA Target: 99.9% uptime

## Alerting

| Condition | Channel | Response Time |
|-----------|---------|---------------|
| Service down | Slack + Email | Immediate |
| Error rate > 5% | Slack | < 5 minutes |
| P95 latency > 1s | Slack | < 15 minutes |
| Disk usage > 80% | Email | < 1 hour |
```

## Checklist

- [ ] Logging configured (structured, levels, request IDs)
- [ ] Health check endpoint implemented
- [ ] Sentry error tracking configured
- [ ] Database backup script created
- [ ] Uptime monitoring set up
- [ ] Alert rules defined
- [ ] File saved to `docs/monitoring.md`
