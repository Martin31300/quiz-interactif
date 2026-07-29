// theme.js
// Mode sombre (Sprint 2) : bascule le thème clair/sombre, mémorise la
// préférence dans le localStorage et affiche un libellé traduit.
import { loadFromLocalStorage, saveToLocalStorage } from "./utils.js";
import { t } from "./i18n.js";

const DARK_KEY = "darkMode";
let toggleRef = null;

// Met à jour le libellé du bouton selon l'état sombre et la langue.
const render = () => {
  if (!toggleRef) return;
  const isDark = document.body.classList.contains("dark-mode");
  toggleRef.textContent = isDark ? t("darkOff") : t("darkOn");
  toggleRef.setAttribute("aria-pressed", String(isDark));
};

// Initialise le mode sombre : restaure la préférence puis branche le bouton.
export const initDarkMode = (toggleBtn) => {
  toggleRef = toggleBtn;
  document.body.classList.toggle(
    "dark-mode",
    loadFromLocalStorage(DARK_KEY, false)
  );
  render();

  toggleBtn.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");
    document.body.classList.toggle("dark-mode", isDark);
    saveToLocalStorage(DARK_KEY, isDark);
    render();
  });
};

// Rafraîchit le libellé du bouton (après un changement de langue).
export const refreshDarkModeLabel = () => render();
