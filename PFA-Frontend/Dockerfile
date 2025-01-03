# Étape 1: Utiliser une image Node.js comme image de base
FROM node:18 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier tout le code source dans le conteneur
COPY . .

# Construire l'application React pour la production
RUN npm run build

# Étape 2: Utiliser une image Nginx pour servir l'application construite
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape précédente dans le répertoire de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 (le port par défaut de Nginx)
EXPOSE 80

# Démarrer Nginx en arrière-plan
CMD ["nginx", "-g", "daemon off;"]
