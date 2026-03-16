"use strict";

/* ════════════════════════════════════
   SÉLECTEURS — Scène 1-5 (zoom)
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
   SÉLECTEURS — Scène Bio
════════════════════════════════════ */
const sceneBio  = document.getElementById('sceneBio');
const fond      = document.getElementById("fond");
const arbre1    = document.getElementById("arbre1");
const arbre2    = document.getElementById("arbre2");
const mec       = document.getElementById('mec');
const arbreD    = document.getElementById("arbreDessin");
const arbre3    = document.getElementById("arbre3");
const planter   = document.getElementById("planter");

/* ════════════════════════════════════
   REPÈRES SCROLL (px) — Scènes 1-5
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
const scrollDebut_desc2       = scrollFin_slider;                  // 8200
const scrollFin_desc2         = scrollFin_slider + 800;            // 9000
const scrollDebut_arbreGlisse = scrollFin_pano - 1500;             // 3500

/* ── Phase 5 ── */
const sM          = scrollFin_desc2;       // 9000
const sM_zoomFin  = sM + 800;             // 9800
const sM_route    = sM_zoomFin;           // 9800
const sM_routeFin = sM_zoomFin + 700;     // 10500
const sM_arbres   = sM_zoomFin + 300;     // 10100
const sM_arbresFin= sM_zoomFin + 1000;    // 10800
const sM_femme    = sM_zoomFin + 800;     // 10600
const sM_femmeFin = sM_zoomFin + 1400;    // 11200
const sM_zoom2    = sM_femmeFin + 200;    // 11400
const sM_zoom2Fin = sM_zoom2    + 1200;   // 12600
const sM_fin      = sM_zoom2Fin + 400;    // 13000

/* ── Transition sortie maison → Bio ──
   13000 → 13600 : route, arbres, femme glissent dans le sol
   13600 → 13800 : sceneChantier+Maison s'effacent en fondu
   13800          : Bio entre en scène                       */
const sT_debut    = sM_fin;               // 13000
const sT_fin      = sT_debut + 600;       // 13600
const sFade_fin   = sT_fin   + 200;       // 13800

/* ════════════════════════════════════
   REPÈRES SCROLL — Bio
════════════════════════════════════ */
const sB_debut          = sFade_fin;              // 13800
const sB_arbresSortie   = sB_debut + 1500;        // 15300  arbres quittent l'écran
const sB_slideDroite    = sB_debut + 1500;        // 15300  début slide panoramique
const sB_slideFinale    = sB_slideDroite + 8000;  // 23300  fin slide

/* Hauteur totale du body */
document.body.style.height = (sB_slideFinale + window.innerHeight + 400) + 'px';

/* ════════════════════════════════════
   CONSTANTES
════════════════════════════════════ */
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

