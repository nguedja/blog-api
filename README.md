# Blog API Backend

## Description

Ce projet est une API backend pour la gestion d’articles d’un blog.

Elle permet de :

- Créer un article
- Lire tous les articles
- Lire un article spécifique
- Modifier un article
- Supprimer un article
- Rechercher des articles
- Filtrer par catégorie, auteur ou date

L’API est développée avec **Node.js**, **Express** et **SQLite**.

---

 # Technologies utilisées

- Node.js
- Express.js
- SQLite
- Postman (pour les tests)


# Installer les dépendances
npm install
npm install sqlite3
# Lancer le serveur
node app.js

Le serveur démarre sur :

http://localhost:3000

# Endpoints disponibles
# Créer un article

POST /api/articles

Body JSON :

{
  "titre": "Mon article",
  "contenu": "Contenu ici",
  "auteur": "Nom",
  "categorie": "Tech",
  "tags": ["NodeJS"]
}
# Lire tous les articles

GET /api/articles

# Lire un article par ID

GET /api/articles/:id

Exemple :

GET /api/articles/1
# Modifier un article

PUT /api/articles/:id

Body JSON :

{
  "titre": "Titre modifié",
  "contenu": "Nouveau contenu",
  "categorie": "Education",
  "tags": ["API"]
}
# Supprimer un article

DELETE /api/articles/:id

# Rechercher un article

GET /api/articles/search?query=texte

Exemple :

GET /api/articles/search?query=test

# FLTRES DISPONIBLES:

Filtrer par catégorie :

GET /api/articles?categorie=Tech

Filtrer par auteur :

GET /api/articles?auteur=Marius

Filtrer par date :

GET /api/articles?date=2026

# Documentation API avec Swagger

La documentation des endpoints de l’API est disponible grâce à Swagger UI.

Swagger permet de visualiser toutes les routes disponibles et de tester 
directement les requêtes depuis le navigateur.

Après avoir lancé le serveur avec :

node app.js

La documentation Swagger est accessible à l’adresse suivante :

http://localhost:3000/api-docs

Cette interface permet :

- De visualiser tous les endpoints disponibles
- De tester les requêtes (POST, GET, PUT, DELETE)
- De vérifier les paramètres nécessaires pour chaque route
- De tester rapidement les fonctionnalités de l’API

# Exemple d’utilisation de Swagger

1. Lancer le serveur :
   
   node app.js

2. Ouvrir un navigateur

3. Accéder à l’adresse :

   http://localhost:3000/api-docs

4. Tester les routes directement depuis l’interface Swagger.

# STRUCTURE DU PROJET

blog-api/
│
├── controllers/
│   └── articleController.js
│
├── routes/
│   └── articleRoutes.js
│
├── models/
│   └── articleModel.js
│
├── config/
│   └── database.js
│
├── app.js
├── package.json
├── blog.db
├── README.md


# TESTS :


Les tests ont été réalisés avec Postman.

Toutes les routes CRUD ont été testées :

POST
GET
PUT
DELETE
SEARCH


# AUTEUR:

Nom : NGUEDJA MARIUS DIVAN
UE : INF222
Projet : API Backend Blog API Backend
