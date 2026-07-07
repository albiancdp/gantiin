# 11-RESEARCH.md — Research Phase

## Purpose
Conduct research on best practices, UI/UX trends, technical approaches, and existing solutions to inform the design and development phases.

## Input
- `docs/discovery/` (from 10-DISCOVERY)
- `docs/project-overview.md`

## Process

1. Review discovery outputs to identify research topics.
2. Research best practices for the problem domain.
3. Investigate current UI/UX trends relevant to the target users.
4. Study existing products and similar applications in detail.
5. Document technical considerations and recommendations.

## Output

```
docs/research/
├── best-practices.md
├── ui-trends.md
├── existing-products.md
└── technical-recommendations.md
```

## Templates

### Best Practices

```markdown
# Best Practices

## Domain: [e.g. Authentication, Dashboard Design, etc.]
- **Practice:** <!-- Description -->
- **Rationale:** <!-- Why this is important -->
- **Implementation Notes:** <!-- How to apply it -->

## Domain: ...
```

### UI Trends

```markdown
# UI/UX Trends

## Trend 1: [Name]
- **Description:** <!-- What it is -->
- **Relevance:** <!-- Why it applies to our project -->
- **Implementation:** <!-- How to incorporate it -->

## Trend 2: ...
```

### Existing Products

```markdown
# Existing Products Analysis

## Product: [Name]
- **Overview:** <!-- What it does -->
- **Strengths:** <!-- What works well -->
- **Weaknesses:** <!-- What doesn't -->
- **Key Takeaway:** <!-- What we can learn -->

## Product: ...
```

### Technical Recommendations

```markdown
# Technical Recommendations

## Architecture
<!-- Recommended patterns, folder structure, design patterns -->

## Libraries & Tools
<!-- Specific recommendations with justifications -->

## Performance
<!-- Caching strategies, rendering approaches, bundle optimization -->

## Security
<!-- Auth approach, data protection, compliance -->
```

## Checklist

- [ ] Best practices documented for key domains
- [ ] UI trends researched and evaluated for relevance
- [ ] Existing products analyzed with takeaways
- [ ] Technical recommendations compiled
- [ ] All files saved to `docs/research/`
