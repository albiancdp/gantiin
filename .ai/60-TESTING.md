# 60-TESTING.md — Testing

## Purpose
Generate and execute tests: unit tests, integration tests, manual test scripts, and end-to-end tests.

## Input
- `docs/tasks.md` (from 32-TASK-BREAKDOWN)
- `docs/architecture/api-design.md` (from 23-API-DESIGN)

## Process

1. Write unit tests for business logic and utilities.
2. Write integration tests for API endpoints.
3. Create manual test scripts for QA.
4. Write E2E tests for critical user flows.

## Output

```
docs/testing/
├── unit-test-report.md
├── integration-test-report.md
├── manual-test-script.md
└── e2e-test-report.md
```

## Testing Strategy

| Type | Tool | Scope | Target Coverage |
|------|------|-------|-----------------|
| Unit | Vitest | Services, utilities, validation schemas | > 80% |
| Integration | Vitest + Supertest | API endpoints | > 70% |
| E2E | Playwright | Critical user flows | All P0 flows |
| Manual | Scripted test cases | Full feature coverage | All P0-P1 features |

## Template

### Unit Tests

```typescript
import { describe, it, expect } from 'vitest'
import { createUserSchema } from '@/lib/validations/auth'

describe('createUserSchema', () => {
  it('accepts valid input', () => {
    const result = createUserSchema.safeParse({
      email: 'test@example.com',
      password: 'Password1',
      name: 'Test User',
    })
    expect(result.success).toBe(true)
  })

  it('rejects weak password', () => {
    const result = createUserSchema.safeParse({
      email: 'test@example.com',
      password: 'weak',
      name: 'Test User',
    })
    expect(result.success).toBe(false)
  })
})
```

### Integration Tests

```typescript
import { describe, it, expect } from 'vitest'

describe('POST /api/auth/register', () => {
  it('creates a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'Password1', name: 'Test' })
    
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).not.toHaveProperty('passwordHash')
  })
})
```

### E2E Tests (Playwright)

```typescript
import { test, expect } from '@playwright/test'

test('user can register and log in', async ({ page }) => {
  await page.goto('/register')
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="password"]', 'Password1')
  await page.fill('[name="name"]', 'Test User')
  await page.click('button[type="submit"]')
  await expect(page.locator('text=Verification')).toBeVisible()
})
```

## Test Requirements

- All tests must be deterministic (no test depends on another)
- Mock external services (email, payment, etc.)
- Use test database (separate from dev/production)
- Tests must pass before code is merged
- New features require new tests

## Checklist

- [ ] Unit tests written for all services
- [ ] Unit tests written for all Zod schemas
- [ ] Integration tests for all API endpoints
- [ ] E2E tests for all P0 user flows
- [ ] Manual test script covers all P0-P1 features
- [ ] Test coverage meets minimum targets
- [ ] All tests passing
- [ ] Files saved to `docs/testing/`
