# Evently — Frontend

Evently est une application web communautaire dédiée à la découverte et au partage d'événements culturels. Les visiteurs peuvent consulter les événements et les utilisateurs connectés peuvent publier leurs propres événements et gérer leurs favoris.

Ce dépôt contient la partie **frontend** du projet réalisé dans le cadre de ma formation Développeur Web et Web Mobile (DWWM).

## Technologies

- React
- Vite
- JavaScript
- Sass / SCSS

## Prérequis

- Node.js et npm installés
- L'API Evently accessible, en local ou en ligne

## Installation

```bash
git clone https://github.com/gaelramos-ship-i/evently_frontend.git
npm install
```

Créer un fichier `.env` à la racine, à partir de `.env.example` :

Renseigner l'URL de l'API backend :

```dotenv
VITE_BASE_URL=http://localhost:PORT_BACKEND
```

## Démarrer l'application

```bash
npm run dev
```

Ouvrir l'adresse affichée dans le terminal par Vite (généralement `http://localhost:5173`).

## Autres commandes

```bash
npm run build    # Générer la version de production
npm run preview  # Prévisualiser le build
```

## Fonctionnalités principales

- Consulter les événements culturels
- Rechercher des événements
- Créer un compte et se connecter
- Publier, modifier et supprimer ses propres événements
- Ajouter ou retirer des événements de ses favoris

Ces fonctionnalités correspondent au périmètre visé du projet ; leur fonctionnement dépend de la disponibilité de l'API.

## Organisation du dépôt

```text
public/          Ressources publiques
src/             Code source React
index.html       Point d'entrée HTML
vite.config.js   Configuration Vite
eslint.config.js Configuration ESLint
vercel.json      Configuration de déploiement
.env.example     Exemple de configuration
```

## Backend

L'interface communique avec l'API du projet :

https://github.com/gaelramos-ship-i/eventlyBackend

## Auteur

Gaël Ramos — Projet de formation DWWM.
