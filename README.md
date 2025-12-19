# DS2 – Mini Projet Backend  
## API de gestion de réparations d’appareils électroniques

##  Description
Ce projet est une API REST développée avec **NestJS**, **TypeScript** et **MySQL**.  
Elle permet de gérer une société de réparation et de reconditionnement d’appareils électroniques.

L’application gère :
- Les utilisateurs (Admin / Technicien)
- Les pièces détachées (stock)
- Les appareils
- Les interventions de réparation

---

##  Stack Technique
- **Framework** : NestJS
- **Langage** : TypeScript
- **Base de données** : MySQL
- **ORM** : TypeORM
- **Sécurité** :
  - Authentification JWT
  - Guards & rôles (ADMIN / TECH)
  - Mots de passe hashés avec Bcrypt

---

##  Rôles utilisateurs
- **ADMIN (Manager)** :
  - Gérer les utilisateurs
  - Gérer le stock des pièces
  - Supprimer des appareils
- **TECH (Technicien)** :
  - Enregistrer des appareils
  - Créer des interventions
  - Utiliser des pièces détachées

---

##  Modules implémentés

###  AuthModule
- `POST /auth/register`
- `POST /auth/login`
- Authentification via JWT

### UsersModule
- `GET /users/profile` (Admin seulement)

###  PartsModule
- `GET /parts` (utilisateurs authentifiés)
- `POST /parts` (Admin seulement)
- `PATCH /parts/:id` (Admin)
- `DELETE /parts/:id` (Admin)

###  DevicesModule
- `POST /devices`
- `GET /devices`
- `DELETE /devices/:id` (Admin seulement)

###  InterventionsModule
- `POST /interventions` (Technicien seulement)
- `GET /interventions`

Fonctionnalités :
- Transaction MySQL
- Décrémentation automatique du stock
- Changement du statut de l’appareil à `REPAIRING`

---

##  Installation & Lancement

```bash
npm install
npm run start:dev
