"use strict";

/* ════════════════════════════════════
   SÉLECTEURS
════════════════════════════════════ */
const logosAccueil = document.getElementById('logos-accueil');

const ciel         = document.getElementById("ciel");
const map          = document.getElementById("map");
const map2         = document.getElementById("map2");
const Nuage1_Z     = document.getElementById("nuage1_zoom");
const Nuage2_Z     = document.getElementById("nuage2_zoom");
const Nuage3_Z     = document.getElementById("nuage3_zoom");
const txt          = document.getElementById("TxtInfo");
const progressBar  = document.getElementById("progress-bar");

const sceneMusee     = document.getElementById('sceneMusee');
const calqueVille    = document.querySelector('.calque-ville');
const imgVille       = document.getElementById('imgVille');
const musee          = document.querySelector('.musee');
const ruines         = document.querySelector('.ruines');
const ecolier        = document.querySelector('.ecolier');
const blocTexteMusee = document.querySelector('.bloc-texte-musee');

const sceneChantier  = document.getElementById('sceneChantier');
const avant          = document.querySelector('.avant');
const apres          = document.getElementById('apres');
const separateur     = document.getElementById('separateur');
const labelAvant     = document.getElementById('labelAvant');
const labelApres     = document.getElementById('labelApres');
const scene2Contenu  = document.getElementById('scene2Contenu');
const arbre          = document.getElementById('arbre');

/* ════════════════════════════════════
   REPÈRES SCROLL (px)
════════════════════════════════════ */
const scrollFinStep1          = 800;
const scrollFinStep2          = 1200;
const scrollDebutDescente     = 1600;
const scrollFinDescente       = 1800;
const scrollDebutMusee        = 2200;
const scrollDebutRuines       = 2600;
const scrollDebutEcolier      = 2800;
const scrollDebut_pano        = 4000;
const scrollFin_pano          = 5000;
const scrollFin_glisse        = 5800;
const scrollFin_arbre         = scrollFin_glisse + 300;
const scrollDebut_slider      = scrollFin_arbre  + 600;
// scrollFin_slider = max scroll réel (body height - 100vh)
// On le calcule dynamiquement pour s'adapter à toutes les tailles d'écran
const scrollFin_slider        = document.body.scrollHeight - window.innerHeight - 800;
const scrollDebut_descente    = scrollFin_slider;          // début descente av/ap
const scrollFin_descente_img  = scrollFin_slider + 800;    // fin descente = bas de page
const scrollDebut_arbreGlisse = scrollFin_pano - 1500; // ← plus grand = entrée plus douce/tôt

const departVw = -160;
const arbreVw  = 94;

/* ════════════════════════════════════
   GIFs — préchargement
════════════════════════════════════ */
const gif1 = document.getElementById("NuageGIF1");
const gif2 = document.getElementById("NuageGIF2");
const gif3 = document.getElementById("NuageGIF3");
const NOMBRE_FRAMES = 49;

const frames_gif1 = Array.from({ length: NOMBRE_FRAMES }, (_, i) =>
    `img/gif/nuage1/aeb8c171-9452-4a2a-b87b-e009aae9a6f3-${i + 1}.png`);
const frames_gif2 = Array.from({ length: NOMBRE_FRAMES }, (_, i) =>
    `img/gif/nuage2/frame_${String(i + 1).padStart(4, '0')}.png`);
const frames_gif3 = Array.from({ length: NOMBRE_FRAMES }, (_, i) =>
    `img/gif/nuage3/e0d3feff-487d-45bc-9795-fcc0d8687090-${i + 1}.png`);

frames_gif1.forEach(src => { const img = new Image(); img.src = src; });
frames_gif2.forEach(src => { const img = new Image(); img.src = src; });
frames_gif3.forEach(src => { const img = new Image(); img.src = src; });

let frameAffichee = 0;

/* ════════════════════════════════════
   RATIO IMAGE VILLE
════════════════════════════════════ */
let imgNaturalRatio = 2;
if (imgVille) {
    imgVille.onload = () => { imgNaturalRatio = imgVille.naturalWidth / imgVille.naturalHeight; };
    if (imgVille.complete && imgVille.naturalWidth) {
        imgNaturalRatio = imgVille.naturalWidth / imgVille.naturalHeight;
    }
}

/* ════════════════════════════════════
   FONCTIONS UTILITAIRES
════════════════════════════════════ */
function clamp(val, min, max) { return Math.min(Math.max(val, min), max); }
function lerp(a, b, t)        { return a + (b - a) * clamp(t, 0, 1); }
function av(s, d, f)          { return clamp((s - d) / (f - d), 0, 1); }
function toggle(el, c)        { if (el) el.classList.toggle('visible', c); }

function TXT(id) {
    fetch('data/data.json')
        .then(r => r.json())
        .then(data => { if (txt) txt.textContent = data[id]; });
}

