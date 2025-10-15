# ------- 依赖阶段 -------
FROM swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/library/node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production && \
    npm cache clean --force

# ------- 构建阶段 -------
FROM swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/library/node:22-alpine AS builder
WORKDIR /app
# 1. 先复制依赖（利用缓存）
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# 2. 构建应用
RUN npm run build

# ------- 运行阶段 -------
FROM swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/library/node:22-alpine AS runner
WORKDIR /app
# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
COPY --from=builder /app/.next ./.next
# 复制运行时入口文件
COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["npm", "run", "start"]
