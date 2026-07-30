// utils.js
export const loadFromLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue === null) return defaultValue;
  try {
    return JSON.parse(storedValue);
  } catch {
    // Valeur corrompue (ex. chaîne brute non-JSON) : on repart sur la
    // valeur par défaut au lieu de faire planter toute l'application.
    localStorage.removeItem(key);
    return defaultValue;
  }
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Mélange un tableau (algorithme de Fisher-Yates) et renvoie une COPIE.
export const shuffle = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const startTimer = (duration, onTick, onComplete) => {
  let timeLeft = duration;
  const timerId = setInterval(() => {
    timeLeft--;
    onTick(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerId);
      onComplete();
    }
  }, 1000);
  return timerId;
};
