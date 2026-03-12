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
      const newAudioFile = response.element.getAttribute('data-audio');
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; 
        currentAudio = null;
      }
      if (newAudioFile) {
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

  function handleQuiz1(selectedButton) {
    const isCorrect = selectedButton.dataset.correct === 'true';
    selectedButton.textContent = isCorrect ? 'Effectivement' : 'Et non';

    quiz1.options.forEach(button => {
      button.disabled = true;
      if (button.dataset.correct === 'true') {
        button.style.backgroundColor = '#5cb85c';
      } else {
        button.style.backgroundColor = '#d9534f';
      }
    });
  }

  quiz1.options.forEach(button => {
    button.addEventListener('click', () => handleQuiz1(button));
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
  function handleQuiz3(selectedButton) {
    // Désactive tous les boutons après une première sélection
    const quizStep = selectedButton.closest('.quiz-container');
    const allOptions = quizStep.querySelectorAll('.option-btn');
    
    allOptions.forEach(button => {
      button.disabled = true;
      // Optionnel: Ajouter du style pour marquer la réponse cliquée
      // button.style.backgroundColor = '#d9534f'; 
    });
    // Marquez spécifiquement le bouton cliqué pour donner un retour visuel
    selectedButton.style.backgroundColor = '#f0ad4e'; // Orange pour le bouton sélectionné
  }

  const quiz3Options = document.querySelectorAll('#quiz-3 .option-btn');
  quiz3Options.forEach(button => {
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
          const targetId = button.getAttribute('data-target');
          const targetAnswer = quizContainer.querySelector('#' + targetId);

          answers.forEach(answer => answer.classList.remove('active'));

          if (targetAnswer) {
              targetAnswer.classList.add('active');
          }
      });
  });

});