/* ════════════════════════════════════
   FLÈCHE SCROLL
   Apparaît 2s après l'arrêt du scroll.
   Disparaît dès qu'on rescroll.
════════════════════════════════════ */
const fleche   = document.getElementById('scroll-fleche');
let timerFleche = null;

function montrerFleche() {
    const maxScr = document.body.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxScr - 10) return; // déjà en bas
    if (fleche) fleche.classList.add('visible');
}

function cacherFleche() {
    if (fleche) fleche.classList.remove('visible');
}

// Lancer le timer au chargement de la page
timerFleche = setTimeout(montrerFleche, 2000);

/* ════════════════════════════════════
   SCROLL LISSÉ — vitesse limitée
   VITESSE_MAX : px avancés par frame ← à ajuster
   Plus petit = plus lent / plus fluide
════════════════════════════════════ */
let scrollCible  = 0;
let scrollActuel = 0;
const VITESSE_MAX = 18; // ← ajuster

window.addEventListener("scroll", () => {
    scrollCible = window.scrollY;

    // Flèche : cache dès qu'on scroll, relance le timer
    cacherFleche();
    clearTimeout(timerFleche);
    timerFleche = setTimeout(montrerFleche, 2000);
});

(function boucle() {
    const delta = scrollCible - scrollActuel;
    scrollActuel = Math.abs(delta) > 0.5
        ? scrollActuel + Math.sign(delta) * Math.min(Math.abs(delta), VITESSE_MAX)
        : scrollCible;
    majScene(scrollActuel);
    requestAnimationFrame(boucle);
})();

