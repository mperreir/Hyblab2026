const figure = document.querySelector("#background-figure");
const videoElement = figure.querySelector("video"); // NOUVEAU : On cible la vidéo
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

    // 2. NOUVEAU : Gérer le changement d'image OU de vidéo
    const newImage = response.element.getAttribute('data-image');
    const newVideo = response.element.getAttribute('data-video');

    if (newVideo) {
        // C'est une étape avec vidéo
        if (videoElement.getAttribute('src') !== newVideo) {
            videoElement.setAttribute('src', newVideo);
        }
        videoElement.classList.add('is-visible'); // Apparition en fondu
        videoElement.play();
    } else {
        // C'est une étape avec image
        videoElement.classList.remove('is-visible'); // Disparition en fondu
        
        // On change l'image de fond en dessous
        if (newImage) {
            figure.style.backgroundImage = `url('${newImage}')`;
        }

        // On met la vidéo en pause avec un petit délai pour la laisser disparaître
        setTimeout(() => videoElement.pause(), 500);
    }

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

// Recalculer les positions si on redimensionne la fenêtre
window.addEventListener("resize", scroller.resize);