FROM node:22-alpine AS base
WORKDIR /repo
RUN corepack enable

FROM base AS deps
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY packages/shared-types/package.json packages/shared-types/package.json
COPY apps/api/package.json apps/api/package.json
COPY apps/worker/package.json apps/worker/package.json
COPY apps/web/package.json apps/web/package.json
RUN pnpm install --frozen-lockfile --ignore-scripts

FROM deps AS build
COPY . .
RUN pnpm --filter @shannova/shared-types run build
RUN pnpm --filter worker run build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=deps /repo/node_modules /repo/node_modules
COPY --from=deps /repo/apps/worker/node_modules /repo/apps/worker/node_modules
COPY --from=build /repo/packages/shared-types/package.json /repo/packages/shared-types/package.json
COPY --from=build /repo/packages/shared-types/dist /repo/packages/shared-types/dist
COPY --from=build /repo/apps/worker/dist /repo/apps/worker/dist
COPY apps/worker/package.json /repo/apps/worker/package.json

WORKDIR /repo/apps/worker
CMD ["node", "dist/worker.js"]
