# 🚀 [API] Implémentation des endpoints manquants pour le CRUD des avis

## 📝 Description

L'interface admin pour la gestion des avis est implémentée mais attend les endpoints API suivants pour être complètement fonctionnelle.

## 🎯 Problème

Actuellement, l'API Rue Lucas ne supporte que :
- ✅ `GET /api/reviews` - Consultation des avis
- ✅ `POST /api/reviews` - Création d'avis

Il manque :
- ❌ `PUT /api/reviews/:id` - Modification d'avis
- ❌ `DELETE /api/reviews/:id` - Suppression d'avis

## 💡 Endpoints à implémenter

### 1. Modification d'avis
```
PUT /api/reviews/:id
Content-Type: application/json

{
  "author": "string",
  "rating": number,
  "comment": "string",
  "status": "pending" | "approved" | "rejected"
}
```

**Réponse attendue (200) :**
```json
{
  "_id": "string",
  "author": "string", 
  "rating": number,
  "comment": "string",
  "date": "ISO-string",
  "status": "string"
}
```

### 2. Suppression d'avis
```
DELETE /api/reviews/:id
```

**Réponse attendue (200) :**
```json
{
  "message": "Avis supprimé avec succès",
  "deletedId": "string"
}
```

## 📋 Critères d'acceptation

- [ ] Endpoint `PUT /api/reviews/:id` fonctionnel
- [ ] Endpoint `DELETE /api/reviews/:id` fonctionnel
- [ ] Validation des données en entrée
- [ ] Gestion des erreurs (404 si avis non trouvé)
- [ ] Tests des nouveaux endpoints
- [ ] Documentation API mise à jour

## 🔗 Contexte technique

- **Repository API :** https://github.com/Lucas-tsl/API-RueLucas
- **Interface admin prête :** Les boutons edit/delete sont déjà implémentés côté front
- **Code préparé :** Le code de gestion est commenté et prêt à être activé

## 🎨 Interface actuelle

L'interface affiche actuellement une bannière d'information et des boutons désactivés en attendant ces endpoints.

## 📌 Priorité

**Haute** - Bloque la fonctionnalité complète de gestion des avis dans l'admin.

---

**Liens utiles :**
- [Documentation API actuelle](https://api-rue-lucas.vercel.app/)
- [Interface admin des avis](http://localhost:3000/reviews)
