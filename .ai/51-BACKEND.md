# 51-BACKEND.md — Backend Implementation

## Purpose
Implement the backend: API routes, business logic, database operations, and integrations.

## Input
- `docs/architecture/api-design.md` (from 23-API-DESIGN)
- `docs/architecture/database.md` (from 22-DATABASE)
- `docs/architecture/security.md` (from 24-SECURITY)
- `docs/tasks.md` (from 32-TASK-BREAKDOWN)

## Rules
- **Read all input files thoroughly before writing any code.**
- Use Next.js API Routes or tRPC routers for endpoints.
- Use Prisma/Drizzle for all database operations.
- All inputs must be validated with Zod before processing.
- Business logic belongs in service functions, not in route handlers.
- Error handling must return consistent error responses as defined in API design.

## Implementation Order

1. Database schema (Prisma/Drizzle schema file)
2. Database client configuration
3. Shared types and Zod schemas
4. Service layer (business logic)
5. API route handlers / tRPC routers
6. Middleware (auth, validation, rate limiting)
7. Integration with external services

## Code Quality

- Lint: `npm run lint`
- Types: Strict TypeScript, no `any`
- Services: Pure functions where possible, testable
- Error handling: Typed error classes, consistent error responses
- Logging: Use Pino for structured logging

## Database

- Always use Prisma/Drizzle migrations for schema changes
- Write efficient queries (select only needed fields)
- Use transactions for multi-step operations
- Implement soft delete when applicable
- Add indexes for frequent query patterns

## API Patterns

```typescript
// Example service pattern
export async function createUser(data: CreateUserInput) {
  const validated = createUserSchema.parse(data)
  
  const existing = await db.user.findUnique({
    where: { email: validated.email }
  })
  
  if (existing) {
    throw new AppError('CONFLICT', 'Email already exists')
  }
  
  const hashedPassword = await bcrypt.hash(validated.password, 12)
  
  return db.user.create({
    data: {
      email: validated.email,
      passwordHash: hashedPassword,
      name: validated.name,
    },
    select: { id: true, email: true, name: true, createdAt: true }
  })
}
```
