"use strict";

const ciel = document.getElementById("ciel");
const map  = document.getElementById("map");
const map2  = document.getElementById("map2");
const Nuage1_Z  = document.getElementById("nuage1_zoom");
const Nuage2_Z  = document.getElementById("nuage2_zoom");
const Nuage3_Z  = document.getElementById("nuage3_zoom");
const txt = document.getElementById("TxtInfo");

const calqueVille = document.querySelector('.calque-ville');
const musee = document.querySelector('.musee');
const ruines = document.querySelector('.ruines');
const ecolier = document.querySelector('.ecolier');
const blocTexteMusee = document.querySelector('.bloc-texte-musee');

//Repères de scroll (en pixels)
const scrollFinStep1 = 800;
const scrollFinStep2 = 1200;

const scrollDebutDescente = 1600;
const scrollFinDescente = 1800;
const scrollDebutMusee = 2200;
const scrollDebutRuines = 2600;
const scrollDebutEcolier = 2800;

//GIF
const gif1 = document.getElementById("NuageGIF1");
const gif2 = document.getElementById("NuageGIF2");
const gif3 = document.getElementById("NuageGIF3");
const NOMBRE_FRAMES  = 49;

const frames_gif1 = Array.from({ length: NOMBRE_FRAMES }, (_, i) => {
    const numero = String(i + 1);
    return `img/gif/nuage1/aeb8c171-9452-4a2a-b87b-e009aae9a6f3-${numero}.png`;
});

const frames_gif2 = Array.from({ length: NOMBRE_FRAMES }, (_, i) => {
    const numero = String(i + 1).padStart(4, '0');
    return `img/gif/nuage2/frame_${numero}.png`;
});

const frames_gif3 = Array.from({ length: NOMBRE_FRAMES }, (_, i) => {
    const numero = String(i + 1);
    return `img/gif/nuage3/e0d3feff-487d-45bc-9795-fcc0d8687090-${numero}.png`;
});

frames_gif1.forEach(src => { const img = new Image(); img.src = src; });
frames_gif2.forEach(src => { const img = new Image(); img.src = src; });
frames_gif3.forEach(src => { const img = new Image(); img.src = src; });

let frameAffichee = 0;

//FONCTIONS
function clamp(val, min, max) { return Math.min(Math.max(val, min), max); }
function lerp(a, b, t) { return a + (b - a) * clamp(t, 0, 1); }
function avancement(scroll, debut, fin) { return clamp((scroll - debut) / (fin - debut), 0, 1); }

function TXT(id){
  fetch('data/data.json')
  .then(response => response.json())
  .then(data => {
    txt.textContent = data[id]; 
  });};

window.addEventListener("scroll", () => {
    const scrollActuel = window.scrollY;

    //Phase1
    const avance1 = avancement(scrollActuel, 0, scrollFinStep1);

    //Phase1 : zoom Ciel
    const scaleCiel = lerp(1, 3, avance1); // zoom du ciel 1x → 3x
    ciel.style.transform = `scale(${scaleCiel})`;
    ciel.style.transformOrigin = "center top";

    //Phase1 : Ville disparition
    const opacity = lerp(1, 0, avance1);// disparaît progressivement
    const translateY = lerp(0, 50, avance1);
    const translateY2 = lerp(0, 50, avance1*1.1);
    map.style.transform = `translateY(${translateY}%)`;
    map.style.opacity = opacity;

    map2.style.transform = `translateY(${translateY2}%)`;
    map2.style.opacity = opacity;


    //Phase1: Zoom nuage
    const scaleNuage1 = lerp(0.4, 1.5, avance1);
    const scaleNuage2 = lerp(0.07, 0.2, avance1);
    const scaleNuage3 = lerp(0.45, 1.5, avance1);

    Nuage1_Z.style.transform = `translateX(-50%) translateY(-50%) scale(${scaleNuage1})`;
    Nuage2_Z.style.transform = `translateX(-50%) translateY(-50%) scale(${scaleNuage2})`;
    Nuage3_Z.style.transform = `translateX(-50%) translateY(-50%) scale(${scaleNuage3})`;

    Nuage1_Z.style.opacity = opacity;
    Nuage2_Z.style.opacity = opacity;
    Nuage3_Z.style.opacity = opacity;

    if (scrollActuel < scrollFinStep1){
            txt.style.opacity = 0;
        }


    //Phase2
    const progression  = Math.max(-1, scrollActuel-scrollFinStep1) / (scrollFinStep2-scrollFinStep1);

    if (progression > 0) {
        gif1.style.display = 'inline';
        gif2.style.display = 'inline';
        gif3.style.display = 'inline';

        const indexFrame   = Math.min(
        Math.floor(progression * NOMBRE_FRAMES),
        NOMBRE_FRAMES - 1
         );

        // Ne redessine que si la frame a changé
        if (indexFrame !== frameAffichee) {

            gif1.src = frames_gif1[indexFrame];
            gif2.src = frames_gif2[indexFrame];
            gif3.src = frames_gif3[indexFrame];

            frameAffichee = indexFrame;
        }

        TXT("ZFE");

        if (scrollActuel > scrollFinStep1 && scrollActuel < scrollFinStep2+50){
            const opacity = lerp(0, 1, avancement(scrollActuel, scrollFinStep1+10, scrollFinStep2+50));
            txt.style.opacity = opacity;
            txt.style.top = "50%";
        }

        const scaleCiel_inv = lerp(3, 1, avancement(scrollActuel,1500,scrollDebutDescente));
        ciel.style.transform = `scale(${scaleCiel_inv})`;

        if (scrollActuel > 1500 && scrollActuel < scrollDebutDescente-25){
            const opa = lerp(1, 0, avancement(scrollActuel,1500,scrollDebutDescente-30));
            gif1.style.opacity = opa;
            gif2.style.opacity = opa;
            gif3.style.opacity = opa;
            txt.style.opacity = opa;
        }
    };

    // PHASE 3 : scène musée


    if (scrollActuel> scrollDebutDescente){

        const descente = avancement(scrollActuel, scrollDebutDescente, scrollFinDescente);

        // la colline remonte depuis le bas
        if(calqueVille){
            calqueVille.style.opacity = 1;
            calqueVille.style.transform = `translateY(${(80 -descente * 40)}%)  scale(0.13)`;
        }

        // apparition des éléments
        if(scrollActuel > scrollDebutMusee  && scrollActuel < scrollDebutRuines){
            musee.classList.add("visible");
            const descente2 = avancement(scrollActuel, scrollDebutMusee, scrollDebutMusee+100);
            musee.style.transform = `translateY(${(-descente2*50)}vh)`;
        }

        if(scrollActuel > scrollDebutRuines && scrollActuel < scrollDebutEcolier){
            ruines.classList.add("visible");
            const descente3 = avancement(scrollActuel, scrollDebutRuines, scrollDebutRuines+100);
            ruines.style.transform = `translateY(${(-descente3*30)}vh)`;
        }

        if(scrollActuel > scrollDebutEcolier && scrollActuel < scrollDebutEcolier +200){
            ecolier.classList.add("visible");
            //blocTexteMusee.classList.add("visible");
            const descente4 = avancement(scrollActuel, scrollDebutEcolier, scrollDebutEcolier+100);
            ecolier.style.transform = `translateY(${(-descente4*30)}vh)`;
        }
    }

    
    
}, { passive: true });