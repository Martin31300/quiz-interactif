// data.js
// Banque de questions organisée par thème (Sprint 2 : mode multi-thème).
// Chaque thème possède un libellé et son propre tableau de questions.
export const quizData = {
  culture: {
    label: "🌍 Culture générale",
    questions: [
      {
        text: "Quelle est la capitale de la France ?",
        answers: ["Marseille", "Paris", "Lyon", "Bordeaux"],
        correct: 1,
        timeLimit: 10,
      },
      {
        text: "Quel est le plus grand océan du monde ?",
        answers: ["Atlantique", "Indien", "Arctique", "Pacifique"],
        correct: 3,
        timeLimit: 10,
      },
      {
        text: "Qui a peint la Joconde ?",
        answers: ["Van Gogh", "Picasso", "Léonard de Vinci", "Monet"],
        correct: 2,
        timeLimit: 10,
      },
      {
        text: "Quelle planète est la plus proche du Soleil ?",
        answers: ["Vénus", "Mars", "Mercure", "Terre"],
        correct: 2,
        timeLimit: 10,
      },
      {
        text: "En quelle année a eu lieu la Révolution française ?",
        answers: ["1789", "1815", "1492", "1968"],
        correct: 0,
        timeLimit: 10,
      },
    ],
  },

  maths: {
    label: "➗ Maths",
    questions: [
      {
        text: "Combien font 2 + 3 ?",
        answers: ["3", "4", "5", "1"],
        correct: 2,
        timeLimit: 8,
      },
      {
        text: "Combien de degrés dans un triangle ?",
        answers: ["90°", "180°", "270°", "360°"],
        correct: 1,
        timeLimit: 8,
      },
      {
        text: "Combien font 7 × 8 ?",
        answers: ["54", "56", "64", "48"],
        correct: 1,
        timeLimit: 8,
      },
      {
        text: "Quelle est la racine carrée de 81 ?",
        answers: ["7", "8", "9", "11"],
        correct: 2,
        timeLimit: 8,
      },
      {
        text: "Quel est le résultat de 15 % de 200 ?",
        answers: ["20", "25", "30", "35"],
        correct: 2,
        timeLimit: 10,
      },
    ],
  },

  web: {
    label: "💻 Web & Info",
    questions: [
      {
        text: "Quel langage structure une page web ?",
        answers: ["Python", "HTML", "C++", "SQL"],
        correct: 1,
        timeLimit: 10,
      },
      {
        text: "Que signifie CSS ?",
        answers: [
          "Cascading Style Sheets",
          "Computer Style System",
          "Creative Style Sheets",
          "Colorful Style Syntax",
        ],
        correct: 0,
        timeLimit: 10,
      },
      {
        text: "Où stocke-t-on des données côté navigateur (persistant) ?",
        answers: ["cookies uniquement", "localStorage", "RAM", "cache CPU"],
        correct: 1,
        timeLimit: 10,
      },
      {
        text: "Quel symbole lance un commentaire sur une ligne en JS ?",
        answers: ["#", "//", "<!--", "%%"],
        correct: 1,
        timeLimit: 8,
      },
      {
        text: "Quelle méthode ajoute un écouteur d'événement en JS ?",
        answers: ["addListener()", "on()", "addEventListener()", "listen()"],
        correct: 2,
        timeLimit: 10,
      },
    ],
  },
};
