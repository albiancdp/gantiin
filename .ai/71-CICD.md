# 71-CICD.md — CI/CD Pipeline

## Purpose
Set up continuous integration and continuous deployment using GitHub Actions.

## Input
- `docs/deployment/` (from 70-DEPLOYMENT)

## Process

1. Create GitHub Actions workflow files.
2. Configure lint, test, and build steps.
3. Set up deployment jobs.
4. Document rollback procedure.

## Output

```
.github/workflows/
├── ci.yml
└── deploy.yml
```

## Templates

### CI Workflow (`.github/workflows/ci.yml`)

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run test

  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
```

### Deploy Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build Docker image
        run: docker build -t app:${{ github.sha }} .
      
      - name: Push to registry
        run: |
          docker tag app:${{ github.sha }} registry.example.com/app:${{ github.sha }}
          docker push registry.example.com/app:${{ github.sha }}
      
      - name: Deploy to server
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            docker pull registry.example.com/app:${{ github.sha }}
            docker compose up -d --force-recreate app
```

## Rollback Strategy

1. **Revert code:** `git revert HEAD` and push to main
2. **Redeploy:** CI/CD automatically deploys the revert
3. **Database rollback:** Run `prisma migrate resolve --rolled-back <migration-name>` if needed
4. **Verify:** Check health endpoint and monitoring dashboard

## Checklist

- [ ] CI workflow runs lint, test, build
- [ ] Deploy workflow supports staging and production
- [ ] Rollback procedure is documented
- [ ] Secrets are configured in GitHub
- [ ] Workflow files saved in `.github/workflows/`
