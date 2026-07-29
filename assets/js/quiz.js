// quiz.js
import {
  getElement,
  showElement,
  hideElement,
  setText,
  createAnswerButton,
  createThemeButton,
  setSelectedTheme,
  updateScoreDisplay,
  lockAnswers,
  markCorrectAnswer,
} from "./dom.js";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  startTimer,
} from "./utils.js";
import { quizData } from "./data.js";

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

// Init
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

renderThemePicker();
selectTheme(Object.keys(quizData)[0]); // thème sélectionné par défaut

// Génère un bouton par thème disponible.
function renderThemePicker() {
  themePicker.innerHTML = "";
  Object.keys(quizData).forEach((themeKey) => {
    const btn = createThemeButton(quizData[themeKey].label, () =>
      selectTheme(themeKey)
    );
    themePicker.appendChild(btn);
  });
}

// Sélectionne un thème : met à jour l'UI et le meilleur score affiché.
function selectTheme(themeKey) {
  currentTheme = themeKey;
  bestScore = loadFromLocalStorage(bestScoreKey(themeKey), 0);
  setSelectedTheme(themePicker, quizData[themeKey].label);
  setText(bestScoreValue, bestScore);
}

function startQuiz() {
  if (!currentTheme) return; // aucun thème choisi

  questions = quizData[currentTheme].questions;

  hideElement(introScreen);
  showElement(questionScreen);

  currentQuestionIndex = 0;
  score = 0;

  setText(totalQuestionsSpan, questions.length);

  showQuestion();
}

function showQuestion() {
  clearInterval(timerId);

  const q = questions[currentQuestionIndex];
  setText(questionText, q.text);
  setText(currentQuestionIndexSpan, currentQuestionIndex + 1);

  answersDiv.innerHTML = "";
  q.answers.forEach((answer, index) => {
    const btn = createAnswerButton(answer, () => selectAnswer(index, btn));
    answersDiv.appendChild(btn);
  });

  nextBtn.classList.add("hidden");

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

  updateScoreDisplay(scoreText, score, questions.length);

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
