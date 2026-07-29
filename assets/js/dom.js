// dom.js
export const getElement = (selector) => document.querySelector(selector);
export const showElement = (element) => (element.style.display = "block");
export const hideElement = (element) => (element.style.display = "none");
export const setText = (element, text) => (element.textContent = text);

export const createAnswerButton = (text, onClick) => {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.addEventListener("click", onClick);
  return btn;
};

// Bouton de sélection d'un thème (Sprint 2 : mode multi-thème).
export const createThemeButton = (label, onClick) => {
  const btn = document.createElement("button");
  btn.className = "theme-btn";
  btn.textContent = label;
  btn.setAttribute("aria-pressed", "false");
  btn.addEventListener("click", onClick);
  return btn;
};

// Marque le bouton de thème sélectionné parmi une liste de boutons.
export const setSelectedTheme = (container, selectedLabel) => {
  container.querySelectorAll("button").forEach((btn) => {
    const isSelected = btn.textContent === selectedLabel;
    btn.classList.toggle("selected", isSelected);
    btn.setAttribute("aria-pressed", String(isSelected));
  });
};

export const updateScoreDisplay = (scoreElement, score, total) => {
  scoreElement.textContent = `Votre score : ${score} / ${total}`;
};

export const lockAnswers = (container) => {
  const buttons = container.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));
};

export const markCorrectAnswer = (container, correctIndex) => {
  const buttons = container.querySelectorAll("button");
  if (buttons[correctIndex]) {
    buttons[correctIndex].classList.add("correct");
  }
};
