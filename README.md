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
- Routes API pour les annonces (CRUD complet)
- Système d'authentification avec bcrypt
- Interface utilisateur moderne avec animations
- Système de candidature
- Gestion des entreprises (CRUD)
- Interface d'administration
- Design responsive
- Configuration de la base de données

## API Endpoints

### Annonces
- `GET /api/annonce` - Récupérer toutes les annonces
- `GET /api/annonce/:id` - Récupérer une annonce spécifique
- `POST /api/annonce` - Créer une nouvelle annonce
- `PUT /api/annonce/:id` - Mettre à jour une annonce
- `DELETE /api/annonce/:id` - Supprimer une annonce

### Authentification
- `POST /api/register` - Inscription d'un nouvel utilisateur
- `POST /api/login` - Connexion utilisateur

### Utilisateurs (Admin)
- `GET /api/people` - Récupérer tous les utilisateurs
- `GET /api/people/:id` - Récupérer un utilisateur spécifique
- `PUT /api/people/:id` - Mettre à jour un utilisateur
- `DELETE /api/people/:id` - Supprimer un utilisateur

### Candidatures
- `GET /api/applications` - Récupérer toutes les candidatures
- `GET /api/applications/:id` - Récupérer une candidature spécifique
- `POST /api/applications` - Créer une nouvelle candidature
- `PUT /api/applications/:id` - Mettre à jour une candidature
- `DELETE /api/applications/:id` - Supprimer une candidature

### Entreprises
- `GET /api/companies` - Récupérer toutes les entreprises
- `GET /api/companies/:id` - Récupérer une entreprise spécifique
- `POST /api/companies` - Créer une nouvelle entreprise
- `PUT /api/companies/:id` - Mettre à jour une entreprise
- `DELETE /api/companies/:id` - Supprimer une entreprise

## Interface utilisateur
- Page d'accueil avec liste des annonces animées
- Page de détail d'offre avec formulaire de candidature
- Interface d'administration avec gestion CRUD
- Design responsive et moderne
- Animations CSS et transitions
- Navigation intuitive

## Prochaines étapes
- Tests et finalisation
- Fonctionnalités avancées
- Optimisations de performance
