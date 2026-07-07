# 70-DEPLOYMENT.md — Deployment

## Purpose
Configure deployment infrastructure: Docker, production builds, and deployment strategy.

## Input
- `docs/architecture/folder-structure.md` (from 20-ARCHITECTURE)
- Project source code

## Process

1. Create Docker configuration.
2. Configure production build settings.
3. Set up environment variable management.
4. Document deployment steps.

## Output

```
docs/deployment/
├── docker.md
├── production-build.md
└── deployment-guide.md
```

## Templates

### Docker

```markdown
# Docker Configuration

## Dockerfile

```dockerfile
# Multi-stage build
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

## Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
    depends_on:
      - db
  
  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - '5432:5432'

volumes:
  postgres_data:
```

```

### Production Build

```markdown
# Production Build

## Build Command
```bash
npm run build
```

## Build Output
- `.next/` (compiled Next.js app)
- `public/` (static assets, copied as-is)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | PostgreSQL connection string | Yes |
| NEXTAUTH_SECRET | Auth.js secret key | Yes |
| NEXTAUTH_URL | Application URL | Yes |
| SENTRY_DSN | Sentry error tracking | No |
```

### Deployment Guide

```markdown
# Deployment Guide

## Prerequisites
- Docker and Docker Compose installed
- PostgreSQL database accessible
- Domain name and SSL certificate

## Steps
1. Clone the repository
2. Copy `.env.example` to `.env` and fill variables
3. Run `docker compose up -d`
4. Run database migrations: `docker compose exec app npx prisma migrate deploy`
5. Verify health: `curl https://example.com/api/health`

## Rollback
1. `docker compose down`
2. `git checkout <previous-version>`
3. `docker compose up -d --build`
4. Run database rollback if needed
```
