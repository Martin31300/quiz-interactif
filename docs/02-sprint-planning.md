# 🗓️ Sprint Planning — Sprint 2

## Contexte

Le **Sprint 1** a été livré par l'équipe précédente : le quiz de base est
fonctionnel (3 écrans, timer, feedback, barre de progression, meilleur
score en `localStorage`), avec une architecture **modulaire en ES modules**
(`assets/js/quiz.js`, `dom.js`, `utils.js`). Ces user stories sont en
**« Done »**.

Nous démarrons le **Sprint 2**. ⚠️ Le temps est court : il faut faire les
bons choix pour tenir l'objectif.

## 🎯 Objectif du sprint (Sprint Goal)

> Enrichir la rejouabilité et l'engagement du quiz : variété (thèmes +
> mélange) et courbe de progression (difficulté).

## Sélection du backlog

| # | User Story                      | Estimation | Priorité | Assigné  |
| - | ------------------------------- | ---------- | -------- | -------- |
| 1 | Mode multi-thème                | 3 pts      | Haute    | Martin   |
| 2 | Mélange aléatoire des questions | 2 pts      | Haute    | Jonathan |
| 3 | Difficulté progressive          | 3 pts      | Moyenne  | Équipe   |

**Total : 8 points de story.**

### Justification
- **Multi-thème d'abord** : ajoute un module `data.js` (banques par thème),
  fondation des autres stories.
- **Mélange** : petit effort, gros impact (Fisher-Yates dans `utils.js`).
- **Difficulté progressive** : compatible avec le mélange (on brasse *à
  l'intérieur* de chaque niveau).

### Écarté (YAGNI)
- Classement en ligne / backend (on reste en JS natif + `localStorage`).
- Éditeur de questions dans l'UI.

## ✅ Definition of Done (DoD)

1. Code développé sur une branche `feature/…` issue de `develop`.
2. Critères d'acceptation de la story satisfaits.
3. Story validée par le PO en **Review** (revue de branche).
4. Aucune erreur console ; navigation fluide intro → question → résultat.
5. Branche **mergée dans `develop`** (`--no-ff`) avec un message clair.
