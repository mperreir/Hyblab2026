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
      offset: 0.5, 
      debug: false
    })
    .onStepEnter((response) => {
      // 1. Cadre jaune actif
      steps.forEach(step => step.classList.remove('is-active'));
      response.element.classList.add('is-active');

      // 2. --- TRANSITION FLÈCHE -> FOND UNI (SCÈNE 2) ---
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

      // 3. --- LOGIQUE INTELLIGENTE POUR HACKER ET VIDÉO (SCÈNE 3) ---
      const hackerScene = document.querySelector('#hacker-animation')?.closest('.scene');
      const bgVideo = document.getElementById('temoignage-video');
      
      // On vérifie si l'utilisateur est en train de scroller DANS la scène 3
      if (hackerScene && response.element.closest('.scene') === hackerScene) {
          const hackerAnim = document.getElementById('hacker-animation');
          const sceneSteps = Array.from(hackerScene.querySelectorAll('.step'));
          const currentIndex = sceneSteps.indexOf(response.element);
          
          // On repère où se trouvent les déclencheurs clés
          const triggerIndex = sceneSteps.findIndex(s => s.classList.contains('step-anon-trigger'));
          const endIndex = sceneSteps.findIndex(s => s.classList.contains('step-hacker-end'));

          if (currentIndex < triggerIndex) {
              // Étape A : Avant l'animation (Tout est caché)
              hackerAnim.classList.remove('is-hacked');
              hackerAnim.classList.remove('is-scrolling-up');
              if(bgVideo) bgVideo.style.opacity = '0';
          } 
          else if (currentIndex >= triggerIndex && currentIndex < endIndex) {
              // Étape B : Le masque Anonymous se superpose (Vidéo cachée)
              hackerAnim.classList.add('is-hacked');
              hackerAnim.classList.remove('is-scrolling-up');
              if(bgVideo) bgVideo.style.opacity = '0';
          } 
          else if (currentIndex >= endIndex) {
              // Étape C : "Écoutons un témoignage" ET TOUT CE QUI SUIT. 
              // Les images restent bloquées en haut, la vidéo reste allumée !
              hackerAnim.classList.add('is-hacked');
              hackerAnim.classList.add('is-scrolling-up');
              if(bgVideo) bgVideo.style.opacity = '1';
          }
      } else {
          // Si on quitte complètement la scène 3, on s'assure de cacher la vidéo
          if(bgVideo) bgVideo.style.opacity = '0';
      }

      // 4. --- LOGIQUE POUR LES SPHÈRES ANIMÉES ---
      const spheresAnim = document.getElementById('spheres-animation');
      if (response.element.classList.contains('step-meres')) {
          if (spheresAnim) spheresAnim.classList.add('is-transformed');
      } else if (response.element.classList.contains('step-caf')) {
          if (spheresAnim) spheresAnim.classList.remove('is-transformed');
      }

      // 5. --- LOGIQUE POUR L'AUDIO ---
      const newAudioFile = response.element.querySelector(".step-content")?.getAttribute("data-audio");
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
  let selectedButtonQuiz3 = null;
  const quiz3 = {
    options: document.querySelectorAll('#quiz-3 .option-btn'),
    feedback: document.getElementById('feedback-3'),
  };

  function handleQuiz3(selectedButton) {
    if (selectedButtonQuiz3 !== null) {
      selectedButtonQuiz3.style.backgroundColor = '#fafafa';
    }
    const isCorrect = selectedButton.dataset.correct === 'true';
    selectedButton.style.backgroundColor = isCorrect ? '#5cb85c' : '#fcf075';
    selectedButtonQuiz3 = selectedButton;
    
    if(quiz3.feedback) {
        quiz3.feedback.textContent = "Toutes les propositions mènent à une situation irrégulière.";
        quiz3.feedback.style.color = '#f63b32';
    }
  }

  document.querySelectorAll('#quiz-3 .option-btn').forEach(button => {
    button.addEventListener('click', function() {
      handleQuiz3(this);
    });
  });

  // --- Quizz Chapitre 4 ---
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
          if(targetAnswer) targetAnswer.classList.add("active");
          button.classList.add("selected");
      });
  });

});