# 🏨 RueLucas Admin Dashboard

> Interface d'administration pour la gestion des réservations et avis de l'hôtel Rue Lucas

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## ✨ Fonctionnalités

- 📅 **Gestion des Réservations** : CRUD complet avec recherche et filtres
- ⭐ **Gestion des Avis** : Modération et statistiques des avis clients
- 📊 **Dashboard** : Vue d'ensemble avec statistiques temps réel
- 🔄 **CI/CD** : GitHub Actions avec déploiement automatique

## 🚀 Installation

```bash
# Cloner et installer
git clone https://github.com/Lucas-tsl/RueLucas-Admin.git
cd RueLucas-Admin
npm install

# Démarrer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 🛠️ Scripts

```bash
npm run dev      # Développement
npm run build    # Build production
npm run lint     # Linter ESLint
```

## 🏗️ Architecture

```
src/
├── app/
│   ├── page.tsx              # Dashboard
│   ├── reservations/         # Module réservations
│   └── reviews/              # Module avis
├── components/               # Composants réutilisables
├── types/                    # Types TypeScript
└── .github/workflows/        # CI/CD
```

**Stack** : Next.js 15, TypeScript, Tailwind CSS, Vercel

## 🔧 API

Base URL : `https://api-rue-lucas.vercel.app`

```typescript
// Endpoints principaux
GET /reservations?page=1&limit=10&search=&status=
GET /reviews?page=1&limit=10&search=&status=
POST|PUT|DELETE /reservations/:id
POST|PUT|DELETE /reviews/:id
```

## 📝 Contribution

1. Fork le repository
2. Créer une branche : `git checkout -b feature/ma-feature`
3. Commit : `git commit -m "✨ feat: Ma nouvelle feature"`
4. Push : `git push origin feature/ma-feature`
5. Ouvrir une Pull Request

