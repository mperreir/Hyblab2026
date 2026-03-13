"use strict";

// async init function (because of the awaits on fetches)
const initSlide4 = async function(){
  const logo = document.querySelector('#logo-hyblab');
  const sheet = document.querySelector('.bottom-sheet');
  if (sheet.dataset.initialized) return;
    sheet.dataset.initialized = true; 
  const handlebar = document.querySelector('.handle-bar');
  const pagination = document.querySelector('.swiper-pagination');
  let isOpen=false;

  
  //pour le téléphone portable
  sheet.addEventListener('scroll', () => {swiper.allowTouchMove = false;});
  sheet.addEventListener('scroll', () => {swiper.allowTouchMove = true;});
  //pour le pc
  sheet.addEventListener('mouseenter', () => {console.log("entrée");swiper.allowTouchMove = false;swiper.params.simulateTouch = true;swiper.mousewheel.disable();console.log(swiper.allowTouchMove)});
  sheet.addEventListener('mouseleave', () => {console.log("sortie");swiper.allowTouchMove = true;swiper.params.simulateTouch = true;swiper.mousewheel.enable();console.log(swiper.allowTouchMove)});
  handlebar.addEventListener('click', () => {
    isOpen=!isOpen;
    sheet.classList.toggle('open',isOpen);
    pagination.classList.toggle('hidden',isOpen);
  });
  swiper.on('slideChange', function () {
    isOpen=false;
    sheet.classList.remove('open');
    pagination.classList.remove('hidden');
  });
  
  // (Re)set initial scale of logo
  logo.setAttribute('style', 'transform :scale(1);');

  // Animate hyblab logo and make shrink on click
  anime({
    targets: '#logo-hyblab',
    scale: 1.2,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });

  // Add click listener
  logo.addEventListener('click', () => {
    anime({
        targets: '#logo-hyblab',
        scale: 0
      });
    swiper.slideNext()
  });

  // Retrieve the partner's topic from our API
  let response = await fetch('api/topic');
  const data1 = await response.json();

  // Get some dummy data
  response = await fetch('data/dummy.json');
  const data2 = await response.json();
};