# 📋 Backlog & User Stories — Quiz Dynamique

Format : **En tant que** [rôle], **je veux** [besoin], **afin de** [valeur].

---

## ✅ Sprint 1 — Done (équipe précédente)

- **US-01 — Timer par question** : compteur visible ; à 0, la question est
  bloquée.
- **US-02 — Feedback immédiat** : bonne réponse en **vert** (`.correct`),
  mauvaise en **rouge** (`.wrong`) ; boutons désactivés après réponse.
- **US-03 — Barre de progression** : « Question X / Total ».
- **US-04 — Meilleur score persistant** : lu/écrit dans `localStorage`.

---

## 🚀 Sprint 2 — Réalisé

### US-05 — Mode multi-thème · `feature/mode-multi-theme`
En tant que joueur, je veux **choisir un thème** afin d'adapter les
questions à mes centres d'intérêt.
- [x] Sélecteur de thème sur l'écran d'accueil.
- [x] Chaque thème a sa propre banque de questions (`assets/js/data.js`).
- [x] Meilleur score mémorisé **par thème** (`bestScore_<theme>`).
- [x] Sélecteur accessible (`aria-pressed`).

### US-06 — Mélange aléatoire · `feature/melange-questions`
En tant que joueur, je veux que l'ordre des questions soit **mélangé** afin
que chaque session soit unique.
- [x] Ordre des questions mélangé à chaque partie (Fisher-Yates).
- [x] Ordre des **réponses** mélangé aussi.
- [x] Index de la bonne réponse recalculé après mélange.
- [x] Données sources (`quizData`) jamais modifiées.

### US-07 — Difficulté progressive · `feature/difficulte-progressive`
En tant que joueur, je veux que la difficulté **augmente** afin de garder
un défi intéressant.
- [x] Niveau `difficulty` (1 → 3) sur chaque question.
- [x] Questions ordonnées du plus facile au plus difficile.
- [x] `timeLimit` décroissant avec la difficulté.
- [x] Mélange appliqué **à l'intérieur** de chaque niveau (compat. US-06).
- [x] Niveau affiché pendant le quiz (🟢/🟠/🔴).

---

## 💡 Backlog restant (sprints futurs)

- **US-08** — Récapitulatif des erreurs en fin de partie.
- **US-09** — Nombre de questions configurable avant de démarrer.
- **US-10** — Bonus de points selon la rapidité de réponse.
- **US-11** — Thème visuel clair / sombre.
