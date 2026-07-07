# 61-BUGFIX.md — Bug Fixing

## Purpose
Track, triage, and fix bugs found during testing.

## Input
- `docs/testing/` (from 60-TESTING)
- Bug reports from test execution

## Process

1. Log all discovered bugs using the bug report format.
2. Triage by severity and priority.
3. Assign bugs to the appropriate module.
4. Fix and verify each bug.
5. Regression test after fixes.

## Output

```
docs/bug-report.md
```

## Template

```markdown
# Bug Report

## Bug Format

| Field | Description |
|-------|-------------|
| ID | `BUG-{NNN}` |
| Title | Short description |
| Module | Affected module |
| Severity | Critical / High / Medium / Low |
| Status | Open / In Progress / Fixed / Verified |
| Environment | Local / Staging / Production |
| Steps to Reproduce | Numbered steps |
| Expected Result | What should happen |
| Actual Result | What actually happens |
| Screenshots/Videos | Attachments (optional) |

---

## Bug List

### BUG-001: Login fails with unverified email
- **Module:** Authentication
- **Severity:** Medium
- **Status:** Open
- **Steps to Reproduce:**
  1. Register a new user (don't verify email)
  2. Attempt to log in
  3. See generic "Invalid credentials" error
- **Expected:** Specific message about email verification
- **Actual:** Generic error, user doesn't know why

### BUG-002: ...
```

## Fix Process

1. Reproduce the bug in development environment.
2. Write a failing test that reproduces the bug.
3. Fix the code.
4. Verify the test passes.
5. Run full test suite to check for regressions.
6. Mark as Fixed and move to QA verification.

## Severity Definitions

| Severity | Definition | Response Time |
|----------|------------|---------------|
| Critical | System down, data loss, security breach | Immediate |
| High | Major feature broken, no workaround | < 4 hours |
| Medium | Feature partially broken, workaround exists | < 24 hours |
| Low | Cosmetic issue, minor inconvenience | < 1 week |
