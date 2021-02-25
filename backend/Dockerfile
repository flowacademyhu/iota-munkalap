FROM maven:3.6.3-openjdk-11-slim AS builder

WORKDIR /build
COPY . .
RUN mvn -B clean package -DskipTests

FROM openjdk:11-slim

WORKDIR /app
COPY --from=builder /build/target/*.jar /app/munkalap.jar

ENV server.port=8080

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "munkalap.jar"]

