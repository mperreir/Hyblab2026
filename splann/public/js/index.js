"use strict";

(async () => {
  // 1. On crée le contenu (slides bleues)
  await createEmptyContent();

  // 2. On initialise Swiper
  const swiper = new Swiper("#mySwiper", {
    direction: "horizontal",
    mousewheel: true,
    speed: 600,
  });

  // 3. LA TRICHE : On définit manuellement le nombre de slides par volet
  // Intro (Titre + Chapeau) = 2
  // Enquête (Contenu généré) = 7 (C'est le nombre de bullets dans ton JSON)
  // Fin (Plus d'enquêtes + Crédits) = 2
  const structureManuelle = [
    { name: "Intro", slides: 2 }, 
    { name: "Enquête", slides: 7 }, 
    { name: "Fin", slides: 2 }
  ];

  // 4. La fonction qui dessine la barre (Adaptée de ton test2_segmentation)
  function dessinerLaBarre() {
    const navContainer = document.getElementById('navBar');
    if (!navContainer) return;

    navContainer.innerHTML = ''; // On vide
    let indexActuel = swiper.activeIndex;
    let cumul = 0;

    structureManuelle.forEach(volet => {
      const voletDiv = document.createElement('div');
      voletDiv.className = 'volet';
      
      const debut = cumul;
      const fin = cumul + volet.slides - 1;

      // État : Déjà passé
      if (indexActuel > fin) {
        voletDiv.classList.add('parcouru');
      } 
      // État : On est dedans
      else if (indexActuel >= debut && indexActuel <= fin) {
        voletDiv.classList.add('active');
        for (let i = 0; i < volet.slides; i++) {
          const dot = document.createElement('div');
          dot.className = 'inner-dot';
          // On allume le point si on l'a passé
          if (debut + i <= indexActuel) dot.classList.add('active');
          // Le dernier point est un triangle
          if (i === volet.slides - 1) dot.classList.add('is-last');
          voletDiv.appendChild(dot);
        }
      }

      // Si on clique sur l'ovale, on va au début du volet
      voletDiv.onclick = () => swiper.slideTo(debut);
      navContainer.appendChild(voletDiv);
      cumul += volet.slides;
    });
  }

  // 5. On lie la barre au mouvement du slider
  
  addExtend(swiper);
document.getElementById('btn-download').addEventListener('click', async () => {
 
  // Récupère le titre depuis le JSON
  const response = await fetch('data/contaminationMiniere.json');
  const data     = await response.json();
  const titre    = data.titreEnquete.replace(/\s+/g, '-').toLowerCase();
 
  // ── Capture une slide quelconque ────────────────────────────
  const captureSlide = async (slide, filename) => {
    const exportWidth  = 1080;
    const exportHeight = 1350;
    const scale        = exportWidth / slide.offsetWidth;
 
    // Cache les boutons de navigation
    slide.querySelectorAll('.swiper-button-next, .swiper-button-prev, .title-bar, .progress-badge').forEach(el => {
      el.style.visibility = 'hidden';
    });
 
    // Force le style des éléments surlignés
    slide.querySelectorAll('b, #titleHighlight').forEach(el => {
      el.style.backgroundImage = 'none';
      el.style.color = '#FF5262';
    });
 
    const canvas = await html2canvas(slide, {
      backgroundColor: null,
      scale:        scale,
      useCORS:      true,
      logging:      false,
      width:        slide.offsetWidth,
      height:       slide.offsetHeight,
      windowWidth:  slide.offsetWidth,
      windowHeight: slide.offsetHeight,
    });
 
    // Remet l'état original
    slide.querySelectorAll('.swiper-button-next, .swiper-button-prev, .title-bar, .progress-badge').forEach(el => {
      el.style.visibility = '';
    });
    slide.querySelectorAll('b, #titleHighlight').forEach(el => {
      el.style.backgroundImage = '';
      el.style.color = '';
    });
 
    // Canvas final centré
    const finalCanvas  = document.createElement('canvas');
    finalCanvas.width  = exportWidth;
    finalCanvas.height = exportHeight;
    const ctx          = finalCanvas.getContext('2d');
    ctx.fillStyle      = '#ffffff';
    ctx.fillRect(0, 0, exportWidth, exportHeight);
    const offsetY      = Math.floor((exportHeight - canvas.height) / 2);
    ctx.drawImage(canvas, 0, offsetY);
 
    const link    = document.createElement('a');
    link.download = filename;
    link.href     = finalCanvas.toDataURL('image/png');
    link.click();
 
    await new Promise(resolve => setTimeout(resolve, 600));
  };
 
  // ── 1. title-slide ──────────────────────────────────────────
  const titleSlide = document.querySelector('#title-slide');
  if (titleSlide) await captureSlide(titleSlide, `${titre}-cover.png`);
 
  // ── 2. title-slide-2 ────────────────────────────────────────
  const titleSlide2 = document.querySelector('#title-slide-2');
  if (titleSlide2) await captureSlide(titleSlide2, `${titre}-intro.png`);
 
  // ── 3. content-slides ───────────────────────────────────────
  const allSlides = document.querySelectorAll('#content-slide');
  for (let i = 0; i < allSlides.length; i++) {
    await captureSlide(allSlides[i], `${titre}-slide-${i + 1}.png`);
  }
 
});
 

  swiper.on("slideChange", function () {
    dessinerLaBarre(); // On redessine à chaque mouvement

    // Garde tes anciennes fonctions d'animation
    let nbSlide = swiper.slides.length;
    let index = swiper.activeIndex;
    if (index == 0) initSlide1();
    else if (index == nbSlide - 1) initSlide3();
  });



  
    // 6. Lancement initial
  dessinerLaBarre();
  addExtend(swiper);
  
    if (index == 0){
      initSlide1();
    }
    else if (index == 1){
      
    }
    else if (index == nbSlide-1){
      initSlide3();
    }
    else{
      initContentSlide(index)
    }
  });

  swiper.on('slideChange', function () {
  document.querySelectorAll('#instagram-content > p > b').forEach(el => {
    el.style.animation = 'none';
    void el.offsetWidth; // force reflow
    el.style.animation = '';
  });
  
  document.querySelectorAll('#titleHighlight').forEach(el => {
    el.style.animation = 'none';
    void el.offsetWidth; // force reflow
    el.style.animation = '';
  });
});


  // Wait for the content to preload and display 1st slide
  // Here we simulate a loading time of one second
  setTimeout(() => { 
    anime({
      targets: '#loader',
      opacity: '0',
      'z-index' : -1,
      easing: 'easeOutQuad',
    });
    initSlide1();
  }, 1000);
})();