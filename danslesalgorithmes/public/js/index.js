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

      // 3. --- LOGIQUE INTELLIGENTE POUR HACKER ET VIDÉO (SCÈNE 3) ---
      const hackerScene = document.querySelector('#hacker-animation')?.closest('.scene');
      
      if (hackerScene && response.element.closest('.scene') === hackerScene) {
          const hackerAnim = document.getElementById('hacker-animation');
          const sceneSteps = Array.from(hackerScene.querySelectorAll('.step'));
          const currentIndex = sceneSteps.indexOf(response.element);
          
          const triggerIndex = sceneSteps.findIndex(s => s.classList.contains('step-anon-trigger'));
          const endIndex = sceneSteps.findIndex(s => s.classList.contains('step-hacker-end'));
          const photoIndex = sceneSteps.findIndex(s => s.classList.contains('step-marion-photos'));

          if (currentIndex < triggerIndex) {
              hackerAnim.classList.remove('is-hacked');
              hackerAnim.classList.remove('is-scrolling-up');
          } 
          else if (currentIndex >= triggerIndex && currentIndex < endIndex) {
              hackerAnim.classList.add('is-hacked');
              hackerAnim.classList.remove('is-scrolling-up');
          } 
          else if (currentIndex >= endIndex && currentIndex < photoIndex) {
              hackerAnim.classList.add('is-hacked');
              hackerAnim.classList.add('is-scrolling-up');
          }
          else if (currentIndex >= photoIndex) {
              hackerAnim.classList.add('is-hacked');
              hackerAnim.classList.add('is-scrolling-up');
          }
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
              targetAnim.classList.remove('is-visible');
              targetAnim.classList.remove('is-hit');
          } 
          else if (currentIndex >= showFemmeIndex && currentIndex < hitFlechetteIndex) {
              targetAnim.classList.add('is-visible');
              targetAnim.classList.remove('is-hit');
          } 
          else if (currentIndex >= hitFlechetteIndex) {
              targetAnim.classList.add('is-visible');
              targetAnim.classList.add('is-hit');
          }
      }

      // 4. --- LOGIQUE POUR LES SPHÈRES ANIMÉES ---
      const spheresAnim = document.getElementById('spheres-animation');
      
      if (spheresAnim) {
          if (response.element.classList.contains('step-caf')) {
              spheresAnim.classList.add('is-visible');
              spheresAnim.classList.remove('is-transformed', 'is-step3');
          } else if (response.element.classList.contains('step-meres')) {
              spheresAnim.classList.add('is-visible', 'is-transformed');
              spheresAnim.classList.remove('is-step3');
          } else if (response.element.classList.contains('step-bulle3')) {
              spheresAnim.classList.add('is-visible', 'is-step3');
              spheresAnim.classList.remove('is-transformed');
          } else {
              spheresAnim.classList.remove('is-visible', 'is-transformed', 'is-step3');
          }
      }

      // 5. --- LOGIQUE POUR L'AUDIO ET LA VIDÉO SYNCHRONISÉS ---
      
      // A. On coupe et on remet à zéro TOUTES les vidéos de la page quand on scrolle
      document.querySelectorAll('video').forEach(vid => {
          vid.pause();
          vid.currentTime = 0; 
      });

      // B. Gestion de l'audio
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

      // C. Lancement de la vidéo synchronisée pour CETTE étape
      const stepVideo = response.element.querySelector("video");
      if (stepVideo) {
          stepVideo.currentTime = 0; // On remet la vidéo à zéro
          stepVideo.play().catch(erreur => {
              console.warn("Vidéo bloquée :", erreur);
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

        if (isOpen) return;

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
  function setupValidateQuiz(quizId, successMessage, errorMessage = successMessage) {
    const quiz = document.querySelector(quizId);
    if (!quiz) return;

    const options = quiz.querySelectorAll('.option-btn');
    const feedback = quiz.querySelector('.feedback');
    const validateButton = quiz.querySelector('.validate-btn');

    function toggleSelection(button) {
      if (button.disabled) return;
      button.classList.toggle('selected');
    }

    function validateQuiz() {
      const selectedOptions = quiz.querySelectorAll('.option-btn.selected');
      const allCorrectOptions = quiz.querySelectorAll('.option-btn[data-correct="true"]');

      options.forEach(button => {
        button.disabled = true;

        if (button.dataset.correct === 'true') {
          button.classList.add('is-correct');
        } else {
          button.classList.add('is-wrong');
        }
      });

      let allCorrectSelected = true;

      allCorrectOptions.forEach(option => {
        if (!option.classList.contains('selected')) {
          allCorrectSelected = false;
        }
      });

      if (feedback) {
        if (allCorrectSelected && selectedOptions.length === allCorrectOptions.length) {
          feedback.textContent = successMessage;
          feedback.classList.add('is-success');
          feedback.classList.remove('is-error');
        } else {
          feedback.textContent = errorMessage;
          feedback.classList.add('is-success');
          feedback.classList.remove('is-error');
        }

        feedback.classList.add('visible');
      }
    }

    options.forEach(button => {
      button.addEventListener('click', () => toggleSelection(button));
    });

    if (validateButton) {
      validateButton.addEventListener('click', validateQuiz);
    }
  }

  setupValidateQuiz(
    '#quiz-2',
    "Et bien cela peut-être l'une des trois raisons."
  );

  // --- Quizz 3 ---
  setupValidateQuiz(
    '#quiz-3',
    "Toutes les propositions mènent à une situation irrégulière."
  );

  // --- Quizz 4 ---
  setupFlipQuiz('#quiz-4');

});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.image-side').forEach(el => observer.observe(el));

const loupeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                document.getElementById('loupe').classList.add('loupe-moved');
            }, 500); 
            loupeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const loupeElement = document.getElementById('box-loupe');
if (loupeElement) {
    loupeObserver.observe(loupeElement);
}