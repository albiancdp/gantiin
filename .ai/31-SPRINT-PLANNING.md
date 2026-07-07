# 31-SPRINT-PLANNING.md — Sprint Planning

## Purpose
Divide the product backlog into sprints based on priority, dependencies, and team capacity.

## Input
- `docs/backlog.md` (from 30-BACKLOG)

## Process

1. Review the prioritized backlog.
2. Identify dependencies between stories.
3. Estimate capacity per sprint (assume 2-week sprints).
4. Assign stories to sprints.
5. Define sprint goals.

## Output

```
docs/sprints.md
```

## Template

```markdown
# Sprint Plan

## Assumptions
- Sprint duration: 2 weeks
- Team: 1 frontend, 1 backend, 1 designer (or AI agents)
- Capacity: ~20 story points per sprint

---

## Sprint 1: Foundation
**Goal:** Core authentication and basic project setup

| Story | Points | Dependencies |
|-------|--------|--------------|
| Project scaffolding (Next.js, Prisma, Tailwind) | 2 | None |
| Database schema setup & migrations | 2 | None |
| User registration | 3 | Schema |
| User login | 2 | Registration |
| Basic layout & navigation | 3 | Scaffolding |
| **Total** | **12** | |

---

## Sprint 2: Core Features
**Goal:** Main business logic implementation

| Story | Points | Dependencies |
|-------|--------|--------------|
| Feature A | 5 | Sprint 1 |
| Feature B | 3 | Sprint 1 |
| Feature C | 5 | Feature A |
| **Total** | **13** | |

---

## Sprint 3: Integration & Polish
...

## Sprint 4: Testing & Launch
...
```

## Checklist

- [ ] All P0 stories are assigned to early sprints
- [ ] Dependencies between stories are resolved
- [ ] Each sprint has a clear goal
- [ ] Sprint capacity is respected (no overcommitment)
- [ ] File saved to `docs/sprints.md`
