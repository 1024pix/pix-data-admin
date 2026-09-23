# pix-data-admin

Interface d'administration basée sur AdminJS pour gérer les données des centres de certification.

## Description

Projet AdminJS utilisé pour administrer les réseaux de centres de certifications.

## Test local

Vous pouvez démarrer rapidement une base PostgreSQL avec Docker Compose :

```bash
docker compose up -d
```

## Installation

1. Copier le fichier d'exemple d'environnement :

```bash
cp sample.env .env
```

2. Remplir les variables d'environnement nécessaires (voir la section suivante).
3. Installer les dépendances :

```bash
npm install
```

## Variables d'environnement requises

Les variables vérifiées dans `src/config.js` :

- `PORT` (optionnel, défaut `3000`)
- `COOKIE_SECRET` : chaîne minimale de 32 caractères pour chiffrer le cookie AdminJS
- `ADMINJS_EMAIL` : e-mail de l'administrateur
- `ADMINJS_PASSWORD` : mot de passe de l'administrateur
- `DATABASE_URL` : URL de la base de données PostgreSQL (format URI)

Variables optionnelles pour tests / base externe :

- `TEST_DATABASE_URL`
- `DATABASE_URL_EXT` (active le mode externe si définie)
- `TEST_DATABASE_URL_EXT`

## Scripts utiles

- **Start** : `npm start` — démarre l'application
- **DB Create** : `npm run db:create`
- **DB Migrate** : `npm run db:migrate`
- **DB Seed** : `npm run db:seed`
- **DB Reset** (drop + create + migrate + seed) : `npm run db:reset`
- Variantes `:ext` disponibles pour le config-ext.js (base externe)
- **Lint** : `npm run lint`

Les scripts sont définis dans `package.json`.

## Point d'accès AdminJS

L'interface AdminJS est exposée sur `/admin`. Connectez-vous avec les identifiants définis via `ADMINJS_EMAIL` et `ADMINJS_PASSWORD`.

## Structure importante du dépôt

- `src/` : code source de l'application (`server.js`, `adminjs.js`, `config.js`, etc.)
- `models/` : modèles Sequelize
- `migrations/` : migrations de schéma
- `seeders/` : jeux de données pour développement
- `resources/` : ressources AdminJS (configuration des entités)

Voir également : [src/config.js](src/config.js#L1) pour la validation des variables d'environnement.

## Développement

Après avoir configuré `.env` et installé les dépendances :

```bash
npm run db:create
npm run db:migrate
npm run db:seed
npm start
```

Ensuite, ouvrir `http://localhost:3000/admin` pour accéder à l'interface.

## Déploiement

Le script `postdeploy` dans `package.json` est prévu pour exécuter les migrations sur les environnements de review si nécessaire.
