# Stage 1: build
FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

RUN bun run build

# Stage 2: runtime
FROM oven/bun:1 AS production
WORKDIR /app

COPY --from=build /app/.output /app

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

ENTRYPOINT ["bun", "server/index.mjs"]