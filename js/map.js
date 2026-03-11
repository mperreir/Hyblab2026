/* ══════════════════════════════════════════
   map.js
   Handles the interactive SVG world map,
   country pins, and article side-panel.
══════════════════════════════════════════ */

/* ─── Simplified SVG path data per country ─── */
const MAP_PATHS = {
  us: {
    d: "M 120 160 L 240 155 L 250 175 L 235 200 L 220 215 L 190 220 L 165 215 L 145 210 L 120 200 Z",
    label: "États-Unis", cx: 185, cy: 185, countryKey: "usa"
  },
  fr: {
    d: "M 468 168 L 490 162 L 506 170 L 511 185 L 501 200 L 479 206 L 463 196 L 459 178 Z",
    label: "France", cx: 485, cy: 185, countryKey: "france"
  },
  gb: {
    d: "M 453 148 L 468 141 L 477 147 L 475 163 L 461 169 L 450 162 Z",
    label: "UK", cx: 463, cy: 155, countryKey: "uk"
  },
  ru: {
    d: "M 518 100 L 762 88 L 772 140 L 722 156 L 648 146 L 578 151 L 528 146 Z",
    label: "Russie", cx: 645, cy: 122, countryKey: "russia"
  },
  at: {
    d: "M 507 172 L 526 170 L 531 177 L 522 183 L 507 181 Z",
    label: "Autriche", cx: 519, cy: 177, countryKey: "austria"
  }
};

/* ─── Static world background continents ─── */
const WORLD_BACKGROUND = [
  { d: "M 55 130 L 260 120 L 280 130 L 290 160 L 270 210 L 250 240 L 220 260 L 180 265 L 150 260 L 120 250 L 90 220 L 60 180 Z", id: "bg_na" },
  { d: "M 160 270 L 230 265 L 250 290 L 255 340 L 240 390 L 210 420 L 175 430 L 155 400 L 145 360 L 148 310 Z", id: "bg_sa" },
  { d: "M 428 130 L 562 118 L 577 150 L 567 186 L 541 202 L 509 212 L 478 212 L 448 202 L 428 176 Z", id: "bg_eu" },
  { d: "M 453 216 L 561 212 L 576 242 L 571 312 L 556 362 L 531 392 L 501 402 L 469 396 L 448 362 L 438 302 L 443 251 Z", id: "bg_af" },
  { d: "M 568 88 L 842 78 L 872 118 L 862 172 L 822 196 L 768 202 L 718 196 L 678 212 L 638 202 L 598 192 L 568 172 L 558 141 Z", id: "bg_as" },
  { d: "M 738 312 L 822 304 L 852 332 L 846 372 L 820 388 L 778 382 L 748 362 L 738 336 Z", id: "bg_au" },
  { d: "M 288 58 L 372 53 L 388 78 L 376 112 L 350 122 L 308 116 L 288 94 Z", id: "bg_gl" }
];

