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
# 2. 注入环境变量（如需要）
ENV SERVER_REQUEST_BASE=http://127.0.0.1:8201
# 3. 构建应用（不使用turbopack以支持standalone模式）
RUN npm run build

# ------- 运行阶段 -------
FROM swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/library/node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
# 只复制 standalone 产物 + 静态资源
COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["npm", "run", "start"]        # standalone 生成的入口
