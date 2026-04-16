# 🌍 Quiz Changement Climatique

## 📌 Description

Ce projet est une application web développée dans le cadre du projet en autonomie de Licence 2 Informatique à l’Université Lumière Lyon 2.

L’objectif de cette application est de **sensibiliser les utilisateurs au changement climatique** à travers :

* des quiz interactifs 🎯
* des cours pédagogiques 📚
* un système de progression 🏆

---

## 🚀 Fonctionnalités

* 🔐 Authentification (inscription / connexion)
* 👤 Profil utilisateur avec progression
* 🧠 Quiz par niveaux (déblocage progressif)
* 📖 Cours interactifs sur le climat
* 📈 Système de progression (niveaux et contenu débloqué)
* 💾 Sauvegarde des données utilisateur

---

## 🛠️ Technologies utilisées

### Frontend

* React (Vite)
* React Router

### Backend

* Node.js
* Express

### Données

* JSON (stockage local)

---

## 📂 Structure du projet

```
QUIZCHANGEMENTCLIMATIQUE/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Menu.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Quiz.jsx
│   │   │   ├── Courses.jsx
│
├── backend/
│   ├── serveur.js
│   ├── data/
│   │   ├── users.json
│   │   ├── quiz.json
│   │   ├── courses.json
```

---

## ▶️ Installation et lancement

### 1. Cloner le projet

```
git clone <url-du-repo>
```

### 2. Installer les dépendances

Frontend :

```
cd frontend
npm install
npm run dev
```

Backend :

```
cd backend
npm install
node serveur.js
```

---

## 👤 Utilisation

1. Créer un compte
2. Se connecter
3. Accéder aux quiz
4. Débloquer des niveaux
5. Consulter les cours

---

## 🎯 Objectif pédagogique

Cette application vise à :

* sensibiliser aux enjeux climatiques
* encourager l’apprentissage interactif
* rendre l’utilisateur acteur de son apprentissage

---

## 👨‍💻 Auteurs

Projet réalisé dans le cadre de la Licence 2 Informatique - ICOM Lyon 2.
