//Repères de scroll (en pixels)
const DebutSLideDroite = 1500;
const FinSLideDroite = 9500;
document.body.style.height = (FinSLideDroite + window.innerHeight + 200) + 'px';

//Récupère les éléments
const fond = document.getElementById("fond");
const arbre1 = document.getElementById("arbre1");
const arbre2 = document.getElementById("arbre2");
const mec = document.getElementById('mec');
const arbreD = document.getElementById("arbreDessin");
const arbre3 = document.getElementById("arbre3");
const planter = document.getElementById("planter");

function clamp(val, min, max) { return Math.min(Math.max(val, min), max); }
function lerp(a, b, t)        { return a + (b - a) * clamp(t, 0, 1); }
function av(s, d, f)          { return clamp((s - d) / (f - d), 0, 1); }

window.addEventListener("scroll", () => {
    scrollActuel = window.scrollY;

    arbre_slide = av(scrollActuel,0, DebutSLideDroite-100);
    arbre1.style.transform = `translateX(${lerp(0, -120, arbre_slide)}vw)`;
    arbre1.style.opacity = lerp(1,0,arbre_slide);

    arbre2.style.transform = `translateX(${lerp(0, 80, arbre_slide)}vw)`;
    arbre2.style.opacity = lerp(1,0,arbre_slide);

    mec.style.transform = `translateY(${lerp(0, -10, arbre_slide)}vh)`;

    slide_droite = av(scrollActuel, DebutSLideDroite, FinSLideDroite-50);
    fond.style.transform = `translateX(${lerp(0, -220, slide_droite)}vw)`;
    mec.style.transform = `translateX(${lerp(0, -220, slide_droite)}vw)`;
    arbreD.style.transform = `translateX(${lerp(0, -220, slide_droite)}vw)`;
    arbre3.style.transform = `translateX(${lerp(0, -220, slide_droite)}vw)`;
    planter.style.transform = `translateX(${lerp(0, -220, slide_droite)}vw)`;


});