# Descriptif du projet

Porteur de projet : Ouest-France

Sujet : Affaire Epstein — Expérience immersive 360°

Nom d'équipe : HybLab Nantes 2025

Participants :

- EDNA :  SAUVE Louis ·  POLIDAT Edouard · GERMAIN Mateo
- Polytech : REBAI Mehdi · RIDAOUI Moncef · GONDJE-DACKA Créptus Jacob · RMEILLI Hamza · *YAHYA Mouhamed Mahmoud*

## Description

Expérience web immersive permettant d'explorer en 360° une reconstitution de l'appartement new-yorkais de Jeffrey Epstein. L'utilisateur navigue dans la scène à la souris ou au doigt et découvre 18 objets clés, chacun lié à un article d'investigation publié par Ouest-France. Une fois tous les objets trouvés, une fiche de complétion invite à poursuivre l'enquête sur le site Ouest-France et via la boîte Jmail d'Epstein.

## Stack technique

- Three.js (r128) — rendu WebGL de la sphère 360°
- HTML / CSS / JavaScript vanilla — aucun framework
- Données : `data/epstein-data.json` — contenu éditorial et coordonnées des hotspots
- Zones interactives : polygones sphériques définis dans `js/polygone-zones.js`

## Structure du projet
```
public/
├── css/
│   ├── epstein-style.css   # styles du viewer 360°
│   └── style.css           # styles de la page d'intro
├── data/
│   ├── images/             # photos des 18 objets
│   └── epstein-data.json   # contenu éditorial
├── img/                    # logos et assets graphiques
├── js/
│   ├── controller.js       # gestion caméra (drag, pinch, zoom)
│   ├── main.js             # initialisation Three.js et hotspots
│   ├── polygone-zones.js   # coordonnées sphériques des zones \
│   └── popup.js            # logique du panneau de détail
├── epstein.html            # viewer 360°
└── index.html              # page d'introduction (2 slides)
```

## Instructions de déploiement

Le projet est entièrement statique, aucune dépendance serveur n'est requise.

1. Déposer le contenu du dossier `public/` sur n'importe quel serveur HTTP statique (Apache, Nginx, GitHub Pages, Netlify…)
2. S'assurer que le fichier `img/epstein.png` (texture 360°) est bien présent — c'est l'asset le plus lourd du projet
3. Accéder via `index.html` — la page d'intro redirige automatiquement vers `epstein.html`

> Le viewer nécessite WebGL. Il fonctionne sur tous les navigateurs modernes (Chrome, Safari, Firefox) sur mobile et desktop.