**Conventions** : [Conventional Commits](https://www.conventionalcommits.org/)

## 🌐 Déploiement

- **Production** : Push sur `main` → Auto-deploy Vercel
- **Preview** : Pull Request → Preview automatique
- **CI/CD** : GitHub Actions (tests, build, security audit)

---

**Fait avec ❤️ par [Lucas](https://github.com/Lucas-tsl)**

## 📋 Table des matières

- [✨ Fonctionnalités](#-fonctionnalités)
- [🚀 Démarrage rapide](#-démarrage-rapide)
- [🏗️ Architecture](#️-architecture)
- [� API Integration](#-api-integration)
- [🧪 Tests et CI/CD](#-tests-et-cicd)
- [📝 Contributing](#-contributing)
- [🌐 Déploiement](#-déploiement)

## ✨ Fonctionnalités

### 🏠 Dashboard Principal
- **Vue d'ensemble** avec statistiques en temps réel
- **Navigation intuitive** vers les modules de gestion
- **Statut API** avec indicateur de santé

### 📅 Gestion des Réservations
- ✅ **CRUD complet** : Créer, lire, modifier, supprimer
- 🔍 **Recherche avancée** par nom, email, code de réservation
- 🏷️ **Filtrage par statut** : En attente, Payée, Annulée
- 📊 **Pagination intelligente** avec affichage du total
- 📱 **Interface responsive** optimisée mobile/desktop
- 🎨 **Modals interactives** pour l'édition
- ♿ **Accessibilité WCAG** avec labels et aria-labels

### ⭐ Gestion des Avis
- 📝 **Modération des avis** clients
- ⭐ **Système de notation** sur 5 étoiles
- 📈 **Statistiques détaillées** des évaluations
- 🔍 **Recherche et filtrage** des commentaires
- ✅ **Validation** des avis avant publication

### 🤖 DevOps & Automation
- � **GitHub Actions** pour CI/CD automatique
- 🧪 **Tests automatiques** sur push/PR
- 🔒 **Security audit** avec npm audit
- 📊 **Build multi-environnements** (Node 18.x, 20.x)
- 🚀 **Déploiement Vercel** automatique

## 🚀 Démarrage rapide

### 📋 Prérequis

- Node.js 18.x ou supérieur
- npm ou yarn
- Git

### 🛠️ Installation

```bash
# Cloner le repository
git clone https://github.com/Lucas-tsl/RueLucas-Admin.git
cd RueLucas-Admin

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir l'application.

### 🔧 Scripts disponibles

```bash
npm run dev          # Serveur de développement avec Turbopack
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Linter ESLint
npm run type-check   # Vérification TypeScript
```

## 🏗️ Architecture

### � Structure du projet

```
src/
├── app/                    # App Router Next.js 15
│   ├── page.tsx           # Dashboard principal
│   ├── reservations/      # Module réservations
│   │   └── page.tsx      # Interface CRUD réservations
│   └── reviews/          # Module avis
│       └── page.tsx      # Interface CRUD avis
├── components/            # Composants réutilisables
│   ├── ReservationModal.tsx # Modal d'édition réservations
│   └── ReviewModal.tsx      # Modal d'édition avis
├── types/                # Types TypeScript
│   └── index.ts          # Types partagés API/Forms
└── styles/               # Styles globaux
    └── globals.css
```

### 🎨 Stack technique

- **Frontend** : Next.js 15, React 18, TypeScript
- **Styling** : Tailwind CSS, Lucide React Icons
- **State Management** : React Hooks (useState, useEffect, useCallback)
- **Build** : Turbopack (Next.js 15)
- **Linting** : ESLint, Prettier
- **CI/CD** : GitHub Actions
- **Deployment** : Vercel

## � API Integration

### 🌐 Endpoints utilisés

```typescript
// Base URL
const API_BASE = 'https://api-rue-lucas.vercel.app'

// Réservations
GET    /reservations?page=1&limit=10&search=&status=
POST   /reservations
PUT    /reservations/:id
DELETE /reservations/:id

// Avis
GET    /reviews?page=1&limit=10&search=&status=
POST   /reviews
PUT    /reviews/:id
DELETE /reviews/:id
```

### 📊 Types de données

```typescript
// Réservation API
interface ApiReservation {
  _id: string;
  code: string;
  status: 'pending' | 'paid' | 'cancelled';
  firstName: string;
  surname: string;
  email: string;
  startDate: string;
  endDate: string;
  amountTotal: number;
  // ... autres champs
}

// Avis API
interface ApiReview {
  _id: string;
  customerName: string;
  hotelName: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  // ... autres champs
}
```

## 🧪 Tests et CI/CD

### 🔄 GitHub Actions

Le projet utilise deux workflows principaux :

#### 1. **CI/CD Pipeline** (`.github/workflows/ci.yml`)
- ✅ Tests sur Node.js 18.x et 20.x
- 🔍 Linting automatique
- 🏗️ Build de production
- 📦 Upload des artifacts

#### 2. **PR Auto-Review** (`.github/workflows/pr-review.yml`)
- 🔒 Security audit avec `npm audit`
- 💅 Vérification du formatage code
- 🤖 Commentaires automatiques sur les PR

### 🎯 Workflow de développement

```bash
# 1. Créer une branche feature depuis dev
git checkout dev
git pull origin dev
git checkout -b feature/nouvelle-fonctionnalite

# 2. Développer et tester
npm run dev
npm run build
npm run lint

# 3. Commit avec message conventionnel
git add .
git commit -m "✨ feat: Ajouter nouvelle fonctionnalité"

# 4. Push et créer une PR
git push -u origin feature/nouvelle-fonctionnalite
# Puis créer la PR sur GitHub
```

## 📝 Contributing

### 🤝 Comment contribuer

1. **Fork** le repository
2. **Créer** une branche feature (`git checkout -b feature/amazing-feature`)
3. **Commit** vos changements (`git commit -m '✨ feat: Add amazing feature'`)
4. **Push** vers la branche (`git push origin feature/amazing-feature`)
5. **Ouvrir** une Pull Request

### 📋 Conventions

#### 📝 Messages de commit

Utiliser les [Conventional Commits](https://www.conventionalcommits.org/) :

```
✨ feat: Nouvelle fonctionnalité
🐛 fix: Correction de bug
📝 docs: Documentation
🎨 style: Formatage code
♻️ refactor: Refactoring
🧪 test: Tests
🔧 chore: Maintenance
```

#### � Code Review

- Utiliser le template de PR fourni
- Remplir la checklist complète
- Ajouter des screenshots pour les changements visuels
- S'assurer que les tests passent

## 🌐 Déploiement

### 🚀 Vercel (Automatique)

Le déploiement se fait automatiquement via Vercel :

- **Production** : Push sur `main` → Deploy sur [https://rue-lucas-admin.vercel.app](https://rue-lucas-admin.vercel.app)
- **Preview** : PR vers `main` → Deploy preview automatique
- **Development** : Branch `dev` → Deploy dev environment

### 🔧 Variables d'environnement

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api-rue-lucas.vercel.app
```

### 📊 Monitoring

- **Build Status** : GitHub Actions badge
- **Performance** : Vercel Analytics
- **Errors** : Console logs et error boundaries

## 🔗 Liens utiles

- 🌐 **Application** : [https://rue-lucas-admin.vercel.app](https://rue-lucas-admin.vercel.app)
- 📚 **API Documentation** : [https://api-rue-lucas.vercel.app/docs](https://api-rue-lucas.vercel.app/docs)
- 🐛 **Issues** : [GitHub Issues](https://github.com/Lucas-tsl/RueLucas-Admin/issues)
- 📝 **Discussions** : [GitHub Discussions](https://github.com/Lucas-tsl/RueLucas-Admin/discussions)

## 📄 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<div align="center">

**Fait avec ❤️ par [Lucas](https://github.com/Lucas-tsl)**

[⬆ Retour au top](#-ruelucas-admin-dashboard)

</div>
