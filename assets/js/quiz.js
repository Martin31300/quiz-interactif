// quiz.js
import {
  getElement,
  showElement,
  hideElement,
  setText,
  createAnswerButton,
  createThemeButton,
  setSelectedTheme,
  lockAnswers,
  markCorrectAnswer,
} from "./dom.js";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  startTimer,
  shuffle,
} from "./utils.js";
import { quizData } from "./data.js";
import { initDarkMode, refreshDarkModeLabel } from "./theme.js";
import { getLang, setLang, t, applyTranslations } from "./i18n.js";

// Prépare une partie (les questions restent BILINGUES) :
// - difficulté progressive : questions ordonnées de facile à difficile ;
// - mélange : ordre brassé À L'INTÉRIEUR de chaque niveau, + un ordre de
//   réponses (`order`, permutation d'indices) tiré une fois par question.
// La langue n'est PAS résolue ici mais à l'affichage — ainsi, changer de
// langue en cours de partie retraduit la question courante.
const prepareQuestions = (source) => {
  const byLevel = new Map();
  source.forEach((q) => {
    const level = q.difficulty || 1;
    if (!byLevel.has(level)) byLevel.set(level, []);
    byLevel.get(level).push(q);
  });

  const levels = [...byLevel.keys()].sort((a, b) => a - b);
  const ordered = [];
  levels.forEach((level) => shuffle(byLevel.get(level)).forEach((q) => ordered.push(q)));

  return ordered.map((q) => {
    const order = shuffle(q.answers.fr.map((_, i) => i)); // ordre des réponses
    return { ...q, order, correct: order.indexOf(q.correct) };
  });
};

// Libellé traduit d'un niveau de difficulté (🟢/🟠/🔴).
const difficultyLabel = (level) => t(`diff${level}`);

// Résout une question préparée dans la langue courante : texte + réponses
// (dans l'ordre `order`). `correct` est déjà l'index dans ce nouvel ordre,
// et reste valable quelle que soit la langue (tableaux fr/en parallèles).
const localizeQuestion = (q) => ({
  text: q.text[getLang()],
  answers: q.order.map((i) => q.answers[getLang()][i]),
  correct: q.correct,
  difficulty: q.difficulty,
  timeLimit: q.timeLimit,
  hint: q.hint ? q.hint[getLang()] : undefined,
});

console.log("Quiz JS loaded...");

// Clé de sauvegarde du meilleur score, propre à chaque thème.
const bestScoreKey = (theme) => `bestScore_${theme}`;

// Modes de jeu (Sprint 2) :
// - normal    : minuteur par question + score
// - chrono    : minuteur GLOBAL unique pour tout le quiz + score
// - flashcard : entraînement, sans minuteur ni score
const MODES = [
  { key: "normal", labelKey: "modeNormal" },
  { key: "chrono", labelKey: "modeChrono" },
  { key: "flashcard", labelKey: "modeFlashcard" },
];
const CHRONO_SECONDS = 30; // temps global du mode contre-la-montre

let currentTheme = null; // thème sélectionné (ex. "culture")
let currentMode = "normal"; // mode de jeu sélectionné
let questions = []; // questions de la partie en cours
let currentQuestionIndex = 0;
let score = 0;
let bestScore = 0;
let timerId = null; // minuteur par question (mode normal)
let globalTimerId = null; // minuteur global (mode chrono)
let answersHistory = []; // historique des réponses (récap + statistiques)
let questionStartTime = null; // horodatage d'affichage (temps de réponse)

// DOM Elements
const introScreen = getElement("#intro-screen");
const questionScreen = getElement("#question-screen");
const resultScreen = getElement("#result-screen");

const themePicker = getElement("#theme-picker");
const modePicker = getElement("#mode-picker");
const bestScoreValue = getElement("#best-score-value");
const bestScoreEnd = getElement("#best-score-end");
const resultBestLine = getElement("#result-best-line");
const timerDiv = getElement("#timer-div");

const questionText = getElement("#question-text");
const answersDiv = getElement("#answers");
const nextBtn = getElement("#next-btn");
const startBtn = getElement("#start-btn");
const restartBtn = getElement("#restart-btn");

const scoreText = getElement("#score-text");
const timeLeftSpan = getElement("#time-left");

const currentQuestionIndexSpan = getElement("#current-question-index");
const totalQuestionsSpan = getElement("#total-questions");
const difficultyBadge = getElement("#difficulty-badge");

const hintBtn = getElement("#hint-btn");
const hintText = getElement("#hint-text");

const resultDetails = getElement("#result-details");
const recapBody = getElement("#recap-body");
const statsCorrect = getElement("#stats-correct");
const statsWrong = getElement("#stats-wrong");
const statsAvgTime = getElement("#stats-avg-time");

// Init
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);
hintBtn.addEventListener("click", revealHint);

