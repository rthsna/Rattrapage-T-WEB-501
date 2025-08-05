# JobBoard - Projet étudiant

## Présentation

Ce projet est un site web de type jobboard permettant de publier et gérer des offres d’emploi, de postuler à des annonces, et de gérer la base de données via une interface d’administration réservée à l’admin.

## Fonctionnalités principales

- Affichage des offres d’emploi
- Postulation à une offre via un formulaire
- Inscription et connexion utilisateur
- Page d’administration (CRUD sur annonces, entreprises, utilisateurs, candidatures)
- Authentification (admin/user)
- Pagination sur les listes

## Technologies utilisées

- MySQL
- Node.js/Express
- HTML/CSS/JS
- bcryptjs

## Structure du projet

- db.js
- server.js
- public/style.css
- view/

## Installation rapide

1. npm install
2. Créer la base job_board2025 sous MySQL et importer les tables
3. node server.js
4. Ouvrir view/index.html dans le navigateur

## Utilisation

- Page d’accueil : voir les annonces, postuler
- Inscription/connexion : créer un compte, se connecter
- Admin : accès à la gestion complète des données (CRUD)
