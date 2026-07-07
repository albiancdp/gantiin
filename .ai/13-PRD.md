# 13-PRD.md — Product Requirement Document

## Purpose
Create a comprehensive Product Requirement Document that defines what the product will do, who it serves, and why.

## Input
- `docs/project-overview.md` (from 01-PROJECT-INIT)
- `docs/discovery/` (from 10-DISCOVERY)
- `docs/research/` (from 11-RESEARCH)
- `docs/planning/` (from 12-PLANNING)

## Process

1. Review all previous phase outputs.
2. Write the PRD covering all sections below.
3. Get stakeholder approval before proceeding.

## Output

```
docs/PRD.md
```

## Template

```markdown
# Product Requirement Document

## 1. Executive Summary
<!-- 1-2 paragraphs summarizing the product, problem, and solution -->

## 2. Background & Context
<!-- Why this product? What market condition or user need drives it? -->

## 3. Target Audience
<!-- Primary and secondary user segments -->

## 4. User Stories (High-Level)

### Must Have (P0)
- As a [user], I want to [action] so that [benefit].

### Should Have (P1)
- As a [user], I want to [action] so that [benefit].

### Nice to Have (P2)
- As a [user], I want to [action] so that [benefit].

## 5. Feature Overview

| Feature | Description | Priority | Notes |
|---------|-------------|----------|-------|
|         |             | P0       |       |

## 6. User Flows

### Flow 1: [Name]
<!-- High-level steps the user takes -->

### Flow 2: [Name]
...

## 7. Non-Functional Requirements
- **Performance:** <!-- Load times, response times -->
- **Security:** <!-- Auth, encryption, compliance -->
- **Scalability:** <!-- Expected load, growth plan -->
- **Availability:** <!-- Uptime targets, backup strategy -->
- **Accessibility:** <!-- WCAG compliance level -->

## 8. Constraints
<!-- Technical, regulatory, timeline, budget constraints -->

## 9. Out of Scope
<!-- Explicitly excluded from this version -->

## 10. Success Criteria
<!-- How will we measure success? -->
```

## Checklist

- [ ] Executive summary captures the essence of the product
- [ ] Background provides context for decisions
- [ ] Target audience is clearly defined
- [ ] User stories are prioritized (P0, P1, P2)
- [ ] Features are listed with priorities
- [ ] User flows are documented
- [ ] Non-functional requirements are specified
- [ ] Constraints are listed
- [ ] Out of scope items are documented
- [ ] Success criteria are measurable
- [ ] PRD approved by stakeholders
- [ ] File saved to `docs/PRD.md`
