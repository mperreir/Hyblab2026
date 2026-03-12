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
      offset: 0.5, 
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
          console.warn("Son bloqué :", erreur);
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
      button.style.backgroundColor = '#5bc0de'; 
    }
  }

  function validateQuiz2() {
    const selectedOptions = document.querySelectorAll('#quiz-2 .option-btn.selected');
    const allCorrectOptions = document.querySelectorAll('#quiz-2 .option-btn[data-correct="true"]');

    quiz2.options.forEach(button => {
      button.disabled = true;
      if (button.dataset.correct === 'true') {
        button.style.backgroundColor = '#5cb85c'; 
      } else if (button.classList.contains('selected')) {
        button.style.backgroundColor = '#d9534f'; 
      }
    });

    let allCorrectSelected = true;
    allCorrectOptions.forEach(option => {
      if (!option.classList.contains('selected')) {
        allCorrectSelected = false;
      }
    });

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