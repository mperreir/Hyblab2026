const figure = document.querySelector("#background-figure");
const steps = document.querySelectorAll(".step");
const scroller = scrollama();

// Variable pour stocker le son en cours de lecture
let currentAudio = null;

// Afficher la première image au chargement
figure.style.backgroundImage = `url('${steps[0].getAttribute('data-image')}')`;

scroller
  .setup({
    step: "#scrolly article .step",
    offset: 0.5,
    debug: false
  })
  .onStepEnter((response) => {
    // 1. Gérer le style actif
    steps.forEach(step => step.classList.remove('is-active'));
    response.element.classList.add('is-active');

    // 2. Gérer le changement d'image
    const newImage = response.element.getAttribute('data-image');
    figure.style.backgroundImage = `url('${newImage}')`;

    // 3. Gérer l'audio
    const newAudioFile = response.element.getAttribute('data-audio');

    // Si un son joue déjà, on l'arrête
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0; // Remet le son à zéro
      currentAudio = null;
    }

    // S'il y a un son prévu pour cette étape, on le lance
    if (newAudioFile) {
      currentAudio = new Audio(newAudioFile);
      // Le bloc .catch() évite que la page plante si le navigateur bloque l'audio
      currentAudio.play().catch(erreur => {
        console.warn("Le navigateur a bloqué la lecture automatique du son :", erreur);
      });
    }
  });