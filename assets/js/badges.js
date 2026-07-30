// badges.js
// Système de badges : débloqués en fonction des performances cumulées
// du joueur (toutes parties confondues), sauvegardés en localStorage.
import { loadFromLocalStorage, saveToLocalStorage } from "./utils.js";

const UNLOCKED_KEY = "unlockedBadges";

// Chaque badge a une condition évaluée sur les stats cumulées du joueur.
export const BADGES = [
  {
    id: "first_quiz",
    icon: "🥇",
    labelKey: "badgeFirstQuiz",
    condition: (stats) => stats.totalQuizzes >= 1,
  },
  {
    id: "ten_correct",
    icon: "🔥",
    labelKey: "badgeTenCorrect",
    condition: (stats) => stats.totalCorrect >= 10,
  },
  {
    id: "perfect_score",
    icon: "⭐",
    labelKey: "badgePerfect",
    condition: (stats) => stats.hasPerfect,
  },
];

const loadUnlockedIds = () => loadFromLocalStorage(UNLOCKED_KEY, []);
const saveUnlockedIds = (ids) => saveToLocalStorage(UNLOCKED_KEY, ids);

// Compare les stats actuelles aux badges déjà débloqués, en débloque de
// nouveaux si leur condition est atteinte, et persiste le résultat.
// Renvoie tous les badges débloqués + ceux qui viennent de l'être.
export const updateBadges = (stats) => {
  const unlockedIds = new Set(loadUnlockedIds());
  const newlyUnlocked = [];

  BADGES.forEach((badge) => {
    if (!unlockedIds.has(badge.id) && badge.condition(stats)) {
      unlockedIds.add(badge.id);
      newlyUnlocked.push(badge);
    }
  });

  saveUnlockedIds([...unlockedIds]);

  const allUnlocked = BADGES.filter((badge) => unlockedIds.has(badge.id));
  return { allUnlocked, newlyUnlocked };
};
