document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // 1. SCROLLAMA ET ANIMATION DES SPHÈRES
  // ==========================================
  const steps = document.querySelectorAll(".step");
  const scroller = scrollama();
  let currentAudio = null;


  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.5, // Déclenchement au milieu de l'écran du téléphone
      debug: false
    })
    .onStepEnter((response) => {
      // Cadre jaune
      steps.forEach(step => step.classList.remove('is-active'));
      response.element.classList.add('is-active');

      // Animation des sphères
      const spheresAnim = document.getElementById('spheres-animation');
      if (response.element.classList.contains('step-meres')) {
          if (spheresAnim) spheresAnim.classList.add('is-transformed');
      } else if (response.element.classList.contains('step-caf')) {
          if (spheresAnim) spheresAnim.classList.remove('is-transformed');
      }

      // Audio
      const newAudioFile = response.element.querySelector(".step-content")?.getAttribute("data-audio");
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; 
        currentAudio = null;
      }
      if (newAudioFile) {
        console.log("aaa")
        currentAudio = new Audio(newAudioFile);
        currentAudio.play().catch(erreur => {
          console.warn("Son bloqué (interaction requise sur mobile) :", erreur);
        });
      }
    });

  window.addEventListener("resize", scroller.resize);

  // ==========================================
  // 2. GESTION DES QUIZ
  // ==========================================

  // --- Quizz 1 ---
  const quiz1 = {
    options: document.querySelectorAll('#quiz-1 .option-btn'),
  };

// Variable globale pour suivre le bouton sélectionné
let selectedButtonQuiz1 = null;

// Fonction pour gérer le quiz 1
function handleQuiz1(selectedButton) {
  // Réinitialise le bouton précédemment sélectionné (s'il y en a un)
  if (selectedButtonQuiz1 !== null) {
    selectedButtonQuiz1.textContent = selectedButtonQuiz1.dataset.originalText;
    selectedButtonQuiz1.style.backgroundColor = '#fafafa';
  }

  // Gère la réponse sélectionnée
  const isCorrect = selectedButton.dataset.correct === 'true';
  selectedButton.textContent = isCorrect ? 'Effectivement' : 'Et non';
  selectedButton.style.backgroundColor = isCorrect ? '#5cb85c' : '#d9534f';

  // Met à jour la variable globale
  selectedButtonQuiz1 = selectedButton;
}

// Attache les écouteurs d'événements UNE SEULE FOIS (en dehors de la fonction)
document.querySelectorAll('#quiz-1 .option-btn').forEach(button => {
  button.addEventListener('click', function() {
    handleQuiz1(this);
  });
});


  // --- Quizz 2 ---
  const quiz2 = {
    options: document.querySelectorAll('#quiz-2 .option-btn'),
    feedback: document.getElementById('feedback-2'),
    validateButton: document.getElementById('validate-btn-2'),
  };

  function toggleSelection(button) {
    if (button.classList.contains('selected')) {
      button.classList.remove('selected');
      button.style.backgroundColor = '#4CAF50';
    } else {
      button.classList.add('selected');
      button.style.backgroundColor = '#5bc0de'; // Bleu clair pour les réponses sélectionnées
    }
  }

  function validateQuiz2() {
    const selectedOptions = document.querySelectorAll('#quiz-2 .option-btn.selected');
    const allCorrectOptions = document.querySelectorAll('#quiz-2 .option-btn[data-correct="true"]');

    // Désactive tous les boutons
    quiz2.options.forEach(button => {
      button.disabled = true;
      if (button.dataset.correct === 'true') {
        button.style.backgroundColor = '#5cb85c'; // Vert pour les bonnes réponses
      } else if (button.classList.contains('selected')) {
        button.style.backgroundColor = '#d9534f'; // Rouge pour les mauvaises réponses sélectionnées
      }
    });

    // Vérifie si toutes les bonnes réponses ont été sélectionnées
    let allCorrectSelected = true;
    allCorrectOptions.forEach(option => {
      if (!option.classList.contains('selected')) {
        allCorrectSelected = false;
      }
    });

    // Affiche le feedback
    if (allCorrectSelected && selectedOptions.length === allCorrectOptions.length) {
      quiz2.feedback.textContent = "Parfait ! Toutes les réponses sélectionnées sont correctes.";
      quiz2.feedback.style.color = '#5cb85c';
    } else {
      quiz2.feedback.textContent = "Toutes les propositions étaient correctes.";
      quiz2.feedback.style.color = '#5cb85c';
    } 
  }

  quiz2.options.forEach(button => {
    button.addEventListener('click', () => toggleSelection(button));
  });
  if(quiz2.validateButton) quiz2.validateButton.addEventListener('click', validateQuiz2);

  // --- Quizz 3 ---
  // Fonction pour gérer le Quizz 3 (sélection simple, pas de feedback correct/incorrect nécessaire)
  let selectedButtonQuiz3 = null;
  const quiz3 = {
    options: document.querySelectorAll('#quiz-3 .option-btn'),
    feedback: document.getElementById('feedback-3'),
    validateButton: document.getElementById('validate-btn-3'),
  };

// Fonction pour gérer le quiz 3
function handleQuiz3(selectedButton) {
  // Réinitialise le bouton précédemment sélectionné (s'il y en a un)
  if (selectedButtonQuiz3 !== null) {
    selectedButtonQuiz3.style.backgroundColor = '#fafafa';
  }

  // Gère la réponse sélectionnée
  const isCorrect = selectedButton.dataset.correct === 'true';
  selectedButton.style.backgroundColor = isCorrect ? '#5cb85c' : '#fcf075';

  // Met à jour la variable globale
  selectedButtonQuiz3 = selectedButton;
  quiz3.feedback.textContent = "Toutes les propositions mènent à une situation irrégulière.";
  quiz3.feedback.style.color = '#f63b32'

}

// Attache les écouteurs d'événements UNE SEULE FOIS (en dehors de la fonction)
document.querySelectorAll('#quiz-3 .option-btn').forEach(button => {
  button.addEventListener('click', function() {
    handleQuiz3(this);
  });
});

  // --- Quizz Chapitre 4 (Boutons avec paragraphes cachés) ---
  const quizChap4Buttons = document.querySelectorAll('.chap4-btn');
  
quizChap4Buttons.forEach(button => {
      button.addEventListener('click', () => {
          const quizContainer = button.closest('.quiz-container');
          const answers = quizContainer.querySelectorAll('.quiz-answer');
          const buttons = quizContainer.querySelectorAll(".chap4-btn");
          const targetId = button.getAttribute('data-target');
          const targetAnswer = quizContainer.querySelector('#' + targetId);

          // hide answers
          answers.forEach(answer => answer.classList.remove('active'));

          // remove button highlight
          buttons.forEach(btn => btn.classList.remove("selected"));

          // show selected answer
          targetAnswer.classList.add("active");

          // highlight clicked button
          button.classList.add("selected");

      });
  });

});