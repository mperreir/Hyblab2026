"use strict";
const animateSheetText = function(content) {
  const paras = content.querySelectorAll('p:not(#extended-content-title)');
  const result = Splitting({ target: paras, by: 'words' });
  const allWords = result.flatMap(r => r.words);
 
  // Garde le titre toujours visible
  const title = content.querySelector('#extended-content-title');
  if (title) title.style.opacity = '1';
 
  // ── Premier paragraphe : animation GSAP à l'ouverture ─────────
  const firstParaWords = result[0] ? result[0].words : [];
  firstParaWords.forEach(w => w.style.opacity = '0');
 
  gsap.to(firstParaWords, {
    opacity: 1,
    stagger: 0.05,
    duration: 0.3,
    ease: 'power2.out',
    delay: 0.1
  });
 
  // ── Reste du texte : contrôlé par le scroll ───────────────────
  const firstParaWordCount = firstParaWords.length;
  const restWords = allWords.slice(firstParaWordCount);
  restWords.forEach(w => w.style.opacity = '0');
 
  const updateWords = () => {
    const scrollTop    = content.scrollTop;
    const scrollHeight = content.scrollHeight;
    const clientHeight = content.clientHeight;
    const maxScroll    = scrollHeight - clientHeight;
 
    restWords.forEach((word, index) => {
      const threshold = (index / restWords.length) * maxScroll * 1; 
      word.style.opacity    = scrollTop >= threshold ? '1' : '0';
      word.style.transition = 'opacity 0.2s ease';
    });
  };
 
  content.addEventListener('scroll', updateWords);
  updateWords();
};

// async init function (because of the awaits on fetches)
const addExtend = async function(swiper){
  const sheets = document.querySelectorAll('.bottom-sheet');
  const instagramBoxs=document.querySelectorAll('#instagram-box');
  let isOpen=false;
  for(let i = 0; i < sheets.length; i++){
  let sheet = sheets[i];
  
  if (sheet.dataset.initialized) continue; 
  sheet.dataset.initialized = true;
  
  const handlebars = document.querySelectorAll('.handle-bar'); 
  const pagination = document.querySelector('.nav-bar-hierarchical');
  const contents = document.querySelectorAll('.content')
  const butts = document.querySelectorAll('.toggle-btn')
  const degrades = document.querySelectorAll("#degrade-extended")
  for(let i=0;i<sheets.length;i++){
    let sheet=sheets[i]
    let handlebar = handlebars[i]
    let content = contents[i]
    let butt = butts[i]
    let degrade = degrades[i]
    let isOpen=false;
    let isDone=false;

    let slide =sheet.parentElement
    slide.addEventListener('scroll', () => {console.log("yes")})
    //pour le téléphone portable
    sheet.addEventListener('scroll', () => {swiper.allowTouchMove = false;});
    sheet.addEventListener('scroll', () => {swiper.allowTouchMove = true;});
    content.addEventListener('scroll', () => {
      // Check if scrolled to bottom
      if (content.scrollTop + content.clientHeight >= content.scrollHeight - 10) { // 10px tolerance
        
        // Apply fade out and 180 degree rotation to the button image
        const buttonImg = butt.querySelector('img');

        buttonImg.style.transition = 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out';
        buttonImg.style.transform = 'rotateY(180deg)';
        buttonImg.style.opacity = '0';
        
        // After transition, change the image and fade back in
        setTimeout(() => {
          butt.innerHTML = '<img src="img/check_vert.png" style="transform: scale(1); opacity: 1; transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;">';
        }, 100);

        sheet.classList.add('done');
      }
    })
    
    //pour le pc
    sheet.addEventListener('mouseenter', () => {swiper.allowTouchMove = false;swiper.params.simulateTouch = true;swiper.mousewheel.disable();});
    sheet.addEventListener('mouseleave', () => {swiper.allowTouchMove = true;swiper.params.simulateTouch = true;swiper.mousewheel.enable();});
    
    const handleTouchOutside = (e) => {
      if ((!e.target.closest('.bottom-sheet.open')) && (!e.target.closest('.handle-bar'))) {
        
        isOpen = false;
        sheet.classList.remove('open');
        pagination.classList.remove('hidden');
        swiper.allowTouchMove = true;
        swiper.mousewheel.enable();
        

      }
    };

    document.removeEventListener('touchstart', handleTouchOutside);
    document.addEventListener('touchstart', handleTouchOutside);
    console.log(handlebars)
    console.log(handlebar)
    handlebar.addEventListener('click', () => {
      
      isOpen=!isOpen;
      sheet.classList.toggle('open',isOpen);
      pagination.classList.toggle('hidden',isOpen);

      if (isOpen && !content._animDone) {
        content._animDone = true;
        setTimeout(() => animateSheetText(content), 10);
      }
    });

    swiper.on('slideChange', function () {
      isOpen=false;
      sheet.classList.remove('open');
      pagination.classList.remove('hidden');
    });
  }
    
};
}