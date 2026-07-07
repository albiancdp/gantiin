# 22-DATABASE.md — Database Design

## Purpose
Design the database schema: tables, indexes, naming conventions, and migration strategy.

## Input
- `docs/architecture/erd.md` (from 21-ERD)

## Process

1. Translate ERD into table schemas.
2. Define indexes for performance.
3. Establish naming conventions.
4. Choose migration strategy.

## Output

```
docs/architecture/database.md
```

## Template

```markdown
# Database Design

## Naming Conventions

- Tables: snake_case, plural (`users`, `user_sessions`)
- Columns: snake_case (`created_at`, `display_name`)
- Primary keys: `id` (UUID v4)
- Foreign keys: `{table}_id` (`user_id`)
- Indexes: `idx_{table}_{column}`
- Unique constraints: `uq_{table}_{column}`

## Tables

### users
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK, DEFAULT gen_random_uuid() | |
| email | VARCHAR(255) | NOT NULL, UNIQUE | |
| password_hash | VARCHAR(255) | NOT NULL | bcrypt hash |
| email_verified_at | TIMESTAMPTZ | NULLABLE | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | |
| deleted_at | TIMESTAMPTZ | NULLABLE | Soft delete |

### Indexes
- `uq_users_email` ON users(email)
- `idx_users_deleted_at` ON users(deleted_at)

## Migration Strategy

- Use Prisma Migrate for schema migrations
- Each migration is a single atomic change
- Migrations are reviewed before applying to production
- Rollback procedure: `prisma migrate reset` (dev only)
- Production rollback: Restore from backup + apply fix migration

## Seed Data

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create default roles, admin user, etc.
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```
