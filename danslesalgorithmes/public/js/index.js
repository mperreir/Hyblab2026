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
    // 1. Cadre jaune sur le texte actif
    steps.forEach(step => step.classList.remove('is-active'));
    response.element.classList.add('is-active');

    // 2. Animation des sphères
    const spheresAnim = document.getElementById('spheres-animation');
    
    if (response.element.classList.contains('step-meres')) {
        if (spheresAnim) spheresAnim.classList.add('is-transformed');
    } else if (response.element.classList.contains('step-caf')) {
        if (spheresAnim) spheresAnim.classList.remove('is-transformed');
    }

    // 3. Audio
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

document.addEventListener('DOMContentLoaded', function() {
  // Quizz 1 : une seule réponse correcte
  const quiz1 = {
    container: document.getElementById('quiz-1'),
    options: document.querySelectorAll('#quiz-1 .option-btn'),
    nextButton: document.getElementById('next-btn-1'),
  };

  // Quizz 2 : sélection multiple
  const quiz2 = {
    container: document.getElementById('quiz-2'),
    options: document.querySelectorAll('#quiz-2 .option-btn'),
    feedback: document.getElementById('feedback-2'),
    validateButton: document.getElementById('validate-btn-2'),
  };

  // Fonction pour gérer le Quizz 1
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

  // Fonction pour gérer la sélection des réponses dans le Quizz 2
  function toggleSelection(button) {
    if (button.classList.contains('selected')) {
      button.classList.remove('selected');
      button.style.backgroundColor = '#4CAF50';
    } else {
      button.classList.add('selected');
      button.style.backgroundColor = '#5bc0de'; // Bleu clair pour les réponses sélectionnées
    }
  }

  // Fonction pour valider les réponses du Quizz 2
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

  // Écouteurs d'événements pour le Quizz 1
  quiz1.options.forEach(button => {
    button.addEventListener('click', () => handleQuiz1(button));
  });

  // Écouteurs d'événements pour le Quizz 2
  quiz2.options.forEach(button => {
    button.addEventListener('click', () => toggleSelection(button));
  });

  quiz2.validateButton.addEventListener('click', validateQuiz2);
});