// Langue : restaure le choix, traduit l'interface, branche le menu.
const langSelect = getElement("#lang-select");
langSelect.value = getLang();
applyTranslations();
langSelect.addEventListener("change", changeLanguage);

initDarkMode(getElement("#theme-toggle")); // mode sombre (préférence mémorisée)
renderThemePicker();
selectTheme(Object.keys(quizData)[0]); // thème sélectionné par défaut
renderModePicker(); // sélecteur de mode (normal par défaut)

// Change la langue : traduit l'interface et rafraîchit les éléments dynamiques.
function changeLanguage(event) {
  setLang(event.target.value);
  applyTranslations();
  refreshDarkModeLabel();
  renderThemePicker();
  renderModePicker();
  if (currentTheme) selectTheme(currentTheme);

  // Partie en cours : retraduire la question affichée dans la nouvelle langue.
  if (questionScreen.style.display !== "none" && questions.length) {
    showQuestion();
  }
  // Écran de résultat : retraduire la ligne de score (ou le message flashcard).
  if (resultScreen.style.display !== "none") {
    if (currentMode === "flashcard") {
      setText(scoreText, t("flashcardDone"));
    } else {
      setText(scoreText, `${t("yourScore")} ${score} / ${questions.length}`);
    }
  }
}

// Génère un bouton par thème disponible.
function renderThemePicker() {
  themePicker.innerHTML = "";
  Object.keys(quizData).forEach((themeKey) => {
    const btn = createThemeButton(quizData[themeKey].label[getLang()], () =>
      selectTheme(themeKey)
    );
    themePicker.appendChild(btn);
  });
}

// Sélectionne un thème : met à jour l'UI et le meilleur score affiché.
function selectTheme(themeKey) {
  currentTheme = themeKey;
  bestScore = loadFromLocalStorage(bestScoreKey(themeKey), 0);
  setSelectedTheme(themePicker, quizData[themeKey].label[getLang()]);
  setText(bestScoreValue, bestScore);
}

// Génère un bouton par mode de jeu disponible.
function renderModePicker() {
  modePicker.innerHTML = "";
  MODES.forEach((mode) => {
    const btn = createThemeButton(t(mode.labelKey), () => selectMode(mode.key));
    btn.dataset.mode = mode.key;
    modePicker.appendChild(btn);
  });
  highlightMode();
}

function selectMode(key) {
  currentMode = key;
  highlightMode();
}

// Met en évidence le mode sélectionné (par clé, robuste au changement de langue).
function highlightMode() {
  [...modePicker.children].forEach((btn) => {
    const on = btn.dataset.mode === currentMode;
    btn.classList.toggle("selected", on);
    btn.setAttribute("aria-pressed", String(on));
  });
}

function startQuiz() {
  if (!currentTheme) return; // aucun thème choisi

  questions = prepareQuestions(quizData[currentTheme].questions);

  hideElement(introScreen);
  showElement(questionScreen);

  currentQuestionIndex = 0;
  score = 0;
  answersHistory = [];

  setText(totalQuestionsSpan, questions.length);

  // Mode contre-la-montre : un seul minuteur global pour tout le quiz.
  clearInterval(globalTimerId);
  if (currentMode === "chrono") {
    setText(timeLeftSpan, CHRONO_SECONDS);
    globalTimerId = startTimer(
      CHRONO_SECONDS,
      (timeLeft) => setText(timeLeftSpan, timeLeft),
      () => endQuiz() // temps global écoulé → fin immédiate
    );
  }

  showQuestion();
}

function showQuestion() {
  clearInterval(timerId);

  const q = localizeQuestion(questions[currentQuestionIndex]);
  setText(questionText, q.text);
  setText(currentQuestionIndexSpan, currentQuestionIndex + 1);
  setText(difficultyBadge, difficultyLabel(q.difficulty));

  answersDiv.innerHTML = "";
  if (currentMode === "flashcard") {
    // Vraie flashcard : pas de QCM — question au recto, la réponse se
    // révèle au clic (comme si on retournait la carte).
    renderFlashcard(q);
  } else {
    q.answers.forEach((answer, index) => {
      const btn = createAnswerButton(answer, () => selectAnswer(index, btn));
      answersDiv.appendChild(btn);
    });
  }

  nextBtn.classList.add("hidden");
  setupHint(q);

  questionStartTime = Date.now(); // pour le temps de réponse (statistiques)

  if (currentMode === "normal") {
    // Minuteur par question.
    showElement(timerDiv);
    timeLeftSpan.textContent = q.timeLimit;
    timerId = startTimer(
      q.timeLimit,
      (timeLeft) => setText(timeLeftSpan, timeLeft),
      () => {
        lockAnswers(answersDiv);
        recordAnswer(questions[currentQuestionIndex], null); // temps écoulé
        nextBtn.classList.remove("hidden");
      }
    );
  } else if (currentMode === "chrono") {
    // Le minuteur global (démarré dans startQuiz) reste affiché et continue.
    showElement(timerDiv);
  } else {
    // Flashcard : aucun minuteur, et on peut avancer librement → le bouton
    // « Suivant » est visible dès l'affichage (répondre reste optionnel).
    hideElement(timerDiv);
    nextBtn.classList.remove("hidden");
  }
}

