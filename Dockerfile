FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci --ignore-scripts
RUN node scripts/copy-pdf-assets.mjs
RUN --mount=type=cache,target=/app/.next/cache,id=gantiin-next-cache-v2 npm run build -- --webpack

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
