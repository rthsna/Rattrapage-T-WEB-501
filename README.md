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
- Interface utilisateur de base
- Système de candidature
- Configuration de la base de données

## API Endpoints

### Annonces
- `GET /api/annonce` - Récupérer toutes les annonces
- `GET /api/annonce/:id` - Récupérer une annonce spécifique
- `POST /api/annonce` - Créer une nouvelle annonce

### Authentification
- `POST /api/register` - Inscription d'un nouvel utilisateur
- `POST /api/login` - Connexion utilisateur

### Candidatures
- `GET /api/applications` - Récupérer toutes les candidatures
- `POST /api/applications` - Créer une nouvelle candidature

## Interface utilisateur
- Page d'accueil avec liste des annonces
- Page de détail d'offre avec formulaire de candidature
- Styles CSS de base
- Navigation simple

## Prochaines étapes
- Gestion des entreprises
- Interface d'administration
- Améliorations UI/UX