/* ─── Build the SVG map ─── */
function buildMap() {
  const svg = document.getElementById('world-map-svg');
  svg.innerHTML = '';

  // Defs
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="#141b26"/>
      <stop offset="100%" stop-color="#0a0f16"/>
    </radialGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  `;
  svg.appendChild(defs);

  // Ocean background
  const ocean = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  ocean.setAttribute('width', '100%');
  ocean.setAttribute('height', '100%');
  ocean.setAttribute('fill', 'url(#bgGrad)');
  svg.appendChild(ocean);

  // Subtle grid lines
  for (let i = 0; i < 11; i++) {
    appendLine(svg, 0, i * 66, 1010, i * 66);
    appendLine(svg, i * 101, 0, i * 101, 660);
  }

  // World background shapes
  WORLD_BACKGROUND.forEach(shape => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', shape.d);
    path.setAttribute('class', 'country-path');
    path.setAttribute('id', shape.id);
    svg.appendChild(path);
  });

  // Active country paths + labels
  Object.entries(MAP_PATHS).forEach(([code, info]) => {
    const key = info.countryKey;
    const data = COUNTRY_DATA[key];
    if (!data) return;

    // Shape
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', info.d);
    path.setAttribute('class', 'country-path has-data');
    path.setAttribute('id', 'cpath-' + code);
    path.setAttribute('data-country', key);

    const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    titleEl.textContent = data.name + ' — ' + data.articles.length + ' article(s)';
    path.appendChild(titleEl);
    path.addEventListener('click', () => openMapPanel(key));
    svg.appendChild(path);

    // Country name label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', info.cx);
    text.setAttribute('y', info.cy + 4);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-family', 'IBM Plex Mono, monospace');
    text.setAttribute('font-size', '9');
    text.setAttribute('fill', 'rgba(244,239,230,0.75)');
    text.setAttribute('pointer-events', 'none');
    text.textContent = info.label;
    svg.appendChild(text);

    // Animated pin
    appendCountryPin(svg, info.cx, info.cy - 26, data.articles.length, key);
  });

  // USVI special pin (off continental shelf)
  appendSpecialPin(svg, 274, 218, 'usvi', 'USVI');
}

function appendLine(svg, x1, y1, x2, y2) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x1); line.setAttribute('y1', y1);
  line.setAttribute('x2', x2); line.setAttribute('y2', y2);
  line.setAttribute('stroke', 'rgba(255,255,255,0.025)');
  line.setAttribute('stroke-width', '1');
  svg.appendChild(line);
}

function appendCountryPin(svg, cx, cy, count, countryKey) {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('class', 'map-pin');
  g.setAttribute('data-country', countryKey);
  g.addEventListener('click', () => openMapPanel(countryKey));

  // Pulse ring
  const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  ring.setAttribute('cx', cx); ring.setAttribute('cy', cy);
  ring.setAttribute('r', '11');
  ring.setAttribute('fill', 'rgba(192,57,43,0.12)');
  ring.setAttribute('stroke', 'rgba(192,57,43,0.4)');
  ring.setAttribute('stroke-width', '1');
  ring.innerHTML = `
    <animate attributeName="r" values="9;16;9" dur="2.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite"/>
  `;

  // Dot
  const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  dot.setAttribute('cx', cx); dot.setAttribute('cy', cy);
  dot.setAttribute('r', '6');
  dot.setAttribute('class', 'pin-circle');

  // Article count
  const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  label.setAttribute('x', cx); label.setAttribute('y', cy + 4);
  label.setAttribute('class', 'pin-label');
  label.textContent = count;

  g.appendChild(ring);
  g.appendChild(dot);
  g.appendChild(label);
  svg.appendChild(g);
}

function appendSpecialPin(svg, x, y, countryKey, labelText) {
  const data = COUNTRY_DATA[countryKey];
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('class', 'map-pin');
  g.style.cursor = 'pointer';
  g.addEventListener('click', () => openMapPanel(countryKey));

  const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  ring.setAttribute('cx', x); ring.setAttribute('cy', y);
  ring.setAttribute('r', '9');
  ring.setAttribute('fill', 'rgba(184,134,11,0.18)');
  ring.setAttribute('stroke', 'rgba(184,134,11,0.55)');
  ring.setAttribute('stroke-width', '1');
  ring.innerHTML = `<animate attributeName="r" values="7;13;7" dur="3s" repeatCount="indefinite"/>`;

  const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  dot.setAttribute('cx', x); dot.setAttribute('cy', y);
  dot.setAttribute('r', '5');
  dot.setAttribute('fill', '#b8860b');
  dot.setAttribute('stroke', '#f4efe6');
  dot.setAttribute('stroke-width', '1.5');

  const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
  titleEl.textContent = data ? data.name + ' — ' + data.articles.length + ' article(s)' : labelText;

  const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  lbl.setAttribute('x', x + 13); lbl.setAttribute('y', y + 4);
  lbl.setAttribute('font-family', 'IBM Plex Mono, monospace');
  lbl.setAttribute('font-size', '8');
  lbl.setAttribute('fill', 'rgba(244,239,230,0.55)');
  lbl.textContent = labelText;

  g.appendChild(ring);
  g.appendChild(dot);
  g.appendChild(titleEl);
  g.appendChild(lbl);
  svg.appendChild(g);
}

/* ─── Open country side panel ─── */
function openMapPanel(countryKey) {
  const data = COUNTRY_DATA[countryKey];
  if (!data) return;

  document.getElementById('panel-flag').textContent    = data.flag;
  document.getElementById('panel-country').textContent = data.name;
  document.getElementById('panel-count').textContent   =
    data.articles.length + ' article' + (data.articles.length > 1 ? 's' : '') + ' lié' + (data.articles.length > 1 ? 's' : '');

  const container = document.getElementById('panel-articles');
  container.innerHTML = '';

  data.articles.forEach(a => {
    const item = document.createElement('div');
    item.className = 'panel-article-item';
    item.innerHTML = `
      <span class="pai-tag">${a.tag}</span>
      <span class="pai-title">${a.title}</span>
      <span class="pai-desc">${a.desc}</span>
      <span class="pai-open">Lire l'article →</span>
    `;
    item.addEventListener('click', () => openReader(a.id));
    container.appendChild(item);
  });

  document.getElementById('info-panel').classList.add('open');
  document.getElementById('map-tip').classList.add('hidden');

  // Highlight SVG paths
  document.querySelectorAll('.country-path.highlighted')
    .forEach(p => p.classList.remove('highlighted'));

  const codes = Object.entries(MAP_PATHS)
    .filter(([, v]) => v.countryKey === countryKey)
    .map(([code]) => code);

  codes.forEach(code => {
    const el = document.getElementById('cpath-' + code);
    if (el) el.classList.add('highlighted');
  });
}

/* ─── Close country panel ─── */
function closeMapPanel() {
  document.getElementById('info-panel').classList.remove('open');
  document.querySelectorAll('.country-path.highlighted')
    .forEach(p => p.classList.remove('highlighted'));
  document.getElementById('map-tip').classList.remove('hidden');
}
