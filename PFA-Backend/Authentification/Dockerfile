# Utiliser une image de base avec Java 17
FROM openjdk:17-jdk-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier JAR généré  dans le conteneur
COPY target/Authentification-0.0.1-SNAPSHOT.jar auth-service.jar


# Exposer le port où le service sera accessible
EXPOSE 8087
# Démarrer le microservice authentification
ENTRYPOINT ["java", "-jar", "/app/auth-service.jar"]
