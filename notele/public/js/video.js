// const videoIntro    = document.getElementById('video-intro');
// const videoPlayer   = document.getElementById('intro-player');
// const title         = document.querySelector('#title');
// const buttons       = document.querySelector('#GenZ_filters');
// const creditButton  = document.querySelector(".creditButton");
// const pinsRaph          = document.querySelectorAll(".entreprisePin");
// videoPlayer.onended = function() {
//     videoIntro.classList.add('fade-out');
    
//     setTimeout(() => {
//         videoIntro.style.display = 'none';
//         title.style.display = 'block';
//         buttons.style.display = 'flex';
//         creditButton.style.display = 'block';
//         pinsRaph.forEach((pin)=> {
//             pin.style.display = 'block';
//         })
//     }, 300); 
// };

// // 2. Sécurité : Si la vidéo met trop de temps à charger (ex: 5s), on l'enlève
// setTimeout(() => {
//     if (!videoIntro.classList.contains('fade-out')) {
//         videoIntro.classList.add('fade-out');
//     }
// }, 4000);