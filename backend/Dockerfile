FROM maven:3.6.3-openjdk-11-slim AS builder

WORKDIR /home/app
COPY . .
RUN mvn clean package

FROM openjdk:11-slim

COPY --from=builder /home/app/target/*.jar munkalap.jar

ENV server.port=8080

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "munkalap.jar"]