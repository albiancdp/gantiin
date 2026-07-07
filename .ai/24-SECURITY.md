# 24-SECURITY.md — Security Design

## Purpose
Define the security measures for authentication, authorization, data validation, and common vulnerability prevention.

## Input
- `docs/architecture/api-design.md` (from 23-API-DESIGN)
- `docs/requirements.md` (from 14-REQUIREMENTS)

## Process

1. Review API design and identify security requirements.
2. Define authentication and authorization strategy.
3. Specify validation rules.
4. Document security measures for common vulnerabilities.

## Output

```
docs/architecture/security.md
```

## Template

```markdown
# Security Design

## Authentication

### Strategy: NextAuth.js / Auth.js
- **Providers:** Credentials (email/password), Google OAuth
- **Session:** JWT-based sessions stored in HTTP-only cookies
- **Password Hashing:** bcrypt (12 rounds)
- **Email Verification:** Required before accessing protected features
- **Password Reset:** Token-based with 1-hour expiry

### JWT Configuration
- Algorithm: HS256
- Token expiry: 24 hours
- Refresh token: 7 days (rotating)
- Payload: `{ sub: userId, role: userRole, iat, exp }`

## Authorization

### Role-Based Access Control (RBAC)
- **Roles:** Admin, User, Guest
- **Permissions:** Defined per module/action
- **Implementation:** Next.js middleware + API route guards

```typescript
// Example middleware
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role
    const path = req.nextUrl.pathname
    
    if (path.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect('/unauthorized')
    }
    return NextResponse.next()
  },
  { callbacks: { authorized: ({ token }) => !!token } }
)
```

## Validation

- **Frontend:** Zod schemas for form validation
- **Backend:** Zod schemas reused from shared package
- **API:** Automatic validation via tRPC middleware or Zod resolver
- **Sanitization:** DOMPurify for any HTML content

## Rate Limiting

- **General API:** 100 requests/minute per IP
- **Auth endpoints:** 5 attempts/minute per IP
- **File upload:** 10 requests/minute per user
- **Implementation:** Upstash Ratelimit or express-rate-limit

## CSRF Protection

- NextAuth.js built-in CSRF token
- SameSite=Strict cookie policy
- CORS: Whitelist allowed origins only

## XSS Prevention

- React/Next.js auto-escapes output
- Content Security Policy (CSP) headers
- No `dangerouslySetInnerHTML` unless absolutely necessary
- Input sanitization for user-generated content

## SQL Injection Prevention

- Use Prisma ORM (parameterized queries by default)
- Never use raw SQL queries
- If raw queries are necessary, use Prisma.$queryRaw with template literals

## Data Protection

- All passwords: bcrypt hashed
- All sensitive data: encrypted at rest (AES-256)
- API communication: HTTPS only
- Environment variables: `.env` file (never committed)
- Secrets: Managed via GitHub Secrets / Docker secrets

## Security Headers

```typescript
// next.config.ts
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'" },
]
```
