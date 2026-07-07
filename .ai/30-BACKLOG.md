# 30-BACKLOG.md — Product Backlog

## Purpose
Generate a complete product backlog organized by Epic, Feature, User Story, Acceptance Criteria, and Priority.

## Input
- `docs/PRD.md` (from 13-PRD)
- `docs/requirements.md` (from 14-REQUIREMENTS)

## Process

1. Review PRD and requirements.
2. Identify Epics (major work streams).
3. Break epics into Features.
4. Write User Stories with Acceptance Criteria.
5. Assign priority using MoSCoW method.

## Output

```
docs/backlog.md
```

## Template

```markdown
# Product Backlog

## Priority Legend
- **P0 (Must Have):** Critical for launch
- **P1 (Should Have):** Important but not critical
- **P2 (Could Have):** Nice to have
- **P3 (Won't Have):** Future consideration

---

## Epic: Authentication & User Management

### Feature: User Registration
- **User Story:** As a new user, I want to create an account so that I can access the platform.
- **Acceptance Criteria:**
  - [ ] User can register with email and password
  - [ ] Password must be at least 8 characters with 1 uppercase and 1 number
  - [ ] Email verification is sent after registration
  - [ ] Duplicate email returns appropriate error
  - [ ] Success redirects to verification page
- **Priority:** P0

### Feature: User Login
- **User Story:** As a registered user, I want to log in so that I can access my account.
- **Acceptance Criteria:**
  - [ ] User can log in with email and password
  - [ ] Invalid credentials return appropriate error
  - [ ] Unverified email shows verification prompt
  - [ ] Successful login redirects to dashboard
  - [ ] JWT token is stored securely
- **Priority:** P0

### Feature: Password Reset
- **User Story:** As a user who forgot my password, I want to reset it so that I can regain access.
- **Acceptance Criteria:**
  - [ ] User can request password reset via email
  - [ ] Reset link expires after 1 hour
  - [ ] New password meets strength requirements
  - [ ] Success notification is shown
- **Priority:** P1

---

## Epic: [Name]

### Feature: [Name]
- **User Story:** ...
- **Acceptance Criteria:**
  - [ ] ...
- **Priority:** P0
```

## Checklist

- [ ] All epics from PRD are represented
- [ ] Each epic has at least one feature
- [ ] Each feature has a user story with acceptance criteria
- [ ] Priorities are assigned (P0-P3)
- [ ] Backlog is estimated at high level (T-shirt sizes)
- [ ] File saved to `docs/backlog.md`
