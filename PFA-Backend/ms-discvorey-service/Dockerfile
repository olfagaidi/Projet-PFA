# Utiliser une image de base avec Java 17
FROM openjdk:17-jdk-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier JAR généré dans le conteneur
COPY target/ms-discvorey-service-0.0.1-SNAPSHOT.jar eureka-service.jar

# Exposer le port où le service sera accessible
EXPOSE 8671

# Démarrer le microservice
ENTRYPOINT ["java", "-jar", "/app/eureka-service.jar"]
