# Utiliser une image de base avec Java 17
FROM openjdk:17-jdk-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier JAR généré dans le conteneur
COPY target/user-service-*.jar gatew-service.jar

# Exposer le port où le service sera accessible
EXPOSE 8881

# Démarrer le microservice
ENTRYPOINT ["java", "-jar", "/app/gatew-service.jar"]
