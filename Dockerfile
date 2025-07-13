FROM oven/bun:1.2-slim AS build

WORKDIR /app/builder

COPY . .

RUN bun install

RUN bun run compile

FROM debian:bookworm-slim

WORKDIR /app/runner

COPY --from=build /app/builder/bin/api.o /app/runner/api.o

EXPOSE 3000

ENTRYPOINT ["/app/runner/api.o"]
