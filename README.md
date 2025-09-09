# Rue Lucas - Dashboard Admin

Dashboard administrateur pour la gestion des réservations et avis de la location de vacances Rue Lucas.

## 🎯 Fonctionnalités

### 📊 Gestion des Réservations
- **Vue d'ensemble** : Statistiques en temps réel des réservations
- **Liste paginée** : Affichage de toutes les réservations avec pagination
- **Filtres avancés** : Recherche par nom, email, code de réservation et filtre par statut
- **Actions** : Visualisation, modification et suppression des réservations
- **Statuts** : Gestion des statuts (En attente, Payée, Annulée)

### ⭐ Gestion des Avis
- **Dashboard complet** : Statistiques détaillées (note moyenne, répartition, total)
- **Liste interactive** : Affichage de tous les avis avec système d'étoiles
- **Recherche en temps réel** : Filtrage par auteur ou contenu
- **Création d'avis** : Modal de création avec validation ✅
- **Modification** : Interface prête (en attente API) ⚠️
- **Suppression** : Interface prête (en attente API) ⚠️
- **Visualisation** : Design responsive avec dates formatées

## 🚀 Technologies

- **Next.js 15** (App Router)
- **TypeScript** 
- **Tailwind CSS**
- **Lucide React** (icônes)
- **API REST** : Connexion à https://api-rue-lucas.vercel.app

## 📋 Prérequis

- Node.js 18.0.0 ou plus récent
- npm ou yarn

## 🛠️ Installation

1. **Cloner le projet**
   ```bash
   git clone [repository-url]
   cd rue-lucas-dashboard
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 🏗️ Scripts disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement

# Production
npm run build        # Compile l'application pour la production
npm run start        # Lance l'application en mode production

# Qualité de code
npm run lint         # Vérifie la qualité du code avec ESLint
```

## 📱 Pages disponibles

### 🏠 Dashboard Principal (`/`)
- Vue d'ensemble des statistiques
- Navigation vers les sections
- Status de l'API

### 📅 Gestion des Réservations (`/reservations`)
- Liste paginée des réservations
- Filtres et recherche
- Actions CRUD (à venir)

### ⭐ Gestion des Avis (`/reviews`)
- Liste des avis clients
- Statistiques des notes
- Recherche dans les avis

## 🔌 API

L'application se connecte à l'API : `https://api-rue-lucas.vercel.app`

### Endpoints utilisés :
- `GET /reservations` - Liste des réservations avec pagination
- `GET /api/reviews` - Liste des avis clients
- `GET /health` - Status de l'API

## 🎨 Design

- **Design responsive** : Compatible mobile et desktop
- **Interface moderne** : Design épuré avec Tailwind CSS
- **UX intuitive** : Navigation claire et actions évidentes
- **Accessibilité** : Respect des standards d'accessibilité web

## 🚧 État de l'API

### Endpoints disponibles
- ✅ `GET /api/reviews` - Consultation des avis
- ✅ `POST /api/reviews` - Création d'avis
- ✅ `GET /reservations` - Consultation des réservations
- ✅ `DELETE /reservations/:id` - Suppression de réservations

### En attente de développement
- ⚠️ `PUT /api/reviews/:id` - Modification d'avis
- ⚠️ `DELETE /api/reviews/:id` - Suppression d'avis
- ⚠️ `POST /reservations` - Création de réservations
- ⚠️ `PUT /reservations/:id` - Modification de réservations

> 📝 **Note :** L'interface est prête pour toutes ces fonctionnalités. Voir `API_ENHANCEMENT_ISSUE.md` pour les spécifications techniques.

## 🚧 Fonctionnalités à venir

- [ ] Modération avancée des avis (statuts pending/approved/rejected)
- [ ] Authentification admin sécurisée
- [ ] Notifications en temps réel
- [ ] Export de données (CSV/PDF)
- [ ] Analytics avancées
- [ ] Interface de gestion des utilisateurs

## 📈 Performance

- **Build optimisé** : Static generation avec Next.js
- **Chargement rapide** : Code splitting automatique
- **SEO optimisé** : Meta tags et structure sémantique

## 🔧 Configuration

### Variables d'environnement (optionnel)
```env
NEXT_PUBLIC_API_URL=https://api-rue-lucas.vercel.app
```

### Configuration Next.js
Le projet utilise la configuration par défaut de Next.js 15 avec :
- App Router
- TypeScript
- Tailwind CSS
- ESLint

---

**Développé par Lucas** - Dashboard pour la gestion de la location Rue Lucas
