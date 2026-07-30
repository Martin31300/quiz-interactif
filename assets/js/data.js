// data.js
// Banque de questions par thème (Sprint 2). Les textes sont bilingues :
// `text`, `answers` et `hint` sont des objets { fr, en }. Les champs
// indépendants de la langue (`correct`, `difficulty`, `timeLimit`) sont
// communs — l'index de la bonne réponse est le même dans les deux langues.
export const quizData = {
  culture: {
    label: { fr: "🌍 Culture générale", en: "🌍 General knowledge" },
    questions: [
      {
        text: {
          fr: "Quelle est la capitale de la France ?",
          en: "What is the capital of France?",
        },
        answers: {
          fr: ["Marseille", "Paris", "Lyon", "Bordeaux"],
          en: ["Marseille", "Paris", "Lyon", "Bordeaux"],
        },
        correct: 1,
        difficulty: 1,
        timeLimit: 12,
      },
      {
        text: {
          fr: "Quel est le plus grand océan du monde ?",
          en: "What is the largest ocean in the world?",
        },
        answers: {
          fr: ["Atlantique", "Indien", "Arctique", "Pacifique"],
          en: ["Atlantic", "Indian", "Arctic", "Pacific"],
        },
        correct: 3,
        difficulty: 1,
        timeLimit: 12,
      },
      {
        text: {
          fr: "Qui a peint la Joconde ?",
          en: "Who painted the Mona Lisa?",
        },
        answers: {
          fr: ["Van Gogh", "Picasso", "Léonard de Vinci", "Monet"],
          en: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Monet"],
        },
        correct: 2,
        difficulty: 2,
        timeLimit: 9,
        hint: {
          fr: "Un génie de la Renaissance italienne, aussi inventeur.",
          en: "An Italian Renaissance genius, also an inventor.",
        },
      },
      {
        text: {
          fr: "Quelle planète est la plus proche du Soleil ?",
          en: "Which planet is closest to the Sun?",
        },
        answers: {
          fr: ["Vénus", "Mars", "Mercure", "Terre"],
          en: ["Venus", "Mars", "Mercury", "Earth"],
        },
        correct: 2,
        difficulty: 2,
        timeLimit: 9,
        hint: {
          fr: "Elle porte le nom du messager des dieux romains.",
          en: "It is named after the messenger of the Roman gods.",
        },
      },
      {
        text: {
          fr: "Quel est le drapeau de l'Italie ?",
          en: "Which flag is Italy's?",
        },
        answers: {
          fr: ["France", "Italie", "Allemagne", "Espagne"],
          en: ["France", "Italy", "Germany", "Spain"],
        },
        // Réponses en images : tableau parallèle à answers (même ordre).
        images: [
          "../assets/img/flag-france.svg",
          "../assets/img/flag-italie.svg",
          "../assets/img/flag-allemagne.svg",
          "../assets/img/flag-espagne.svg",
        ],
        correct: 1,
        difficulty: 2,
        timeLimit: 9,
      },
      {
        text: {
          fr: "En quelle année a eu lieu la Révolution française ?",
          en: "In what year did the French Revolution take place?",
        },
        answers: {
          fr: ["1789", "1815", "1492", "1968"],
          en: ["1789", "1815", "1492", "1968"],
        },
        correct: 0,
        difficulty: 3,
        timeLimit: 6,
        hint: {
          fr: "Prise de la Bastille : fin du XVIIIe siècle.",
          en: "Storming of the Bastille: late 18th century.",
        },
      },
    ],
  },

  maths: {
    label: { fr: "➗ Maths", en: "➗ Maths" },
    questions: [
      {
        text: { fr: "Combien font 2 + 3 ?", en: "What is 2 + 3?" },
        answers: {
          fr: ["3", "4", "5", "1"],
          en: ["3", "4", "5", "1"],
        },
        correct: 2,
        difficulty: 1,
        timeLimit: 10,
      },
      {
        text: {
          fr: "Combien de degrés dans un triangle ?",
          en: "How many degrees in a triangle?",
        },
        answers: {
          fr: ["90°", "180°", "270°", "360°"],
          en: ["90°", "180°", "270°", "360°"],
        },
        correct: 1,
        difficulty: 1,
        timeLimit: 10,
      },
      {
        text: { fr: "Combien font 6 × 7 ?", en: "What is 6 × 7?" },
        answers: {
          fr: ["40", "42", "36", "48"],
          en: ["40", "42", "36", "48"],
        },
        correct: 1,
        difficulty: 1,
        timeLimit: 10,
      },
      {
        text: {
          fr: "Quelle figure possède 3 côtés ?",
          en: "Which shape has 3 sides?",
        },
        answers: {
          fr: ["Cercle", "Carré", "Triangle", "Étoile"],
          en: ["Circle", "Square", "Triangle", "Star"],
        },
        // Réponses en images : tableau parallèle à answers (même ordre).
        images: [
          "../assets/img/forme-cercle.svg",
          "../assets/img/forme-carre.svg",
          "../assets/img/forme-triangle.svg",
          "../assets/img/forme-etoile.svg",
        ],
        correct: 2,
        difficulty: 1,
        timeLimit: 10,
      },
      {
        text: { fr: "Combien font 7 × 8 ?", en: "What is 7 × 8?" },
        answers: {
          fr: ["54", "56", "64", "48"],
          en: ["54", "56", "64", "48"],
        },
        correct: 1,
        difficulty: 2,
        timeLimit: 8,
        hint: {
          fr: "C'est un nombre pair, juste au-dessus de 55.",
          en: "It's an even number, just above 55.",
        },
      },
      {
        text: {
          fr: "Quelle est la racine carrée de 81 ?",
          en: "What is the square root of 81?",
        },
        answers: {
          fr: ["7", "8", "9", "11"],
          en: ["7", "8", "9", "11"],
        },
        correct: 2,
        difficulty: 2,
        timeLimit: 8,
        hint: {
          fr: "Ce nombre au carré donne 81 (indice : 9 × 9).",
          en: "This number squared gives 81 (hint: 9 × 9).",
        },
      },
      {
        text: {
          fr: "Quel est le résultat de 15 % de 200 ?",
          en: "What is 15% of 200?",
        },
        answers: {
          fr: ["20", "25", "30", "35"],
          en: ["20", "25", "30", "35"],
        },
        correct: 2,
        difficulty: 3,
        timeLimit: 6,
        hint: {
          fr: "10 % de 200 = 20, ajoute la moitié de 20.",
          en: "10% of 200 = 20, add half of 20.",
        },
      },
    ],
  },

  web: {
    label: { fr: "💻 Web & Info", en: "💻 Web & IT" },
    questions: [
      {
        text: {
          fr: "Quel langage structure une page web ?",
          en: "Which language structures a web page?",
        },
        answers: {
          fr: ["Python", "HTML", "C++", "SQL"],
          en: ["Python", "HTML", "C++", "SQL"],
        },
        correct: 1,
        difficulty: 1,
        timeLimit: 12,
      },
      {
        text: {
          fr: "Quel symbole lance un commentaire sur une ligne en JS ?",
          en: "Which symbol starts a single-line comment in JS?",
        },
        answers: {
          fr: ["#", "//", "<!--", "%%"],
          en: ["#", "//", "<!--", "%%"],
        },
        correct: 1,
        difficulty: 1,
        timeLimit: 12,
      },
      {
        text: { fr: "Que signifie CSS ?", en: "What does CSS stand for?" },
        answers: {
          fr: [
            "Cascading Style Sheets",
            "Computer Style System",
            "Creative Style Sheets",
            "Colorful Style Syntax",
          ],
          en: [
            "Cascading Style Sheets",
            "Computer Style System",
            "Creative Style Sheets",
            "Colorful Style Syntax",
          ],
        },
        correct: 0,
        difficulty: 2,
        timeLimit: 9,
        hint: {
          fr: "« Cascading » = en cascade.",
          en: '"Cascading" means in cascade.',
        },
      },
      {
        text: {
          fr: "Où stocke-t-on des données côté navigateur (persistant) ?",
          en: "Where do you store persistent data in the browser?",
        },
        answers: {
          fr: ["cookies uniquement", "localStorage", "RAM", "cache CPU"],
          en: ["cookies only", "localStorage", "RAM", "CPU cache"],
        },
        correct: 1,
        difficulty: 2,
        timeLimit: 9,
        hint: {
          fr: "Son nom contient « storage » et commence par « local ».",
          en: 'Its name contains "storage" and starts with "local".',
        },
      },
      {
        text: {
          fr: "Quelle méthode ajoute un écouteur d'événement en JS ?",
          en: "Which method adds an event listener in JS?",
        },
        answers: {
          fr: ["addListener()", "on()", "addEventListener()", "listen()"],
          en: ["addListener()", "on()", "addEventListener()", "listen()"],
        },
        correct: 2,
        difficulty: 3,
        timeLimit: 6,
        hint: {
          fr: "Elle contient les mots « add », « Event » et « Listener ».",
          en: 'It contains the words "add", "Event" and "Listener".',
        },
      },
    ],
  },
};
