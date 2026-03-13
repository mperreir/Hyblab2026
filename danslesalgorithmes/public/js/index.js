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
      // 1. Cadre actif
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
      
      if (hackerScene && response.element.closest('.scene') === hackerScene) {
          const hackerAnim = document.getElementById('hacker-animation');
          const sceneSteps = Array.from(hackerScene.querySelectorAll('.step'));
          const currentIndex = sceneSteps.indexOf(response.element);
          
          const triggerIndex = sceneSteps.findIndex(s => s.classList.contains('step-anon-trigger'));
          const endIndex = sceneSteps.findIndex(s => s.classList.contains('step-hacker-end'));
          const photoIndex = sceneSteps.findIndex(s => s.classList.contains('step-marion-photos'));

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
          else if (currentIndex >= endIndex && currentIndex < photoIndex) {
              // Étape C : "Écoutons un témoignage" -> La vidéo s'allume !
              hackerAnim.classList.add('is-hacked');
              hackerAnim.classList.add('is-scrolling-up');
              if(bgVideo) bgVideo.style.opacity = '1';
          }
          else if (currentIndex >= photoIndex) {
              // Étape D : Arrivée sur les photos et suite -> La vidéo s'éteint !
              hackerAnim.classList.add('is-hacked');
              hackerAnim.classList.add('is-scrolling-up');
              if(bgVideo) bgVideo.style.opacity = '0';
          }
      } else {
          // Si on quitte complètement la scène 3, on s'assure de cacher la vidéo
          if(bgVideo) bgVideo.style.opacity = '0';
      }

      // 3.5 --- LOGIQUE POUR L'ANIMATION CIBLE ET FLÉCHETTE ---
      const targetScene = document.querySelector('#target-animation')?.closest('.scene');
      
      if (targetScene && response.element.closest('.scene') === targetScene) {
          const targetAnim = document.getElementById('target-animation');
          const sceneSteps = Array.from(targetScene.querySelectorAll('.step'));
          const currentIndex = sceneSteps.indexOf(response.element);
          
          const showFemmeIndex = sceneSteps.findIndex(s => s.classList.contains('step-femme-show'));
          const hitFlechetteIndex = sceneSteps.findIndex(s => s.classList.contains('step-flechette-hit'));

          if (currentIndex < showFemmeIndex) {
              // Avant le texte sur les critères : tout est caché
              targetAnim.classList.remove('is-visible');
              targetAnim.classList.remove('is-hit');
          } 
          else if (currentIndex >= showFemmeIndex && currentIndex < hitFlechetteIndex) {
              // Pendant le texte sur les critères : la femme apparaît
              targetAnim.classList.add('is-visible');
              targetAnim.classList.remove('is-hit');
          } 
          else if (currentIndex >= hitFlechetteIndex) {
              // "La conséquence..." : la fléchette frappe !
              targetAnim.classList.add('is-visible');
              targetAnim.classList.add('is-hit');
          }
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


      // 6. --- Animation argent ---
      if (response.element.classList.contains("step-argent-trigger")) {
        document.getElementById("animation-argent").classList.add("visible");
      }

    });

  window.addEventListener("resize", scroller.resize);

  // ==========================================
  // 2. GESTION DES QUIZ
  // ==========================================

  // --- Quizz 1 ---
  function setupFlipQuiz(quizId) {
    const quiz = document.querySelector(quizId);
    if (!quiz) return;

    const buttons = quiz.querySelectorAll('.option-btn');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const isOpen = button.classList.contains('is-flipped');

        // reset all buttons in this quiz
        buttons.forEach(btn => {
          btn.textContent = btn.dataset.originalText;
          btn.classList.remove('is-flipped', 'is-correct', 'is-wrong');
        });

        // if clicked button was already open, just close it
        if (isOpen) return;

        // otherwise open it
        button.textContent = button.dataset.answer;
        button.classList.add('is-flipped');

        if (button.dataset.correct === 'true') {
          button.classList.add('is-correct');
        } else {
          button.classList.add('is-wrong');
        }
      });
    });
  }

  setupFlipQuiz('#quiz-1');

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