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
    // 1. Gérer le cadre jaune sur le texte
    steps.forEach(step => step.classList.remove('is-active'));
    response.element.classList.add('is-active');

    // 2. Gérer l'audio
    const newAudioFile = response.element.getAttribute('data-audio');

    // Si un son joue déjà, on l'arrête proprement
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0; 
      currentAudio = null;
    }

    // Si la nouvelle étape a un son, on le lance
    if (newAudioFile) {
      currentAudio = new Audio(newAudioFile);
      currentAudio.play().catch(erreur => {
        console.warn("Lecture du son bloquée par le navigateur :", erreur);
      });
    }
  });

window.addEventListener("resize", scroller.resize);