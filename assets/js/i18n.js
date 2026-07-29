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
    flashcardDone: "Entraînement terminé 👍",
    bestScore: "Meilleur score :",
    start: "Commencer le quiz",
    next: "Question suivante",
    restart: "Recommencer",
    finalResult: "Résultat final",
    yourScore: "Votre score :",
    timeLeft: "Temps restant :",
    question: "Question",
    hint: "💡 Indice",
    darkOn: "🌙 Mode sombre",
    darkOff: "☀️ Mode clair",
    diff1: "🟢 Facile",
    diff2: "🟠 Moyen",
    diff3: "🔴 Difficile",
  },
  en: {
    notice: "Test your knowledge with a few timed questions!",
    langLabel: "Language:",
    chooseTheme: "Choose a theme:",
    chooseMode: "Mode:",
    modeNormal: "🎯 Normal",
    modeChrono: "⏱️ Time attack",
    modeFlashcard: "🃏 Flashcard",
    flashcardDone: "Training complete 👍",
    bestScore: "Best score:",
    start: "Start the quiz",
    next: "Next question",
    restart: "Restart",
    finalResult: "Final result",
    yourScore: "Your score:",
    timeLeft: "Time left:",
    question: "Question",
    hint: "💡 Hint",
    darkOn: "🌙 Dark mode",
    darkOff: "☀️ Light mode",
    diff1: "🟢 Easy",
    diff2: "🟠 Medium",
    diff3: "🔴 Hard",
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
