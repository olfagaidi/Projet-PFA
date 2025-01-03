# Utiliser une image de base avec Java 17
FROM openjdk:17-jdk-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier JAR généré dans le conteneur
COPY target/Publication-0.0.1-SNAPSHOT.jar pub-service.jar

# Exposer le port où le service sera accessible
EXPOSE 8090

# Démarrer le microservice
ENTRYPOINT ["java", "-jar", "/app/pub-service.jar"]
