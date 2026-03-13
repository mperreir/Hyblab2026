"use strict";

const pointsInterets = [
  {
    label: "vue globale",
    cx: 1500, cy: 1000,
    zoom: 0.5
  },
  {
    label: "Ciel",
    cx: 500, cy: 500,
    zoom: 1.6
  }
]

const mapContainer = document.getElementById("map-container");
const sceneContainer = document.getElementById("scene-container");

function easeInOut(t) {
  return t < 0.5 ? (4 * (t) ** 3) : 1 - ((-2 * t + 2) ** 3) / 2;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function getTransform(pi) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scale = pi.zoom;

  const tx = vw / 2 - pi.cx * scale;
  const ty = vh / 2 - pi.cy * scale;

  return { tx, ty, scale };
}

function interpolateTransform(piA, piB, t) {
  const e = easeInOut(t);
  const tA = getTransform(piA);
  const tB = getTransform(piB);
  return { tx: lerp(tA.tx, tB.tx, e), ty: lerp(tA.ty, tB.ty, e), scale: lerp(tA.scale, tB.scale, e) };
}

function applyTransform(tx, ty, scale) {
  mapContainer.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
  mapContainer.style.transformOrigin = '0 0';
}

const nbSegments = pointsInterets.length - 1;
const stopSections = 0.15;

function onScroll() {
  const scrollTop = window.scrollY;

  const totalScrollable = sceneContainer.offsetHeight - window.innerHeight;
  const progress = Math.max(scrollTop / totalScrollable, 0);//Math.min(Math.max(scrollTop / totalScrollable, 0), 1);

  const segmentSize = 1 / nbSegments;
  const rawSegment = progress / segmentSize;
  const segIndex = Math.floor(rawSegment);//Math.min(Math.floor(rawSegment), nbSegments - 1);
  const segProgress = rawSegment - segIndex;

  let t;
  if (segProgress < stopSections) {
    t = 0;
  } else if (segProgress > 1 - stopSections) {
    t = 1;
  } else {
    t = (segProgress - stopSections) / (1 - 2 * stopSections);
  }

  const piA = pointsInterets[segIndex];
  const piB = pointsInterets[segIndex + 1];
  const { tx, ty, scale } = interpolateTransform(piA, piB, t);
  applyTransform(tx, ty, scale);
}

function init() {
  const pi0 = pointsInterets[0];
  console.log(pi0);
  const { tx, ty, scale } = getTransform(pi0);
  applyTransform(tx, ty, scale);
}

window.addEventListener('scroll', onScroll);

init();