// Mode flashcard : affiche un bouton « Voir la réponse » qui révèle la
// bonne réponse (le verso de la carte), puis se désactive.
function renderFlashcard(q) {
  const revealBtn = document.createElement("button");
  revealBtn.className = "reveal-btn";
  revealBtn.textContent = t("showAnswer");

  const answerBox = document.createElement("p");
  answerBox.className = "flashcard-answer hidden";
  answerBox.textContent = q.answers[q.correct];

  revealBtn.addEventListener("click", () => {
    answerBox.classList.remove("hidden");
    revealBtn.disabled = true;
  });

  answersDiv.append(revealBtn, answerBox);
}

// Indice par question : n'affiche le bouton que si un indice existe.
function setupHint(q) {
  hintText.classList.add("hidden");
  setText(hintText, "");
  if (q.hint) {
    hintBtn.disabled = false;
    hintBtn.classList.remove("hidden");
  } else {
    hintBtn.classList.add("hidden");
  }
}

// Révèle l'indice de la question courante (une seule fois).
function revealHint() {
  const q = questions[currentQuestionIndex];
  if (!q || !q.hint) return;
  setText(hintText, `💡 ${q.hint[getLang()]}`);
  hintText.classList.remove("hidden");
  hintBtn.disabled = true;
}

function selectAnswer(index, btn) {
  clearInterval(timerId); // minuteur par question (sans effet en chrono/flashcard)

  const q = questions[currentQuestionIndex];
  const isCorrect = index === q.correct;

  // Le score n'est PAS compté en mode flashcard (entraînement).
  if (isCorrect && currentMode !== "flashcard") score++;

  // Feedback visuel dans tous les modes (utile aussi pour l'entraînement).
  btn.classList.add(isCorrect ? "correct" : "wrong");
  markCorrectAnswer(answersDiv, q.correct);
  lockAnswers(answersDiv);
  recordAnswer(q, index);
  nextBtn.classList.remove("hidden");
}

// Enregistre la réponse (ou son absence) pour le récap et les statistiques.
// Reçoit la question préparée (bilingue) et la résout dans la langue courante.
function recordAnswer(prepared, chosenIndex) {
  const q = localizeQuestion(prepared);
  const timeSpent = Math.min(
    (Date.now() - questionStartTime) / 1000,
    q.timeLimit
  );
  answersHistory.push({
    questionText: q.text,
    chosenText: chosenIndex === null ? t("noAnswer") : q.answers[chosenIndex],
    correctText: q.answers[q.correct],
    isCorrect: chosenIndex === q.correct,
    timeSpent,
  });
}

// Affiche le tableau récapitulatif des réponses (feature de Martin).
function renderRecap() {
  recapBody.innerHTML = "";
  answersHistory.forEach((entry) => {
    const row = document.createElement("tr");
    row.classList.add(entry.isCorrect ? "recap-correct" : "recap-wrong");
    [entry.questionText, entry.chosenText, entry.correctText].forEach((txt) => {
      const cell = document.createElement("td");
      cell.textContent = txt;
      row.appendChild(cell);
    });
    recapBody.appendChild(row);
  });
}

// Statistiques détaillées : bonnes/mauvaises réponses et temps moyen.
function renderStats() {
  const correctCount = answersHistory.filter((e) => e.isCorrect).length;
  const wrongCount = answersHistory.length - correctCount;
  const totalTime = answersHistory.reduce((sum, e) => sum + e.timeSpent, 0);
  const avgTime = answersHistory.length ? totalTime / answersHistory.length : 0;

  setText(statsCorrect, correctCount);
  setText(statsWrong, wrongCount);
  setText(statsAvgTime, avgTime.toFixed(1));
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerId);
  clearInterval(globalTimerId);

  hideElement(questionScreen);
  showElement(resultScreen);

  // Flashcard : entraînement → pas de score, ni récap, ni statistiques.
  if (currentMode === "flashcard") {
    setText(scoreText, t("flashcardDone"));
    hideElement(resultBestLine);
    hideElement(resultDetails);
    return;
  }

  showElement(resultBestLine);
  setText(scoreText, `${t("yourScore")} ${score} / ${questions.length}`);

  if (score > bestScore) {
    bestScore = score;
    saveToLocalStorage(bestScoreKey(currentTheme), bestScore);
  }
  setText(bestScoreEnd, bestScore);

  // Récapitulatif + statistiques détaillées (features de Martin).
  showElement(resultDetails);
  renderRecap();
  renderStats();
}

function restartQuiz() {
  clearInterval(timerId);
  clearInterval(globalTimerId);

  hideElement(resultScreen);
  showElement(introScreen);

  setText(bestScoreValue, bestScore);
}
