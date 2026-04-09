# Build stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY src/ ./src/
COPY tsconfig.json ./
RUN npm run build

# Runtime stage
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist

ENV ARBITRUM_RPC_URL=https://arb1.arbitrum.io/rpc
ENV PORT=3012
EXPOSE 3012

# Keep stdin open: the server starts both HTTP (port 3012) and STDIO transports.
# In daemon mode, piping from /dev/null would close stdin immediately, so we use
# `tail -f /dev/null` as an infinite no-op stdin source.
CMD ["/bin/sh", "-c", "tail -f /dev/null | node dist/index.js"]
