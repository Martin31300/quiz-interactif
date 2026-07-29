// quiz.js
import {
  getElement,
  showElement,
  hideElement,
  setText,
  createAnswerButton,
  updateScoreDisplay,
  lockAnswers,
  markCorrectAnswer,
} from "./dom.js";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  startTimer,
} from "./utils.js";

console.log("Quiz JS loaded...");

const questions = [
  {
    text: "Quelle est la capitale de la France ?",
    answers: ["Marseille", "Paris", "Lyon", "Bordeaux"],
    correct: 1,
    timeLimit: 10,
  },
  {
    text: "Combien font 2 + 3 ?",
    answers: ["3", "4", "5", "1"],
    correct: 2,
    timeLimit: 5,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let bestScore = loadFromLocalStorage("bestScore", 0);
let timerId = null;
// Historique des réponses
let answersHistory = [];

// DOM Elements
const introScreen = getElement("#intro-screen");
const questionScreen = getElement("#question-screen");
const resultScreen = getElement("#result-screen");

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

const recapBody = getElement("#recap-body");

// Init
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

setText(bestScoreValue, bestScore);

function startQuiz() {
  hideElement(introScreen);
  showElement(questionScreen);

  currentQuestionIndex = 0;
  score = 0;
  answersHistory = [];

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
      recordAnswer(q, null);
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
  recordAnswer(q, index);
  nextBtn.classList.remove("hidden");
}

// Enregistre la réponse
function recordAnswer(q, chosenIndex) {
  answersHistory.push({
    questionText: q.text,
    chosenText: chosenIndex === null ? "Pas de réponse" : q.answers[chosenIndex],
    correctText: q.answers[q.correct],
    isCorrect: chosenIndex === q.correct,
  });
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
    saveToLocalStorage("bestScore", bestScore);
  }
  setText(bestScoreEnd, bestScore);

  renderRecap();
}

// Affiche le tableau récapitulatif
function renderRecap() {
  recapBody.innerHTML = "";
  answersHistory.forEach((entry) => {
    const row = document.createElement("tr");
    row.classList.add(entry.isCorrect ? "recap-correct" : "recap-wrong");
    row.innerHTML = `
      <td>${entry.questionText}</td>
      <td>${entry.chosenText}</td>
      <td>${entry.correctText}</td>
    `;
    recapBody.appendChild(row);
  });
}

function restartQuiz() {
  hideElement(resultScreen);
  showElement(introScreen);

  setText(bestScoreValue, bestScore);
}
