// i18n.js
// Internationalisation (Sprint 2) : gère la langue de l'interface,
// mémorise le choix dans localStorage et applique les traductions.
import { loadFromLocalStorage, saveToLocalStorage } from "./utils.js";

const LANG_KEY = "lang";

// Dictionnaire des textes de l'interface.
const translations = {
  fr: {
    notice: "Testez vos connaissances en quelques questions chronométrées !",
    langLabel: "Langue :",
    chooseTheme: "Choisis un thème :",
    chooseMode: "Mode :",
    modeNormal: "🎯 Normal",
    modeChrono: "⏱️ Contre-la-montre",
    modeFlashcard: "🃏 Flashcard",
    modeInfinite: "♾️ Infini",
    endInfinite: "🛑 Terminer le quiz",
    flashcardDone: "Entraînement terminé 👍",
    showAnswer: "👀 Voir la réponse",
    statsTitle: "Statistiques détaillées",
    statsCorrect: "Bonnes réponses :",
    statsWrong: "Mauvaises réponses :",
    statsAvgTime: "Temps moyen par question :",
    recapTitle: "Récapitulatif de vos réponses",
    recapQuestion: "Question",
    recapYour: "Votre réponse",
    recapAnswer: "Bonne réponse",
    noAnswer: "Pas de réponse",
    share: "📤 Partager mon score",
    shareCopied: "✅ Lien copié !",
    shareMessage: "J'ai obtenu {score}/{total} au Quiz Dynamique ({theme}) ! Sauras-tu faire mieux ?",
    bestScore: "Meilleur score :",
    start: "Commencer le quiz",
    next: "Question suivante",
    restart: "Recommencer",
    finalResult: "Résultat final",
    yourScore: "Votre score :",
    timeLeft: "Temps restant :",
    question: "Question",
    hint: "💡 Indice",
    playAudio: "🔊 Lecture",
    darkOn: "🌙 Mode sombre",
    darkOff: "☀️ Mode clair",
    diff1: "🟢 Facile",
    diff2: "🟠 Moyen",
    diff3: "🔴 Difficile",
    badgesTitle: "Badges débloqués",
    badgeFirstQuiz: "Premier quiz terminé",
    badgeTenCorrect: "10 bonnes réponses cumulées",
    badgePerfect: "Score parfait sur un quiz",
    noBadges: "Aucun badge débloqué pour l'instant",
    newBadge: "Nouveau badge débloqué !",
  },
  en: {
    notice: "Test your knowledge with a few timed questions!",
    langLabel: "Language:",
    chooseTheme: "Choose a theme:",
    chooseMode: "Mode:",
    modeNormal: "🎯 Normal",
    modeChrono: "⏱️ Time attack",
    modeFlashcard: "🃏 Flashcard",
    modeInfinite: "♾️ Endless",
    endInfinite: "🛑 Finish quiz",
    flashcardDone: "Training complete 👍",
    showAnswer: "👀 Show answer",
    statsTitle: "Detailed statistics",
    statsCorrect: "Correct answers:",
    statsWrong: "Wrong answers:",
    statsAvgTime: "Average time per question:",
    recapTitle: "Summary of your answers",
    recapQuestion: "Question",
    recapYour: "Your answer",
    recapAnswer: "Correct answer",
    noAnswer: "No answer",
    share: "📤 Share my score",
    shareCopied: "✅ Link copied!",
    shareMessage: "I scored {score}/{total} on Quiz Dynamique ({theme})! Can you beat me?",
    bestScore: "Best score:",
    start: "Start the quiz",
    next: "Next question",
    restart: "Restart",
    finalResult: "Final result",
    yourScore: "Your score:",
    timeLeft: "Time left:",
    question: "Question",
    hint: "💡 Hint",
    playAudio: "🔊 Play",
    darkOn: "🌙 Dark mode",
    darkOff: "☀️ Light mode",
    diff1: "🟢 Easy",
    diff2: "🟠 Medium",
    diff3: "🔴 Hard",
    badgesTitle: "Unlocked badges",
    badgeFirstQuiz: "Completed your first quiz",
    badgeTenCorrect: "10 cumulative correct answers",
    badgePerfect: "Perfect score on a quiz",
    noBadges: "No badge unlocked yet",
    newBadge: "New badge unlocked!",
  },
};

let currentLang = loadFromLocalStorage(LANG_KEY, "fr");

export const getLang = () => currentLang;

export const setLang = (lang) => {
  if (!translations[lang]) return;
  currentLang = lang;
  saveToLocalStorage(LANG_KEY, lang);
};

// Traduit une clé dans la langue courante.
export const t = (key) => translations[currentLang][key] || key;

// Applique les traductions à tous les éléments porteurs de data-i18n.
export const applyTranslations = () => {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.documentElement.lang = currentLang;
};
