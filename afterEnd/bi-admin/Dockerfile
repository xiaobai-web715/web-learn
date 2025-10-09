# ========== Build ==========
FROM swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /workspace

# 把整个 afterEnd 复制进来（multi-module 需要）
COPY . /workspace

# 仅构建 bi-admin 模块（-am 同时构建依赖模块），跳过测试
RUN mvn -T1C -DskipTests -pl bi-admin -am package

# ========== Run ==========
FROM swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/eclipse-temurin:17-jdk-jammy
WORKDIR /app

# 拷贝 bi-admin 的可执行 jar
COPY --from=build /workspace/bi-admin/target/*.jar /app/app.jar

ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"
EXPOSE 8201
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]