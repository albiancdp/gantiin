# 23-API-DESIGN.md — API Design

## Purpose
Design the API contract: endpoints, request/response formats, error handling, and authentication.

## Input
- `docs/requirements.md` (from 14-REQUIREMENTS)
- `docs/architecture/modules.md` (from 20-ARCHITECTURE)

## Process

1. Define RESTful API endpoints for each module.
2. Document request and response schemas.
3. Define error codes and handling.
4. Specify authentication and authorization.

## Output

```
docs/architecture/api-design.md
```

## Template

```markdown
# API Design

## Base URL

Development: `http://localhost:3000/api`
Production: `https://api.example.com/api`

## Authentication

- Method: JWT Bearer token
- Header: `Authorization: Bearer <token>`
- Token expiry: 24 hours
- Refresh token: 7 days (HTTP-only cookie)

## Endpoints

### Auth Module

#### POST /api/auth/register
- **Description:** Register a new user
- **Auth:** None
- **Request:**
  ```typescript
  {
    email: string    // valid email format
    password: string // min 8 chars, 1 uppercase, 1 number
    name: string     // min 2 chars
  }
  ```
- **Response (201):**
  ```typescript
  {
    id: string
    email: string
    name: string
    createdAt: string
  }
  ```
- **Error Codes:**
  - `400`: Validation error
  - `409`: Email already exists

#### POST /api/auth/login
- **Description:** Authenticate user
- **Auth:** None
- **Request:**
  ```typescript
  {
    email: string
    password: string
  }
  ```
- **Response (200):**
  ```typescript
  {
    token: string
    user: { id: string, email: string, name: string }
  }
  ```

### [Module] Endpoints
...

## Error Response Format

```typescript
{
  error: {
    code: string,    // e.g. "VALIDATION_ERROR"
    message: string, // Human-readable message
    details?: any    // Optional field-level errors
  }
}
```

## Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| VALIDATION_ERROR | 400 | Request validation failed |
| UNAUTHORIZED | 401 | Missing or invalid token |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource already exists |
| RATE_LIMITED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Unexpected server error |

## API Conventions

- All endpoints return JSON
- Pagination: `?page=1&limit=20`, response includes `{ data: [], meta: { total, page, limit, totalPages } }`
- Sorting: `?sort=created_at&order=desc`
- Filtering: `?status=active&search=term`
- Date format: ISO 8601 (`2024-01-01T00:00:00Z`)