/* ════════════════════════════════════
   BOUCLE SCÈNE
════════════════════════════════════ */
function majScene(s) {
    const maxScr = document.body.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = `${(s / maxScr) * 100}%`;

    /* ──────────────────────────────
       PHASE 1 : zoom ciel + cartes
    ────────────────────────────── */
    const avance1 = av(s, 0, scrollFinStep1);

    // Logos : disparaissent dès le premier pixel de scroll
    if (logosAccueil) logosAccueil.classList.toggle('cache', s > 0);


    ciel.style.transform       = `scale(${lerp(1, 3, avance1)})`;
    ciel.style.transformOrigin = "center top";

    const opa = lerp(1, 0, avance1);
    map.style.transform  = `translateY(${lerp(0, 50, avance1)}%)`;
    map.style.opacity    = opa;
    map2.style.transform = `translateY(${lerp(0, 50, avance1 * 1.1)}%)`;
    map2.style.opacity   = opa;

    Nuage1_Z.style.transform = `translateX(-50%) translateY(-50%) scale(${lerp(0.4,  1.5, avance1)})`;
    Nuage2_Z.style.transform = `translateX(-50%) translateY(-50%) scale(${lerp(0.07, 0.2, avance1)})`;
    Nuage3_Z.style.transform = `translateX(-50%) translateY(-50%) scale(${lerp(0.45, 1.5, avance1)})`;
    Nuage1_Z.style.opacity = Nuage2_Z.style.opacity = Nuage3_Z.style.opacity = opa;

    if (s < scrollFinStep1) txt.style.opacity = 0;

    /* ──────────────────────────────
       PHASE 2 : GIFs nuages + texte
    ────────────────────────────── */
    const progression = Math.max(-1, s - scrollFinStep1) / (scrollFinStep2 - scrollFinStep1);

    if (progression > 0) {
        gif1.style.display = gif2.style.display = gif3.style.display = 'inline';

        const indexFrame = Math.min(Math.floor(progression * NOMBRE_FRAMES), NOMBRE_FRAMES - 1);
        if (indexFrame !== frameAffichee) {
            gif1.src = frames_gif1[indexFrame];
            gif2.src = frames_gif2[indexFrame];
            gif3.src = frames_gif3[indexFrame];
            frameAffichee = indexFrame;
        }

        TXT("ZFE");

        if (s > scrollFinStep1 && s < scrollFinStep2 + 50) {
            txt.style.opacity = lerp(0, 1, av(s, scrollFinStep1 + 10, scrollFinStep2 + 50));
            txt.style.top = "50%";
        }

        ciel.style.transform = `scale(${lerp(3, 1, av(s, 1500, scrollDebutDescente))})`;

        if (s > 1500 && s < scrollDebutDescente - 25) {
            const o = lerp(1, 0, av(s, 1500, scrollDebutDescente - 30));
            gif1.style.opacity = gif2.style.opacity = gif3.style.opacity = o;
            txt.style.opacity = o;
        }
    }

    /* ──────────────────────────────
       PHASE 3 : descente + musée
    ────────────────────────────── */
    if (s >= scrollDebutDescente) {
        const descente = av(s, scrollDebutDescente, scrollFinDescente);

        imgVille.style.opacity = '1';
        if (s < scrollDebut_pano) {
            imgVille.style.left      = '-50%';
            imgVille.style.transform = `translateY(${lerp(100, 0, descente)}%)`;
        }

        if (s > scrollDebutMusee && s < scrollDebutRuines) {
            musee.classList.add("visible");
            musee.style.transform = `translateY(${-av(s, scrollDebutMusee, scrollDebutMusee + 100) * 50}vh)`;
        }
        if (s > scrollDebutRuines && s < scrollDebutEcolier) {
            ruines.classList.add("visible");
            ruines.style.transform = `translateY(${-av(s, scrollDebutRuines, scrollDebutRuines + 100) * 30}vh)`;
        }
        if (s > scrollDebutEcolier && s < scrollDebutEcolier + 200) {
            ecolier.classList.add("visible");
            ecolier.style.transform = `translateY(${-av(s, scrollDebutEcolier, scrollDebutEcolier + 100) * 30}vh)`;
        }
    } else {
        imgVille.style.opacity = '0';
    }

    /* ──────────────────────────────
       PHASE 4 : panoramique + glissement chantier + arbre
    ────────────────────────────── */
    if (s >= scrollDebut_pano) {
        const imgW   = imgNaturalRatio * window.innerHeight;
        const W      = window.innerWidth;

        const startX   = -0.5 * W;
        const endX     = -imgW / 2.8;
        const pPano    = av(s, scrollDebut_pano, scrollFin_pano);
        const currentX = startX + pPano * (endX - startX);
        const panoPx   = pPano * W;

        imgVille.style.transform = '';
        imgVille.style.opacity   = '1';

        sceneMusee.style.transform = `translateX(${-panoPx}px)`;

        const pGlisse = av(s, scrollFin_pano, scrollFin_glisse);
        imgVille.style.left      = `${currentX - pGlisse * W}px`;
        sceneChantier.style.left = `${(1 - pGlisse) * 100}%`;

        /* ── Arbre ── */
        const pDisparait   = av(s, scrollFin_glisse, scrollFin_arbre);
        const pGlisseArbre = av(s, scrollDebut_arbreGlisse, scrollFin_glisse);

        if (s >= scrollDebut_arbreGlisse && s < scrollFin_arbre) {
            arbre.style.display = 'block';

            // La jointure est à (1 - pGlisse) * 100vw depuis la gauche
            // → on positionne l'arbre en left pour être dans le même référentiel
            const jointurePct   = (1 - pGlisse) * 1;   // vw, suit Fourvière
            const arbreW_vw     = arbreVw;                // largeur arbre en vw
            const arriveeLeft   = jointurePct - arbreW_vw / 2 - 70; // centré sur jointure

            // Entrée : part de hors écran à droite (>100vw) vers arriveeLeft
            // departVw est négatif → on s'en sert comme offset depuis la droite
            // On convertit : départ = 100 + (-departVw) vw depuis la gauche
            const departLeft    = 100 + (-departVw);
            const leftVw        = departLeft + pGlisseArbre * (arriveeLeft - departLeft);

            arbre.style.left      = `${leftVw}vw`;
            arbre.style.right     = 'auto';
            arbre.style.opacity   = `${1 - pDisparait}`;
            arbre.style.transform = `scaleX(${1 + pDisparait * 0.7}) scaleY(${1 + pDisparait * 0.3})`;

        } else {
            arbre.style.display = 'none';
        }

        /* ── Slider avant/après ── */
        const arbreDisp = s >= scrollFin_arbre;
        const pSlider   = av(s, scrollDebut_slider, scrollFin_slider);

        toggle(scene2Contenu, arbreDisp);
        toggle(separateur,    arbreDisp);
        toggle(labelAvant,    arbreDisp);
        toggle(labelApres,    arbreDisp);

        if (arbreDisp) {
            const pct = pSlider * 100;

            // .apres : révélé de gauche à droite par clip-path
            apres.style.clipPath  = `inset(0 ${100 - pct}% 0 0)`;
            separateur.style.left = `${pct}%`;

            // .avant : masque dégradé
            const fondu = 15;
            const debut = Math.max(0, pct - fondu);
            avant.style.webkitMaskImage =
            avant.style.maskImage =
                `linear-gradient(to right, transparent ${debut}%, black ${pct}%)`;

            // Descente des images av/ap après fin du slider
            const pDescente = av(s, scrollDebut_descente, scrollFin_descente_img);
            const translateY = pDescente * 110; // % vers le bas ← ajuster
            avant.style.transform = `translateY(${translateY}%)`;
            apres.style.transform = `translateY(${translateY}%)`;

            // Le séparateur et les labels descendent aussi
            separateur.style.transform = `translateY(${translateY}%)`;

        } else {
            apres.style.clipPath  = 'inset(0 100% 0 0)';
            separateur.style.left = '0%';
            avant.style.webkitMaskImage = avant.style.maskImage = '';
            avant.style.transform = '';
            apres.style.transform = '';
            separateur.style.transform = '';
        }
    }

}