/* Préchargement images Bio */
[
    'img/bio/IMAGE-PARC-FOND.png',
    'img/bio/écolier_01.png',
    'img/bio/ARBRE_01.png',
    'img/bio/ARBRE_02.png',
    'img/bio/arbre_04.png',
    'img/bio/ARBRE-3.png',
    'img/bio/personnes plantent arbres.png'
].forEach(src => { const img = new Image(); img.src = src; });

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
   BOUCLE SCÈNE PRINCIPALE
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
            if (arbre.style.opacity <1 ){
                imgVille.style.opacity = 0;
            }
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
            imgVille.style.opacity = 0;
            const pct = pSlider * 100;
            apres.style.clipPath  = `inset(0 ${100 - pct}% 0 0)`;
            separateur.style.left = `${pct}%`;

            const fondu = 15;
            const debut = Math.max(0, pct - fondu);
            avant.style.webkitMaskImage =
            avant.style.maskImage =
                `linear-gradient(to right, transparent ${debut}%, black ${pct}%)`;

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
    ────────────────────────────── */

    if (s >= sM && s < sM_zoomFin) {
        const pZoom = av(s, sM, sM_zoomFin);
        sceneChantier.style.transformOrigin = 'center right';
        sceneChantier.style.transform       = `scale(${lerp(1, 2.5, pZoom)})`;
        sceneChantier.style.visibility      = 'visible';
        sceneMaison.style.display           = 'none';
        sceneBio.style.display              = 'none';

    } else if (s >= sM_zoomFin && s < sT_debut) {
        /* ── Maison active ── */
        sceneChantier.style.transformOrigin = 'center right';
        sceneChantier.style.transform       = 'scale(2.5)';
        sceneChantier.style.visibility      = 'visible';
        sceneChantier.style.opacity         = '1';
        sceneMaison.style.display           = 'block';
        sceneMaison.style.opacity           = '1';
        /* Bio cachée derrière (z-index 25 < maison 40) mais display:none pour perf */
        sceneBio.style.display              = 'none';

        const routeH    = mRoute.offsetHeight || 0;
        const offsetFinal = -routeH + window.innerHeight * 0.10;

        // 1. Route
        const pRoute = av(s, sM_route, sM_routeFin);
        mRoute.style.opacity   = pRoute;
        mRoute.style.transform = `translateX(-50%) translateY(${(1 - pRoute) * 100}vh)`;

        // 2. Arbres
        const pArbres      = av(s, sM_arbres, sM_arbresFin);
        const entreeArbres = offsetFinal - window.innerHeight;
        const tyArbres     = lerp(entreeArbres, offsetFinal, pArbres);
        mArbres.style.opacity   = pArbres;
        mArbres.style.transform = `translateX(-50%) translateY(${tyArbres}px)`;

        // 3. Femme
        const pFemme = av(s, sM_femme, sM_femmeFin);
        mFemme.style.opacity   = pFemme;
        mFemme.style.transform = `translateX(-50%) translateY(${offsetFinal}px)`;

        // 4. Zoom 2 sur femme+arbres
        const pZoom2 = av(s, sM_zoom2, sM_zoom2Fin);
        if (pZoom2 > 0) {
            const scaleZ  = lerp(1, 2.5, pZoom2);
            const originY = window.innerHeight + offsetFinal;
            sceneMaison.style.transformOrigin = `50% ${originY}px`;
            sceneMaison.style.transform       = `scale(${scaleZ})`;
        } else {
            sceneMaison.style.transformOrigin = '';
            sceneMaison.style.transform       = '';
        }

    /* ──────────────────────────────
       TRANSITION : maison → bio
       
       Stratégie z-index :
         sceneBio    = z-index 25  (CSS fixe, TOUJOURS derrière)
         sceneChantier = z-index 30
         sceneMaison   = z-index 40
       
       On affiche sceneBio en display:block (derrière),
       puis on fait disparaître chantier+maison via opacity.
       La bio se révèle naturellement en dessous.
       
       sT_debut → sT_fin  (600px) : route/arbres/femme descendent
       sT_fin   → sFade_fin (200px) : chantier+maison fondent en noir
    ────────────────────────────── */
    } else if (s >= sT_debut && s < sFade_fin) {
        /* ── Bio affichée en arrière-plan (z-index 25, derrière tout) ── */
        sceneBio.style.display = 'block';
        sceneBio.style.opacity = '1';
        /* Éléments bio à leur position initiale, immobiles pendant la transition */
        arbre1.style.transform  = 'translateX(0)';
        arbre1.style.opacity    = '1';
        arbre2.style.transform  = 'translateX(0)';
        arbre2.style.opacity    = '1';
        fond.style.transform    = 'translateX(0)';
        mec.style.transform     = 'translateX(0)';
        arbreD.style.transform  = 'translateX(0)';
        arbre3.style.transform  = 'translateX(0)';
        planter.style.transform = 'translateX(0)';

        /* ── Chantier : fond de la scène maison → opacité 0 immédiatement ── */
        sceneChantier.style.transformOrigin = 'center right';
        sceneChantier.style.transform       = 'scale(2.5)';
        sceneChantier.style.visibility      = 'visible';
        sceneChantier.style.opacity         = '0';   /* fond noir dès le 1er pixel */

        /* ── Maison reste devant (z-index 40), fond transparent ── */
        sceneMaison.style.display           = 'block';
        sceneMaison.style.opacity           = '1';

        /* La maison garde son zoom 2.5 final pour éviter tout saut visuel */
        const routeH_T      = mRoute.offsetHeight || 0;
        const offsetFinal_T = -routeH_T + window.innerHeight * 0.10;
        const originY_T     = window.innerHeight + offsetFinal_T;
        sceneMaison.style.transformOrigin = `50% ${originY_T}px`;
        sceneMaison.style.transform       = 'scale(2.5)';

        /* ── Descente éléments (sT_debut → sT_fin) ── */
        const pSortie  = av(s, sT_debut, sT_fin);
        const tySortie = pSortie * window.innerHeight;

        mRoute.style.opacity   = lerp(1, 0, pSortie);
        mRoute.style.transform = `translateX(-50%) translateY(${tySortie}px)`;

        mArbres.style.opacity   = lerp(1, 0, pSortie);
        mArbres.style.transform = `translateX(-50%) translateY(${offsetFinal_T + tySortie}px)`;

        mFemme.style.opacity   = lerp(1, 0, pSortie);
        mFemme.style.transform = `translateX(-50%) translateY(${offsetFinal_T + tySortie}px)`;

        /* ── Fondu maison (sT_fin → sFade_fin) ── */
        const pFade = av(s, sT_fin, sFade_fin);
        sceneMaison.style.opacity = lerp(1, 0, pFade);

    /* ──────────────────────────────
       PHASE BIO
    ────────────────────────────── */
    } else if (s >= sFade_fin) {
        /* Nettoyer les scènes précédentes */
        sceneChantier.style.visibility = 'hidden';
        sceneChantier.style.opacity    = '1'; /* reset pour réutilisation éventuelle */
        sceneMaison.style.display      = 'none';
        sceneMaison.style.opacity      = '1';

        sceneBio.style.display = 'block';
        sceneBio.style.opacity = '1';

        majBio(s);

    } else {
        /* ── État initial (avant phase 5) ── */
        sceneMaison.style.display  = 'none';
        sceneMaison.style.opacity  = '1';
        mRoute.style.opacity       = 0;
        mRoute.style.transform     = 'translateX(-50%) translateY(100vh)';
        mArbres.style.opacity      = 0;
        mArbres.style.transform    = `translateX(-50%) translateY(${-window.innerHeight}px)`;
        mFemme.style.opacity       = 0;
        mFemme.style.transform     = 'translateX(-50%) translateY(0)';
        sceneBio.style.display     = 'none';
    }
}

