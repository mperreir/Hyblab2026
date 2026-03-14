"use strict";

/* ════════════════════════════════════
   SÉLECTEURS
════════════════════════════════════ */
const logosAccueil = document.getElementById('logos-accueil');

const ciel        = document.getElementById("ciel");
const map         = document.getElementById("map");
const map2        = document.getElementById("map2");
const Nuage1_Z    = document.getElementById("nuage1_zoom");
const Nuage2_Z    = document.getElementById("nuage2_zoom");
const Nuage3_Z    = document.getElementById("nuage3_zoom");
const txt         = document.getElementById("TxtInfo");
const progressBar = document.getElementById("progress-bar");

const sceneMusee     = document.getElementById('sceneMusee');
const imgVille       = document.getElementById('imgVille');
const musee          = document.querySelector('.musee');
const ruines         = document.querySelector('.ruines');
const ecolier        = document.querySelector('.ecolier');
const blocTexteMusee = document.querySelector('.bloc-texte-musee');

const sceneChantier = document.getElementById('sceneChantier');
const avant         = document.querySelector('.avant');
const apres         = document.getElementById('apres');
const separateur    = document.getElementById('separateur');
const labelAvant    = document.getElementById('labelAvant');
const labelApres    = document.getElementById('labelApres');
const scene2Contenu = document.getElementById('scene2Contenu');
const arbre         = document.getElementById('arbre');

/* ── Scène maison ── */
const sceneMaison = document.getElementById('sceneMaison');
const mRoute      = document.querySelector('.m-route');
const mArbres     = document.querySelector('.m-arbres');
const mFemme      = document.querySelector('.m-femme');

/* ════════════════════════════════════
   REPÈRES SCROLL (px) — tous fixes
   La hauteur du body est déduite ici.
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
const scrollFin_arbre         = scrollFin_glisse + 300;   // 6100
const scrollDebut_slider      = scrollFin_arbre  + 600;   // 6700
const DUREE_SLIDER            = 1500;
const scrollFin_slider        = scrollDebut_slider + DUREE_SLIDER; // 8200
const scrollDebut_desc2       = scrollFin_slider;          // 8200
const scrollFin_desc2         = scrollFin_slider + 800;    // 9000
const scrollDebut_arbreGlisse = scrollFin_pano - 1500;     // 3500

/* ── Repères phase 5 ─────────────────────────────
   scrollFin_desc2 (9000) : chantier sorti → zoom
   sM_zoomFin      (9800) : zoom terminé → maison
   Ordre : route (bas↑) → arbres (haut↓) → femme (opacité)   */
const sM          = scrollFin_desc2;     // 9000
const sM_zoomFin  = sM + 800;           // 9800
const sM_route    = sM_zoomFin;         // 9800
const sM_routeFin = sM_zoomFin + 700;   // 10500
const sM_arbres   = sM_zoomFin + 300;   // 10100
const sM_arbresFin= sM_zoomFin + 1000;  // 10800
const sM_femme      = sM_zoomFin + 800;   // 10600
const sM_femmeFin   = sM_zoomFin + 1400;  // 11200
const sM_zoom2      = sM_femmeFin + 200;  // 11400 — début zoom sur femme+arbres
const sM_zoom2Fin   = sM_zoom2    + 1200; // 12600 — fin zoom
const sM_fin        = sM_zoom2Fin + 400;  // 13000

// Le body est exactement assez haut pour atteindre le dernier repère
document.body.style.height = (sM_fin + window.innerHeight + 200) + 'px';

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
════════════════════════════════════ */
const fleche = document.getElementById('scroll-fleche');
let timerFleche = null;

function montrerFleche() {
    const maxScr = document.body.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxScr - 10) return;
    if (fleche) fleche.classList.add('visible');
}
function cacherFleche() {
    if (fleche) fleche.classList.remove('visible');
}

timerFleche = setTimeout(montrerFleche, 2000);

/* ════════════════════════════════════
   SCROLL LISSÉ
════════════════════════════════════ */
let scrollCible  = 0;
let scrollActuel = 0;
const VITESSE_MAX = 18;

