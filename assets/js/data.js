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
      {
        text: {
          fr: "Combien de continents y a-t-il sur Terre ?",
          en: "How many continents are there on Earth?",
        },
        answers: {
          fr: ["5", "6", "7", "8"],
          en: ["5", "6", "7", "8"],
        },
        correct: 2,
        difficulty: 1,
        timeLimit: 12,
      },
      {
        text: {
          fr: "Quel animal est surnommé le roi de la savane ?",
          en: "Which animal is called the king of the savanna?",
        },
        answers: {
          fr: ["L'éléphant", "Le lion", "Le tigre", "La girafe"],
          en: ["The elephant", "The lion", "The tiger", "The giraffe"],
        },
        correct: 1,
        difficulty: 1,
        timeLimit: 12,
      },
      {
        text: {
          fr: "Quel pays a pour capitale Tokyo ?",
          en: "Which country has Tokyo as its capital?",
        },
        answers: {
          fr: ["La Chine", "Le Japon", "La Corée du Sud", "La Thaïlande"],
          en: ["China", "Japan", "South Korea", "Thailand"],
        },
        correct: 1,
        difficulty: 2,
        timeLimit: 9,
        hint: {
          fr: "Le pays du soleil levant.",
          en: "The land of the rising sun.",
        },
      },
      {
        text: {
          fr: "Combien de joueurs d'une équipe de football sont sur le terrain ?",
          en: "How many players of a football team are on the pitch?",
        },
        answers: {
          fr: ["9", "10", "11", "12"],
          en: ["9", "10", "11", "12"],
        },
        correct: 2,
        difficulty: 2,
        timeLimit: 9,
        hint: {
          fr: "Dix joueurs de champ… plus le gardien.",
          en: "Ten outfield players… plus the goalkeeper.",
        },
      },
      {
        text: {
          fr: "Qui a écrit « Les Misérables » ?",
          en: "Who wrote “Les Misérables”?",
        },
        answers: {
          fr: ["Émile Zola", "Victor Hugo", "Molière", "Balzac"],
          en: ["Émile Zola", "Victor Hugo", "Molière", "Balzac"],
        },
        correct: 1,
        difficulty: 3,
        timeLimit: 6,
        hint: {
          fr: "Aussi l'auteur de Notre-Dame de Paris.",
          en: "Also the author of The Hunchback of Notre-Dame.",
        },
      },
      {
        text: {
          fr: "En quelle année l'Homme a-t-il marché sur la Lune ?",
          en: "In what year did humans walk on the Moon?",
        },
        answers: {
          fr: ["1959", "1965", "1969", "1972"],
          en: ["1959", "1965", "1969", "1972"],
        },
        correct: 2,
        difficulty: 3,
        timeLimit: 6,
        hint: {
          fr: "Apollo 11, à la fin des années 60.",
          en: "Apollo 11, in the late sixties.",
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
      {
        text: { fr: "Combien font 9 + 6 ?", en: "What is 9 + 6?" },
        answers: {
          fr: ["14", "15", "16", "13"],
          en: ["14", "15", "16", "13"],
        },
        correct: 1,
        difficulty: 1,
        timeLimit: 10,
      },
      {
        text: {
          fr: "Combien de minutes y a-t-il dans une heure ?",
          en: "How many minutes are there in an hour?",
        },
        answers: {
          fr: ["60", "100", "90", "30"],
          en: ["60", "100", "90", "30"],
        },
        correct: 0,
        difficulty: 1,
        timeLimit: 10,
      },
      {
        text: { fr: "Combien font 12 × 12 ?", en: "What is 12 × 12?" },
        answers: {
          fr: ["124", "144", "134", "154"],
          en: ["124", "144", "134", "154"],
        },
        correct: 1,
        difficulty: 2,
        timeLimit: 8,
        hint: {
          fr: "Une douzaine de douzaines.",
          en: "A dozen dozens.",
        },
      },
      {
        text: {
          fr: "Lequel de ces nombres est un nombre premier ?",
          en: "Which of these numbers is a prime number?",
        },
        answers: {
          fr: ["9", "15", "13", "21"],
          en: ["9", "15", "13", "21"],
        },
        correct: 2,
        difficulty: 2,
        timeLimit: 8,
        hint: {
          fr: "Il n'est divisible que par 1 et par lui-même.",
          en: "It is only divisible by 1 and itself.",
        },
      },
      {
        text: {
          fr: "Combien font 2 puissance 5 ?",
          en: "What is 2 to the power of 5?",
        },
        answers: {
          fr: ["16", "32", "64", "25"],
          en: ["16", "32", "64", "25"],
        },
        correct: 1,
        difficulty: 3,
        timeLimit: 6,
        hint: {
          fr: "2 × 2 × 2 × 2 × 2.",
          en: "2 × 2 × 2 × 2 × 2.",
        },
      },
      {
        text: {
          fr: "Quelle est la moitié de 3/4 ?",
          en: "What is half of 3/4?",
        },
        answers: {
          fr: ["1/4", "3/8", "1/2", "2/3"],
          en: ["1/4", "3/8", "1/2", "2/3"],
        },
        correct: 1,
        difficulty: 3,
        timeLimit: 6,
        hint: {
          fr: "Divise 3/4 par 2 : le dénominateur double.",
          en: "Divide 3/4 by 2: the denominator doubles.",
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
      {
        text: {
          fr: "Que signifie « www » ?",
          en: "What does “www” stand for?",
        },
        answers: {
          fr: [
            "World Wide Web",
            "Web World Wide",
            "Wide Web World",
            "World Web Wide",
          ],
          en: [
            "World Wide Web",
            "Web World Wide",
            "Wide Web World",
            "World Web Wide",
          ],
        },
        correct: 0,
        difficulty: 1,
        timeLimit: 12,
      },
      {
        text: {
          fr: "Quelle balise crée un lien en HTML ?",
          en: "Which tag creates a link in HTML?",
        },
        answers: {
          fr: ["<link>", "<a>", "<href>", "<url>"],
          en: ["<link>", "<a>", "<href>", "<url>"],
        },
        correct: 1,
        difficulty: 1,
        timeLimit: 12,
      },
      {
        text: {
          fr: "Quel protocole sécurise les échanges sur le web ?",
          en: "Which protocol secures exchanges on the web?",
        },
        answers: {
          fr: ["HTTP", "FTP", "HTTPS", "SMTP"],
          en: ["HTTP", "FTP", "HTTPS", "SMTP"],
        },
        correct: 2,
        difficulty: 2,
        timeLimit: 9,
        hint: {
          fr: "Son « S » final signifie « Secure ».",
          en: 'Its final "S" stands for "Secure".',
        },
      },
      {
        text: {
          fr: "Que renvoie typeof [] en JavaScript ?",
          en: "What does typeof [] return in JavaScript?",
        },
        answers: {
          fr: ['"array"', '"object"', '"list"', '"undefined"'],
          en: ['"array"', '"object"', '"list"', '"undefined"'],
        },
        correct: 1,
        difficulty: 2,
        timeLimit: 9,
        hint: {
          fr: "En JS, les tableaux sont un type… d'objet.",
          en: "In JS, arrays are a kind of… object.",
        },
      },
      {
        text: {
          fr: "Quelle méthode transforme un texte JSON en objet JS ?",
          en: "Which method turns JSON text into a JS object?",
        },
        answers: {
          fr: [
            "JSON.parse()",
            "JSON.stringify()",
            "JSON.toObject()",
            "JSON.decode()",
          ],
          en: [
            "JSON.parse()",
            "JSON.stringify()",
            "JSON.toObject()",
            "JSON.decode()",
          ],
        },
        correct: 0,
        difficulty: 3,
        timeLimit: 6,
        hint: {
          fr: "C'est l'inverse de stringify.",
          en: "It is the opposite of stringify.",
        },
      },
      {
        text: {
          fr: "Quel code HTTP signifie « Not Found » ?",
          en: "Which HTTP status code means “Not Found”?",
        },
        answers: {
          fr: ["200", "301", "404", "500"],
          en: ["200", "301", "404", "500"],
        },
        correct: 2,
        difficulty: 3,
        timeLimit: 6,
        hint: {
          fr: "Le plus célèbre des codes d'erreur du web.",
          en: "The most famous web error code.",
        },
      },
    ],
  },
};
