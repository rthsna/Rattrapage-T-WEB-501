# JobBoard - Projet T-WEB-501

## Description
Projet de jobboard développé dans le cadre du module T-WEB-501.

## Installation
```bash
npm install
npm start
```

## Structure actuelle
- Serveur Express avec connexion MySQL
- Routes API pour les annonces (GET, POST)
- Système d'authentification avec bcrypt
- Configuration de la base de données

## API Endpoints

### Annonces
- `GET /api/annonce` - Récupérer toutes les annonces
- `GET /api/annonce/:id` - Récupérer une annonce spécifique
- `POST /api/annonce` - Créer une nouvelle annonce

### Authentification
- `POST /api/register` - Inscription d'un nouvel utilisateur
- `POST /api/login` - Connexion utilisateur

## Prochaines étapes
- Interface utilisateur
- Gestion des entreprises
- Système de candidature
