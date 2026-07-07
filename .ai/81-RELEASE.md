# 81-RELEASE.md — Release Management

## Purpose
Generate release notes, changelog, and version tags for the release.

## Input
- `docs/qa-report.md` (from 80-QA)
- Git history (commit log)

## Process

1. Review QA report and confirm release readiness.
2. Determine version number (semantic versioning).
3. Generate changelog from commit history.
4. Write release notes.
5. Tag the release in git.

## Output

```
CHANGELOG.md (updated)
```

## Template

### Changelog

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2024-01-01

### Added
- User registration and login with JWT authentication
- Dashboard with key metrics and recent activity
- CRUD operations for core entities
- Responsive layout with sidebar navigation
- Email verification flow
- Password reset functionality

### Changed
- Upgraded Next.js from 14.0.0 to 14.1.0

### Fixed
- Login error message not showing for unverified emails
- Mobile navigation not closing on route change
- Date formatting inconsistency across timezones

### Security
- Added rate limiting on auth endpoints
- Updated dependencies to patch known vulnerabilities

## [0.1.0] - 2024-12-01

### Added
- Initial project scaffolding
- Database schema and migrations
- Basic UI components
```

### Versioning Convention

| Version | When |
|---------|------|
| MAJOR (x.0.0) | Breaking changes |
| MINOR (0.x.0) | New features (backward compatible) |
| PATCH (0.0.x) | Bug fixes (backward compatible) |

## Release Process

1. Ensure `docs/qa-report.md` is approved
2. Update version in `package.json`
3. Update `CHANGELOG.md`
4. Commit: `chore(release): v{version}`
5. Tag: `git tag v{version}`
6. Push: `git push && git push --tags`
7. Create GitHub Release with release notes

## Checklist

- [ ] QA report approved
- [ ] Version number follows semver
- [ ] Changelog is complete and accurate
- [ ] Release notes written for stakeholders
- [ ] Git tag created
- [ ] CHANGELOG.md updated
