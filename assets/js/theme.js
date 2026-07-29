// theme.js
// Mode sombre (Sprint 2) : bascule le thème clair/sombre et mémorise
// la préférence de l'utilisateur dans le localStorage.
import { loadFromLocalStorage, saveToLocalStorage } from "./utils.js";

const DARK_KEY = "darkMode";

// Applique l'état (sombre ou clair) au document et au bouton.
const applyDarkMode = (isDark, toggleBtn) => {
  document.body.classList.toggle("dark-mode", isDark);
  toggleBtn.textContent = isDark ? "☀️ Mode clair" : "🌙 Mode sombre";
  toggleBtn.setAttribute("aria-pressed", String(isDark));
};

// Initialise le mode sombre : restaure la préférence puis branche le bouton.
export const initDarkMode = (toggleBtn) => {
  applyDarkMode(loadFromLocalStorage(DARK_KEY, false), toggleBtn);

  toggleBtn.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");
    applyDarkMode(isDark, toggleBtn);
    saveToLocalStorage(DARK_KEY, isDark);
  });
};
