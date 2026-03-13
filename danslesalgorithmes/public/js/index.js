document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // 1. SCROLLAMA ET ANIMATIONS
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
      // 1. Cadre jaune actif
      steps.forEach(step => step.classList.remove('is-active'));
      response.element.classList.add('is-active');

      // 2. --- LOGIQUE DE TRANSITION FLÈCHE -> FOND UNI (SCÈNE 2) ---
      const arrowImage = document.querySelector('.bg-media[style*="fleche.png"]');
      const solidBackground = document.querySelector('.bg-solid');

      if (response.element.classList.contains('step-uni') || response.element.closest('#quiz-1')) {
          if (arrowImage) arrowImage.style.opacity = '0'; 
          if (solidBackground) solidBackground.style.opacity = '1'; 
      } 
      else {
          if (arrowImage) arrowImage.style.opacity = '1'; 
          if (solidBackground) solidBackground.style.opacity = '0'; 
      }

      // 3. --- LOGIQUE POUR L'ANIMATION HACKER ET LA VIDÉO (SCÈNE 3) ---
      const hackerAnim = document.getElementById('hacker-animation');
      const bgVideo = document.getElementById('temoignage-video');
      
      if (hackerAnim) {
          // On réinitialise les classes par défaut à chaque étape
          hackerAnim.classList.remove('is-hacked');
          hackerAnim.classList.remove('is-scrolling-up');

          // Étape A : Le masque Anonymous se superpose (Vidéo cachée)
          if (response.element.classList.contains('step-anon-trigger') || response.element.classList.contains('step-hacker-start')) {
              hackerAnim.classList.add('is-hacked');
              if(bgVideo) bgVideo.style.opacity = '0';
          } 
          // Étape B : Les images remontent avec "Écoutons un témoignage" (Vidéo toujours cachée)
          else if (response.element.classList.contains('step-hacker-end')) {
              hackerAnim.classList.add('is-hacked');
              hackerAnim.classList.add('is-scrolling-up');
              if(bgVideo) bgVideo.style.opacity = '0';
          }
          // Étape C : Le témoignage commence (LA VIDÉO APPARAÎT EN FONDU !)
          else if (response.element.classList.contains('step-testimony')) {
              hackerAnim.classList.add('is-hacked');
              hackerAnim.classList.add('is-scrolling-up');
              if(bgVideo) bgVideo.style.opacity = '1';
          }
          // Reset si on remonte avant le trigger
          else {
              if(bgVideo) bgVideo.style.opacity = '0';
          }
      }

      // 4. --- LOGIQUE POUR LES SPHÈRES ANIMÉES (SCÈNE 7) ---
      const spheresAnim = document.getElementById('spheres-animation');
      if (response.element.classList.contains('step-meres')) {
          if (spheresAnim) spheresAnim.classList.add('is-transformed');
      } else if (response.element.classList.contains('step-caf')) {
          if (spheresAnim) spheresAnim.classList.remove('is-transformed');
      }

      // 5. --- LOGIQUE POUR L'AUDIO ---
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

  let selectedButtonQuiz1 = null;

  function handleQuiz1(selectedButton) {
    if (selectedButtonQuiz1 !== null) {
      selectedButtonQuiz1.textContent = selectedButtonQuiz1.dataset.originalText;
      selectedButtonQuiz1.style.backgroundColor = '#fafafa';
    }

    const isCorrect = selectedButton.dataset.correct === 'true';
    selectedButton.textContent = isCorrect ? 'Effectivement' : 'Et non';
    selectedButton.style.backgroundColor = isCorrect ? '#5cb85c' : '#d9534f';

    selectedButtonQuiz1 = selectedButton;
  }

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

  // --- Quizz 3 ---
  function handleQuiz3(selectedButton) {
    const quizStep = selectedButton.closest('.quiz-container');
    const allOptions = quizStep.querySelectorAll('.option-btn');
    
    allOptions.forEach(button => {
      button.disabled = true;
    });
    selectedButton.style.backgroundColor = '#f0ad4e'; 
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
          const buttons = quizContainer.querySelectorAll(".chap4-btn");
          const targetId = button.getAttribute('data-target');
          const targetAnswer = quizContainer.querySelector('#' + targetId);

          answers.forEach(answer => answer.classList.remove('active'));
          buttons.forEach(btn => btn.classList.remove("selected"));
          targetAnswer.classList.add("active");
          button.classList.add("selected");
      });
  });

});