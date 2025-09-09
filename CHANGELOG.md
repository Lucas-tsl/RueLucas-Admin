# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [0.3.0] - 2025-09-09

### ✨ Ajouté
- **CRUD complet des avis** : Suppression et modification d'avis maintenant fonctionnels
- **Confirmations de suppression** : Dialog de confirmation avant suppression
- **Messages de succès** : Notifications utilisateur pour toutes les opérations
- **Interface mise à jour** : Boutons d'action activés et colorés selon l'action
- **Gestion d'erreurs améliorée** : Messages d'erreur détaillés pour le debugging

### 🔧 Améliorations
- **API Integration** : Support complet des endpoints PUT et DELETE
- **UX/UI** : Boutons interactifs avec hover states appropriés
- **Loading states** : Indicateurs de chargement pendant les opérations
- **Feedback utilisateur** : Banner d'information actualisé

### 🐛 Corrigé
- Interface CRUD désormais complètement opérationnelle
- Boutons de modification et suppression activés

## [0.2.0] - 2025-09-09

### ✨ Ajouté
- **Interface CRUD pour les avis** : Page complète de gestion des avis clients
- **Dashboard statistiques** : Affichage de la note moyenne, répartition des notes, total
- **Modal de création d'avis** : Formulaire complet avec validation
- **Recherche en temps réel** : Filtrage instantané des avis
- **Types TypeScript partagés** : Système de types pour l'API et les formulaires
- **Templates GitHub** : Templates de PR et d'issues structurés
- **Gestion d'erreurs** : Messages informatifs pour les limitations API

### ⚠️ Limitations (Résolues en v0.3.0)
- ~~Modification d'avis : Interface prête, en attente endpoint API `PUT /api/reviews/:id`~~
- ~~Suppression d'avis : Interface prête, en attente endpoint API `DELETE /api/reviews/:id`~~

### 🔧 Technique
- Intégration avec API Rue Lucas (https://api-rue-lucas.vercel.app)
- Composant modal réutilisable
- Gestion d'état avec React hooks
- Interface responsive avec Tailwind CSS

## [0.1.0] - 2025-09-08

### ✨ Ajouté
- **Setup initial** : Projet Next.js avec TypeScript et Tailwind CSS
- **Gestion des réservations** : Interface complète de consultation
- **Dashboard principal** : Page d'accueil avec navigation
- **GitHub Actions** : Pipeline CI/CD automatisé
- **Workflows** : Tests, build et review automatique des PRs

### 🚀 Infrastructure
- Configuration Next.js 15 avec App Router
- Pipeline de déploiement automatisé
- Templates de contribution standardisés
