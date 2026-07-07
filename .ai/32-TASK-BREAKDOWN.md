# 32-TASK-BREAKDOWN.md — Task Breakdown

## Purpose
Break down sprint stories into individual, actionable tasks with clear ownership and time estimates.

## Input
- `docs/sprints.md` (from 31-SPRINT-PLANNING)
- `docs/backlog.md` (from 30-BACKLOG)

## Process

1. Review sprint stories and acceptance criteria.
2. Break each story into small, testable tasks.
3. Assign unique task IDs.
4. Estimate hours for each task.
5. Identify task dependencies.

## Output

```
docs/tasks.md
```

## Template

```markdown
# Task Breakdown

## Task ID Format: `{MODULE}-{NNN}`
- Example: `AUTH-001`, `DASH-001`, `API-001`

## Convention
- Each task should be completable in 2-4 hours
- If a task exceeds 4 hours, break it down further

---

## Sprint 1 Tasks

### AUTH-001: Create Login Page
- **Description:** Build the login page with email and password fields, validation, and submit handler
- **Module:** Authentication
- **Estimated Hours:** 4
- **Dependencies:** AUTH-002 (Auth API setup)
- **Acceptance Criteria:**
  - [ ] Email field with validation
  - [ ] Password field with show/hide toggle
  - [ ] Form validation (Zod) on submit
  - [ ] Loading state during submission
  - [ ] Error state for invalid credentials
  - [ ] Success redirect to dashboard

### AUTH-002: Set Up Auth API Routes
- **Description:** Create Next.js API routes for login, register, and session
- **Module:** Authentication
- **Estimated Hours:** 4
- **Dependencies:** None
- **Acceptance Criteria:**
  - [ ] POST /api/auth/login endpoint
  - [ ] POST /api/auth/register endpoint
  - [ ] GET /api/auth/session endpoint
  - [ ] JWT token generation and validation
  - [ ] Error handling for all cases

### AUTH-003: Implement Auth Middleware
- **Description:** Create middleware to protect routes and check authentication
- **Module:** Authentication
- **Estimated Hours:** 2
- **Dependencies:** AUTH-002
- **Acceptance Criteria:**
  - [ ] Middleware checks JWT on protected routes
  - [ ] Redirects to login if unauthenticated
  - [ ] Returns 401 for API routes
  - [ ] Role-based access for admin routes

---

## Sprint N Tasks
...
```

## Checklist

- [ ] Every sprint story is broken into tasks
- [ ] Task IDs follow the standardized format
- [ ] Each task has a clear description
- [ ] Time estimates are realistic (2-4 hours per task)
- [ ] Dependencies between tasks are identified
- [ ] All tasks have acceptance criteria
- [ ] File saved to `docs/tasks.md`
