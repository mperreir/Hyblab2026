"use strict";

// const img = document.getElementById('img');

// const segments = [
//   { type: "y", length: 500 },
//   { type: "x", length: 500 },
//   { type: "y", length: 500 }
// ];

// window.addEventListener('scroll', () => {
//   const scroll = window.scrollY;
//   let x = 0;
//   let y = 0;
//   let remaining = window.scrollY;

//   for (const seg of segments) {

//     const move = Math.min(remaining, seg.length);

//     if (seg.type === "x") x += move;
//     if (seg.type === "y") y += move;

//     remaining -= seg.length;

//     if (remaining <= 0) break;
//   }

//   img.style.transform = `translate(${-x}px, ${-y}px)`;
// });

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.to('#img', {
    scrollTrigger: '#img', // start the animation when ".box" enters the viewport (once)
    x: 500
  });
});