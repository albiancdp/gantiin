# 12-PLANNING.md — Planning Phase

## Purpose
Define the vision, roadmap, milestones, and success metrics that will guide the entire project.

## Input
- `docs/project-overview.md` (from 01-PROJECT-INIT)
- `docs/discovery/` (from 10-DISCOVERY)
- `docs/research/` (from 11-RESEARCH)

## Process

1. Define the product vision statement.
2. Set clear, measurable goals and objectives.
3. Create a high-level roadmap with phases/milestones.
4. Define success metrics (KPIs).

## Output

```
docs/planning/
├── vision.md
├── goals.md
├── roadmap.md
├── milestones.md
└── success-metrics.md
```

## Templates

### Vision

```markdown
# Product Vision

## Vision Statement
<!-- One sentence describing the future state the product enables -->

## Elevator Pitch
<!-- 30-second description of the product and its value -->
```

### Goals

```markdown
# Goals & Objectives

## Business Goals
1. <!-- SMART goal -->
2. <!-- SMART goal -->

## Product Goals
1. <!-- SMART goal -->
2. <!-- SMART goal -->
```

### Roadmap

```markdown
# Roadmap

## Phase 1: Foundation (Weeks 1-4)
<!-- Core features, authentication, basic CRUD -->

## Phase 2: Core Features (Weeks 5-10)
<!-- Main business logic, integrations -->

## Phase 3: Enhancement (Weeks 11-14)
<!-- Advanced features, optimization -->

## Phase 4: Polish & Launch (Weeks 15-16)
<!-- Testing, QA, deployment, release -->
```

### Milestones

```markdown
# Milestones

| Milestone | Description | Target Date | Dependencies |
|-----------|-------------|-------------|--------------|
| M1        |             |             |              |
| M2        |             |             |              |
```

### Success Metrics

```markdown
# Success Metrics

## Adoption Metrics
- <!-- e.g. User sign-ups, DAU/MAU -->

## Performance Metrics
- <!-- e.g. Page load time < 2s, API response < 200ms -->

## Quality Metrics
- <!-- e.g. Test coverage > 80%, Bug rate -->

## Business Metrics
- <!-- e.g. Conversion rate, Retention rate -->
```

## Checklist

- [ ] Vision statement is clear and inspiring
- [ ] Goals are SMART (Specific, Measurable, Achievable, Relevant, Time-bound)
- [ ] Roadmap covers all major phases
- [ ] Milestones have target dates and dependencies
- [ ] Success metrics are defined and measurable
- [ ] All files saved to `docs/planning/`
