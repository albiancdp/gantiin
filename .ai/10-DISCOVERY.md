# 10-DISCOVERY.md — Discovery Phase

## Purpose
Understand the problem space, users, competitors, and pain points before designing any solution.

## Input
- `docs/project-overview.md` (from 01-PROJECT-INIT)

## Process

1. Read the project overview.
2. Research and document the problem space.
3. Create user personas based on target users.
4. Analyze competitors and similar products.
5. Map user journeys.
6. Identify pain points and opportunities.

## Output

```
docs/discovery/
├── problem-statement.md
├── user-personas.md
├── competitor-analysis.md
├── user-journey.md
└── pain-points.md
```

## Templates

### Problem Statement

```markdown
# Problem Statement

## Current Situation
<!-- Describe the current state without the product -->

## The Problem
<!-- What specific problem needs to be solved? -->

## Impact
<!-- What is the cost of not solving this? -->

## Proposed Solution (High Level)
<!-- One paragraph on how we might solve it -->
```

### User Personas

```markdown
# User Personas

## Persona 1: [Name]
- **Role:** <!-- e.g. Admin, End User -->
- **Goals:** <!-- What they want to achieve -->
- **Frustrations:** <!-- Current pain points -->
- **Technical Level:** <!-- Low / Medium / High -->
- **Key Needs:** <!-- Top 3 needs from the product -->

## Persona 2: [Name]
...
```

### Competitor Analysis

```markdown
# Competitor Analysis

## Competitor 1: [Name]
- **Strengths:** <!-- What they do well -->
- **Weaknesses:** <!-- Where they fall short -->
- **Key Features:** <!-- Notable features -->
- **Our Opportunity:** <!-- Gap we can fill -->

## Competitor 2: [Name]
...
```

### User Journey

```markdown
# User Journey Map

## Scenario
<!-- When does this journey happen? -->

## Stages
| Stage | Actions | Thoughts | Emotions | Touchpoints |
|-------|---------|----------|----------|-------------|
| 1.    |         |          |          |             |
| 2.    |         |          |          |             |
| 3.    |         |          |          |             |
```

### Pain Points

```markdown
# Pain Points

| # | Pain Point | Severity | Frequency | Affected Persona |
|---|------------|----------|-----------|------------------|
| 1 |            | High/Med/Low | Always/Often/Sometimes | |
```

## Checklist

- [ ] Problem statement is clear and validated
- [ ] At least 2 user personas created
- [ ] At least 3 competitors analyzed
- [ ] User journey mapped for primary persona
- [ ] Pain points identified and prioritized
- [ ] All files saved to `docs/discovery/`
