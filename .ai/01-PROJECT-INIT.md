# 01-PROJECT-INIT.md — Project Initialization

## Purpose
Understand the project at a high level and produce a project overview document that will guide all subsequent phases.

## Input
- Client requirements (if any)
- Stakeholder interviews
- Existing documentation

## Process

1. Gather project context from available sources.
2. Fill in the project overview template below.
3. Save to `docs/project-overview.md`.

## Output

```
docs/project-overview.md
```

## Template

```markdown
# Project Overview

## Project Name
<!-- The official project name -->

## Goals
<!-- 3-5 key business goals -->

## Target Users
<!-- Who will use this product? -->

## Scope
### In Scope
<!-- Features and deliverables included -->

### Out of Scope
<!-- Explicitly excluded items -->

## Tech Stack
- Frontend: Next.js 14+ (App Router) + TypeScript
- Styling: Tailwind CSS + Shadcn/ui
- Data Fetching: TanStack Query
- State Management: Zustand
- Backend: Next.js API Routes / tRPC
- ORM: Prisma or Drizzle ORM
- Database: MySQL or PostgreSQL
- Validation: Zod
- Testing: Vitest, Playwright
- CI/CD: GitHub Actions
- Deployment: Docker + Docker Compose

## Constraints
<!-- Budget, timeline, regulatory, technical constraints -->

## Success Criteria
<!-- How will we know the project is successful? -->
```

## Checklist

- [ ] Project name is defined
- [ ] Goals are documented and aligned with stakeholders
- [ ] Target users are identified
- [ ] Scope (in/out) is clearly stated
- [ ] Tech stack is confirmed
- [ ] Constraints are listed
- [ ] Success criteria are measurable
- [ ] File saved to `docs/project-overview.md`