window.addEventListener("scroll", () => {
    scrollCible = window.scrollY;
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
       PHASE 4 : panoramique + chantier + arbre + slider
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
            const jointurePct = (1 - pGlisse) * 1;
            const arriveeLeft = jointurePct - arbreVw / 2 - 70;
            const departLeft  = 100 + (-departVw);
            const leftVw      = departLeft + pGlisseArbre * (arriveeLeft - departLeft);
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
            apres.style.clipPath  = `inset(0 ${100 - pct}% 0 0)`;
            separateur.style.left = `${pct}%`;

            const fondu = 15;
            const debut = Math.max(0, pct - fondu);
            avant.style.webkitMaskImage =
            avant.style.maskImage =
                `linear-gradient(to right, transparent ${debut}%, black ${pct}%)`;

            // Descente av/ap vers le bas après fin du slider
            const pDesc2 = av(s, scrollDebut_desc2, scrollFin_desc2);
            const tY     = pDesc2 * 110;
            avant.style.transform      = `translateY(${tY}%)`;
            apres.style.transform      = `translateY(${tY}%)`;
            separateur.style.transform = `translateY(${tY}%)`;

        } else {
            apres.style.clipPath  = 'inset(0 100% 0 0)';
            separateur.style.left = '0%';
            avant.style.webkitMaskImage = avant.style.maskImage = '';
            avant.style.transform = '';
            apres.style.transform = '';
            separateur.style.transform = '';
        }
    }

    /* ──────────────────────────────
       PHASE 5 : zoom haut-droit + scène maison

       9000→9800 : zoom sur le coin haut-droit du chantier
                   (transform-origin: top right, scale 1→2.5)
       9800+     : chantier masqué, scène maison affichée
         route   : monte du bas   — translateX(-50%) translateY(100vh→0)
         arbres  : descend du haut — translate(-50%, -50%+(-100vh→0))
         femme   : opacité pure 0→1, transform CSS inchangé
    ────────────────────────────── */

    if (s >= sM && s < sM_zoomFin) {
        /* ── Zoom centre-droit ──
           On zoome vers le milieu du bord droit (50% 50% right → center right).
           scale 1 → 2.5 sur 800px de scroll.                              */
        const pZoom = av(s, sM, sM_zoomFin);
        sceneChantier.style.transformOrigin = 'center right';
        sceneChantier.style.transform       = `scale(${lerp(1, 2.5, pZoom)})`;
        sceneChantier.style.visibility      = 'visible';
        sceneMaison.style.display           = 'none';

    } else if (s >= sM_zoomFin) {
        /* ── Scène maison ──
           On garde le chantier zoomé à 2.5 en arrière-plan
           (visibility visible, mais sceneMaison par-dessus z-index:40) */
        sceneChantier.style.transformOrigin = 'center right';
        sceneChantier.style.transform       = 'scale(2.5)';
        sceneChantier.style.visibility      = 'visible';
        sceneMaison.style.display           = 'block';

        // ── Hauteur route pour aligner arbres au-dessus ──
        const routeH = mRoute.offsetHeight || 0;

        // Offset vertical commun arbres+femme :
        // bas des arbres = haut de la route, puis -10% de la hauteur écran vers le bas
        const offsetFinal = -routeH + window.innerHeight * 0.10;

        // 1. Route : monte du bas
        const pRoute = av(s, sM_route, sM_routeFin);
        mRoute.style.opacity   = pRoute;
        mRoute.style.transform = `translateX(-50%) translateY(${(1 - pRoute) * 100}vh)`;

        // 2. Arbres : descend du haut, position finale décalée -10%
        const pArbres      = av(s, sM_arbres, sM_arbresFin);
        const entreeArbres = offsetFinal - window.innerHeight;
        const tyArbres     = lerp(entreeArbres, offsetFinal, pArbres);
        mArbres.style.opacity   = pArbres;
        mArbres.style.transform = `translateX(-50%) translateY(${tyArbres}px)`;

        // 3. Femme : opacité, même offset que les arbres (-10%)
        const pFemme = av(s, sM_femme, sM_femmeFin);
        mFemme.style.opacity   = pFemme;
        mFemme.style.transform = `translateX(-50%) translateY(${offsetFinal}px)`;

        // 4. Zoom sur femme + arbres après leur apparition complète
        //    On zoome le groupe depuis leur centre commun (center de la scène)
        const pZoom2 = av(s, sM_zoom2, sM_zoom2Fin);
        if (pZoom2 > 0) {
            const scaleZ = lerp(1, 2.5, pZoom2);
            // On zoome sceneMaison en entier, ancré sur le centre des arbres/femme
            // transform-origin : centre horizontal, vertical = position de offsetFinal depuis le bas
            const originY = window.innerHeight + offsetFinal; // px depuis le haut
            sceneMaison.style.transformOrigin = `50% ${originY}px`;
            sceneMaison.style.transform       = `scale(${scaleZ})`;
        } else {
            sceneMaison.style.transformOrigin = '';
            sceneMaison.style.transform       = '';
        }

    } else {
        /* ── État initial (avant phase 5) ── */
        sceneMaison.style.display  = 'none';
        mRoute.style.opacity       = 0;
        mRoute.style.transform     = 'translateX(-50%) translateY(100vh)';
        mArbres.style.opacity      = 0;
        mArbres.style.transform    = `translateX(-50%) translateY(${-window.innerHeight}px)`;
        mFemme.style.opacity       = 0;
        mFemme.style.transform     = 'translateX(-50%) translateY(0)';
    }
}