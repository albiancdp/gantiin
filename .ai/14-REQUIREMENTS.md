# 14-REQUIREMENTS.md — Requirements Specification

## Purpose
Break down the PRD into detailed functional and non-functional requirements, business rules, assumptions, and constraints.

## Input
- `docs/PRD.md` (from 13-PRD)

## Process

1. Read the approved PRD.
2. Extract and detail all functional requirements.
3. Detail non-functional requirements with specific targets.
4. Document business rules for each feature.
5. List assumptions and constraints.

## Output

```
docs/requirements.md
```

## Template

```markdown
# Requirements Specification

## 1. Functional Requirements

### Module: [e.g. Authentication]

| ID | Requirement | Priority | Dependencies |
|----|-------------|----------|--------------|
| FR-001 | Users can register with email and password | P0 | None |
| FR-002 | Users can log in with email and password | P0 | FR-001 |
| FR-003 | Users can reset password via email link | P1 | FR-001 |

### Module: [e.g. Dashboard]
...

## 2. Non-Functional Requirements

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-001 | Page load time | < 2s (LCP) | P0 |
| NFR-002 | API response time (p95) | < 200ms | P0 |
| NFR-003 | Test coverage | > 80% | P1 |
| NFR-004 | Uptime | 99.9% | P0 |

## 3. Business Rules

| ID | Rule | Applies To |
|----|------|------------|
| BR-001 | Users must verify email before accessing paid features | Registration |
| BR-002 | Admin users can soft-delete any record | Admin Module |
| BR-003 | Data export limited to 10,000 rows per request | Data Module |

## 4. Assumptions

- <!-- e.g. Users have a modern browser (last 2 versions) -->
- <!-- e.g. Average internet connection speed > 5 Mbps -->

## 5. Constraints

- <!-- e.g. Must comply with GDPR for EU users -->
- <!-- e.g. Budget does not cover dedicated DevOps engineer -->
```

## Checklist

- [ ] All PRD features are covered by functional requirements
- [ ] Requirements have unique IDs (FR-NNN, NFR-NNN, BR-NNN)
- [ ] Requirements are testable
- [ ] Business rules are unambiguous
- [ ] Assumptions are explicitly stated
- [ ] Constraints are documented
- [ ] File saved to `docs/requirements.md`
