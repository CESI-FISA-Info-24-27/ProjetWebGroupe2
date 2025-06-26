# 📱 Paftys

**Paftys** est un réseau social léger et réactif, inspiré de Twitter/X, conçu pour fonctionner efficacement même dans des environnements à faibles ressources. Il permet aux utilisateurs de publier des messages courts, d’interagir via des likes, commentaires, messages privés, et de gérer un profil personnalisé. L'application est développée avec une approche **mobile-first**, et containerisée avec Docker pour un déploiement simplifié.

---

## 🚀 Fonctionnalités

### ✅ Fonctionnalités

- Création de comptes utilisateurs avec validation par email
- Authentification sécurisée (JWT)
- Publication de messages courts (ex: 280 caractères)
- Affichage des messages sur le profil
- Flux chronologique des utilisateurs suivis
- Like de posts
- Commentaires sur posts et sous-commentaires
- Suivre / être suivi
- Profil utilisateur : nom, bio, photo
- Liste des messages publiés par l'utilisateur
- Messagerie privée entre utilisateurs
- Ajout de tags aux messages
- Recherche par tags
- Signalement de contenu inapproprié
- Système de modération (bannissement, suspension)
- Thème personnalisé ⌛

---

## 🛠️ Stack technique

### Backend

- Node.js + Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Docker (containerisation)
- Multer (upload d’images)

### Frontend

- React.js
- Tailwind CSS
- Redux Toolkit
- Axios
- ShadCn
- Mobile-first / Responsive Design

---

## ⚙️ Installation et lancement local

### 1. Cloner le projet

```bash
git clone https://github.com/CESI-FISA-Info-24-27/ProjetWebGroupe2
```

### 2. Configuration des variables d’environnement

Créer un fichier `.env` dans :

- `/backend` :
  ```env
  PORT= 5000
  MONGO_URI= voir avec un admin
  JWT_SECRET= voir avec un admin
  ```
- `/paftys` :
  ```env
  VITE_DB_URI=http://localhost:5000
  ```

### 3. Lancer avec Docker

```bash
docker-compose up --build
```

- Frontend : http://localhost:5173
- Backend API : http://localhost:5000/api

---

## 🧱 Structure du projet

```
projet/
│
├── backend/                # API REST
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── middlewares/
│
├── paftys/               # Interface React
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── hooks/
│
├── docker-compose.yml
└── README.md
```

---

## 🧩 Architecture fonctionnelle

- Authentification sécurisée via JWT
- Gestion des utilisateurs et abonnements
- Système de publication et interaction (likes, commentaires)
- Messagerie privée
- Backend modulaire et scalable
- Frontend mobile-first

---

## 👥 Auteurs

- Lucas Crouzet
- Xavier Ferber
- Benjamin Repellin
- Nicolas Mas
