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