/* ════════════════════════════════════
   BOUCLE BIO
   Logique d'origine de bio.js intégrée.
   s = scrollActuel absolu (inclut tout le scroll amont)
════════════════════════════════════ */
function majBio(s) {
    /* Scroll relatif à l'entrée de la bio */
    const sRel = s - sFade_fin;

    /* Durées relatives (calquées sur les repères d'origine) */
    const debutSortieArbres  = sB_arbresSortie - sFade_fin;   // ~1500
    const debutSlide         = sB_slideDroite  - sFade_fin;   // ~1500
    const finSlide           = sB_slideFinale  - sFade_fin;   // ~9500

    /* ── Sortie des arbres d'intro ──
       arbre2 (droite) part en premier.
       arbre1 (gauche) démarre avec un décalage de 200px de scroll. */
    const decalageArbre1  = 200; // px de scroll de retard
    const finSortie       = debutSortieArbres - 100;

    const pSortieArbre2 = av(sRel, 0,              finSortie);
    const pSortieArbre1 = av(sRel, decalageArbre1, finSortie + decalageArbre1);

    arbre1.style.transform = `translateX(${lerp(0, -120, pSortieArbre1)}vw)`;
    arbre1.style.opacity   = lerp(1, 0, pSortieArbre1);
    arbre2.style.transform = `translateX(${lerp(0, 80,   pSortieArbre2)}vw)`;
    arbre2.style.opacity   = lerp(1, 0, pSortieArbre2);
    mec.style.transform    = `translateY(${lerp(0, -10,  pSortieArbre2)}vh)`;

    /* ── Slide panoramique vers la droite ── */
    const pSlide = av(sRel, debutSlide, finSlide);
    fond.style.transform   = `translateX(${lerp(0, -220, pSlide)}vw)`;
    mec.style.transform    = `translateX(${lerp(0, -220, pSlide)}vw)`;
    arbreD.style.transform = `translateX(${lerp(0, -220, pSlide)}vw)`;
    arbre3.style.transform = `translateX(${lerp(0, -220, pSlide)}vw)`;
    planter.style.transform= `translateX(${lerp(0, -220, pSlide)}vw)`;
}