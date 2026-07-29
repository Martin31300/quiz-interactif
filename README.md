# Quiz Dynamique

Un quiz interactif en HTML/CSS/JS permettant :
- Un **timer** par question,
- Un **feedback** rouge/vert immédiat,
- Une **barre de progression** (question X/Y),
- Une **sauvegarde du meilleur score** en localStorage.

## Fonctionnalités

1. Chronomètre par question (10s, 5s…).
2. Feedback visuel (vert/rouge).
3. Indicateur de progression.
4. Meilleur score stocké localement.

## Nouveautés — Sprint 2 🚀

- **Mode multi-thème** : choix d'un thème sur l'accueil (Culture générale,
  Maths, Web & Info). Le meilleur score est mémorisé **par thème**.
- **Mélange aléatoire** (Fisher-Yates) des questions **et** des réponses à
  chaque partie, sans jamais altérer les données sources.
- **Difficulté progressive** : questions ordonnées de facile → difficile,
  temps de réponse décroissant, badge de niveau (🟢/🟠/🔴).
- **Mode sombre** : bouton pour basculer clair/sombre ; la préférence est
  mémorisée entre les sessions (`localStorage`).

## Installation

1. Cloner ce dépôt :
`git clone https://github.com/votre-nom/quiz-dynamique.git`

2. Ouvrir `index.html` dans un navigateur.

## Utilisation

- **Démarrage** : Un bouton “Commencer le quiz” lance la première question.
- **Réponse** : Un clic sur une proposition déclenche le feedback.
- **Temps** : Si le chrono arrive à zéro, on bloque la question.
- **Score final** : Indiqué en fin de quiz, compare avec le meilleur score.

## Améliorations possibles

- Mélanger l’ordre des questions.
- Récapitulatif des erreurs.
- Mode multi-thème.
- Etc.

## Workflow Git (Gitflow)

- **main** : version stable de référence (livrable du Sprint 1 de l'équipe
  précédente) — on n'y touche pas pendant le sprint.
- **develop** : intégration des fonctionnalités du Sprint 2.
- **feature/…** : une branche par user story, issue de `develop` et mergée
  dans `develop` (`--no-ff`).

Branches du Sprint 2 : `feature/mode-multi-theme`,
`feature/melange-questions`, `feature/difficulte-progressive`.

## Auteurs

Projet pédagogique (structure d'une application web, documentation,
organisation agile et Gitflow).

Équipe Sprint 2 :

- **Jonathan** — Scrum Master & Développeur
- **Martin** — Product Owner & Développeur
