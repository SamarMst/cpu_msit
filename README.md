# Authentification Sécurisée (JWT) - Projet

Ce projet met en place une authentification sécurisée avec **JSON Web Token (JWT)**. L'architecture inclut **Express.js**, **NodeMailer**, **Prisma**, **MySQL**, **React**, **TailwindCSS**, et **Docker Compose** pour gérer l'environnement local de base de données. 

## Technologies Utilisées
- **JWT** (JSON Web Token) : Authentification sécurisée des utilisateurs.
- **NodeMailer** : Envoi d'emails pour la réinitialisation du mot de passe.
- **Express.js** : Framework backend pour la gestion des routes.
- **Docker Compose** : Gestion des services comme MySQL dans un environnement de développement local.
- **React** : Frontend dynamique pour l'inscription, la connexion, et la réinitialisation de mot de passe.
- **TailwindCSS** : Framework CSS pour la stylisation rapide des composants frontend.
- **Prisma** : ORM pour interagir avec la base de données MySQL.
- **MySQL** : Base de données pour stocker les informations utilisateur.
- **Vercel** : Déploiement du frontend.

## Fonctionnalités
- **Inscription** : Création d'un nouvel utilisateur avec enregistrement sécurisé du mot de passe.
- **Connexion** : Authentification via email et mot de passe, génération d'un token JWT.
- **Réinitialisation de Mot de Passe** : Envoi d'un email de réinitialisation avec un lien de réinitialisation contenant un token.
- **Protection des Routes** : Routes sécurisées en vérifiant le token JWT.
- **Stockage du Token** : Le token JWT est stocké dans un localStorage.

## Étapes pour Faire Fonctionner le Repository Cloné

### 1. Cloner le Repository

Clonez le repository à l'aide de la commande suivante :

```bash
git clone https://github.com/SamarMst/cpu_msit_AuthentificationJWT.git
cd cpu_msit_AuthentificationJWT
```

### 2. Configuration des Variables d'Environnement
Créez un fichier .env à la racine du projet et ajoutez les variables suivantes :
```bash
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
MYSQL_ROOT_PASSWORD=your_mysql_root_password
MYSQL_DATABASE=msitdb
```
### 3. Démarrer Docker Compose
Lancez Docker Compose pour démarrer MySQL et d'autres services nécessaires :
```bash
docker-compose up -d
```

### 4. Installer les Dépendances Backend
Accédez au dossier du backend et installez les dépendances nécessaires :
```bash
cd backend
npm install
```
### 5. Lancer le Backend
Démarrez le serveur backend avec la commande suivante :
```bash
npm start
```

### 6. Installer les Dépendances Frontend
Accédez au dossier du frontend et installez les dépendances nécessaires :
```bash
cd frontend
npm install
```

### 7. Lancer le Frontend
Démarrez le serveur frontend avec la commande suivante :
```bash
npm start
```
