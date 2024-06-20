FROM node:20-slim AS runtime
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM runtime AS deps
RUN mkdir -p /temp/dev
COPY package.json pnpm-lock.yaml /temp/dev/
RUN cd /temp/dev && pnpm i --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json pnpm-lock.yaml /temp/prod/
RUN cd /temp/prod && pnpm i --frozen-lockfile --production

FROM runtime AS builder
COPY --from=deps /temp/dev/node_modules node_modules
COPY . .
ENV NODE_ENV=production
RUN pnpm run build

FROM runtime AS runner
COPY --from=builder /app/dist ./dist
COPY --from=deps /temp/prod/node_modules node_modules
COPY --from=deps /temp/prod/package.json ./package.json
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000/tcp
ENTRYPOINT ["node", "./dist/server/entry.mjs"]
