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

let currentTheme = null; // thème sélectionné (ex. "culture")
let questions = []; // questions de la partie en cours
let currentQuestionIndex = 0;
let score = 0;
let bestScore = 0;
let timerId = null;

// DOM Elements
const introScreen = getElement("#intro-screen");
const questionScreen = getElement("#question-screen");
const resultScreen = getElement("#result-screen");

const themePicker = getElement("#theme-picker");
const bestScoreValue = getElement("#best-score-value");
const bestScoreEnd = getElement("#best-score-end");

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

// Change la langue : traduit l'interface et rafraîchit les éléments dynamiques.
function changeLanguage(event) {
  setLang(event.target.value);
  applyTranslations();
  refreshDarkModeLabel();
  renderThemePicker();
  if (currentTheme) selectTheme(currentTheme);

  // Partie en cours : retraduire la question affichée dans la nouvelle langue.
  if (questionScreen.style.display !== "none" && questions.length) {
    showQuestion();
  }
  // Écran de résultat : retraduire la ligne de score.
  if (resultScreen.style.display !== "none") {
    setText(scoreText, `${t("yourScore")} ${score} / ${questions.length}`);
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

function startQuiz() {
  if (!currentTheme) return; // aucun thème choisi

  questions = prepareQuestions(quizData[currentTheme].questions);

  hideElement(introScreen);
  showElement(questionScreen);

  currentQuestionIndex = 0;
  score = 0;

  setText(totalQuestionsSpan, questions.length);

  showQuestion();
}

function showQuestion() {
  clearInterval(timerId);

  const q = localizeQuestion(questions[currentQuestionIndex]);
  setText(questionText, q.text);
  setText(currentQuestionIndexSpan, currentQuestionIndex + 1);
  setText(difficultyBadge, difficultyLabel(q.difficulty));

  answersDiv.innerHTML = "";
  q.answers.forEach((answer, index) => {
    const btn = createAnswerButton(answer, () => selectAnswer(index, btn));
    answersDiv.appendChild(btn);
  });

  nextBtn.classList.add("hidden");
  setupHint(q);

  timeLeftSpan.textContent = q.timeLimit;
  timerId = startTimer(
    q.timeLimit,
    (timeLeft) => setText(timeLeftSpan, timeLeft),
    () => {
      lockAnswers(answersDiv);
      nextBtn.classList.remove("hidden");
    }
  );
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
  clearInterval(timerId);

  const q = questions[currentQuestionIndex];
  if (index === q.correct) {
    score++;
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
  }

  markCorrectAnswer(answersDiv, q.correct);
  lockAnswers(answersDiv);
  nextBtn.classList.remove("hidden");
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
  hideElement(questionScreen);
  showElement(resultScreen);

  setText(scoreText, `${t("yourScore")} ${score} / ${questions.length}`);

  if (score > bestScore) {
    bestScore = score;
    saveToLocalStorage(bestScoreKey(currentTheme), bestScore);
  }
  setText(bestScoreEnd, bestScore);
}

function restartQuiz() {
  hideElement(resultScreen);
  showElement(introScreen);

  setText(bestScoreValue, bestScore);
}
