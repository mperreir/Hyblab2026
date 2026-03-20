const pinData = {
    E1: { left: 50, top: 81.5 },
    E2: { left: 39, top: 59 },
    E3: { left: 19, top: 21 },
    E4: { left: 75, top: 32 },
    E5: { left: 74, top: 43 },
    E6: { left: 22, top: 20.5 },
    E7: { left: 37, top: 62 },
    E8: { left: 40, top: 65 },
    E9: { left: 37, top: 55.5 },
    E10: { left: 35, top: 61 },
    E11: { left: 19, top: 28 },
    E12: { left: 72, top: 53.5 },
    E13: { left: 41, top: 55 },
    E14: { left: 27, top: 52.5 },
    E15: { left: 22, top: 30 },

    V1: { left: 3, top: 18},
    V2: { left: 20, top: 21},
    V3: { left: 40, top: 55},
    V4: { left: 47.5, top: 72.5},
    V5: { left: 72.5, top: 23},
    V6: { left: 73, top: 44},
    V7: { left: 87, top: 37},
};

const img = document.getElementById("regionMap");
const mapWrapper = document.getElementById("mapWrapper");

function getImageRenderedRect() {
    const rect = img.getBoundingClientRect();
    
    // Sécurité pour le SVG : si naturalWidth est 0, on utilise les valeurs du viewBox (1272/677)
    const nW = img.naturalWidth || 1272;
    const nH = img.naturalHeight || 677;
    
    const naturalRatio = nW / nH;
    const containerRatio = rect.width / rect.height;

    let renderedW, renderedH, offsetX, offsetY;

    if (containerRatio > naturalRatio) {
        renderedH = rect.height;
        renderedW = renderedH * naturalRatio;
        offsetX = (rect.width - renderedW) / 2;
        offsetY = 0;
    } else {
        renderedW = rect.width;
        renderedH = renderedW / naturalRatio;
        offsetX = 0;
        offsetY = (rect.height - renderedH) / 2;
    }

    return { renderedW, renderedH, offsetX, offsetY };
}

function placePins() {
    const { renderedW, renderedH, offsetX, offsetY } = getImageRenderedRect();

    for (const [id, coords] of Object.entries(pinData)) {
        const pin = document.getElementById(id);
        if (!pin) continue;

        // On positionne par rapport au coin haut-gauche de l'image réelle
        pin.style.left = (offsetX + (coords.left / 100) * renderedW) + "px";
        pin.style.top  = (offsetY + (coords.top  / 100) * renderedH) + "px";
    }
}

// Événements
window.addEventListener("load", placePins);
window.addEventListener("resize", placePins);
if (img.complete) {
    placePins();
} else {
    img.addEventListener("load", placePins);
}