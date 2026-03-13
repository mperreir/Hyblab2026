window.Calibrator = (() => {

  let calibMode   = false;
  let calibPoints = [];   // { phi, theta, sx, sy }  — sx/sy = screen coords at click time
  let IMAGE_PATH  = '';
  let rendererEl  = null;
  let currentId   = 'new_hotspot';

  // ── SVG overlay for live preview ──────────────────────────────
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.cssText = `
    position: fixed; inset: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 900;
    display: none;
  `;

  const polyFill = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polyFill.setAttribute('fill', 'rgba(0, 255, 136, 0.20)');

  const polyStroke = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polyStroke.setAttribute('fill', 'none');
  polyStroke.setAttribute('stroke', '#00ff88');
  polyStroke.setAttribute('stroke-width', '2');
  polyStroke.setAttribute('stroke-dasharray', '6 3');

  const dotGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  const closingLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  closingLine.setAttribute('stroke', '#00ff88');
  closingLine.setAttribute('stroke-width', '1.5');
  closingLine.setAttribute('stroke-dasharray', '4 4');
  closingLine.setAttribute('opacity', '0.6');

  svg.appendChild(polyFill);
  svg.appendChild(polyStroke);
  svg.appendChild(closingLine);
  svg.appendChild(dotGroup);
  document.body.appendChild(svg);

  // ── Helpers ───────────────────────────────────────────────────
  const toggle = () => document.getElementById('calib-toggle');
  const panel  = () => document.getElementById('calib-panel');
  const cross  = () => document.getElementById('calib-crosshair');
  const coords = () => document.getElementById('calib-coords');
  const list   = () => document.getElementById('calib-list');
  const hint   = () => document.getElementById('hint');

  function updateSVG(mouseX, mouseY) {
    if (!calibPoints.length) {
      polyFill.setAttribute('points', '');
      polyStroke.setAttribute('points', '');
      dotGroup.innerHTML = '';
      closingLine.setAttribute('x1', 0); closingLine.setAttribute('x2', 0);
      closingLine.setAttribute('y1', 0); closingLine.setAttribute('y2', 0);
      return;
    }

    const pts = calibPoints.map(p => `${p.sx},${p.sy}`).join(' ');
    polyFill.setAttribute('points', pts);
    polyStroke.setAttribute('points', pts);

    // Numbered dots at each clicked point
    dotGroup.innerHTML = '';
    calibPoints.forEach((p, i) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', p.sx);
      circle.setAttribute('cy', p.sy);
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', '#00ff88');
      circle.setAttribute('stroke', '#fff');
      circle.setAttribute('stroke-width', '1.5');

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', p.sx + 8);
      label.setAttribute('y', p.sy + 4);
      label.setAttribute('fill', '#fff');
      label.setAttribute('font-size', '11');
      label.setAttribute('font-family', 'monospace');
      label.textContent = i + 1;

      dotGroup.appendChild(circle);
      dotGroup.appendChild(label);
    });

    // Dashed line from last point to mouse cursor
    if (mouseX !== undefined) {
      const last = calibPoints[calibPoints.length - 1];
      closingLine.setAttribute('x1', last.sx);
      closingLine.setAttribute('y1', last.sy);
      closingLine.setAttribute('x2', mouseX);
      closingLine.setAttribute('y2', mouseY);
    }
  }

  // ── Drag-to-move panel ────────────────────────────────────────
  function initDrag() {
    const el     = panel();
    const header = el.querySelector('h3');
    if (!header) return;
    header.style.cursor = 'grab';
    let dragging = false, startX, startY, origLeft, origTop;
    header.addEventListener('mousedown', e => {
      e.preventDefault();
      dragging = true;
      header.style.cursor = 'grabbing';
      const rect = el.getBoundingClientRect();
      origLeft = rect.left; origTop = rect.top;
      startX = e.clientX;  startY  = e.clientY;
      el.style.right = 'auto'; el.style.bottom = 'auto';
      el.style.left  = origLeft + 'px'; el.style.top = origTop + 'px';
    });
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      const maxLeft = window.innerWidth  - el.offsetWidth;
      const maxTop  = window.innerHeight - el.offsetHeight;
      el.style.left = Math.max(0, Math.min(maxLeft, origLeft + e.clientX - startX)) + 'px';
      el.style.top  = Math.max(0, Math.min(maxTop,  origTop  + e.clientY - startY)) + 'px';
    });
    window.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      header.style.cursor = 'grab';
    });
  }

  // ── Init ──────────────────────────────────────────────────────
  function init(imagePath, renderer) {
    IMAGE_PATH = imagePath;
    rendererEl = renderer.domElement;

    toggle().addEventListener('click', () => setMode(!calibMode));
    document.getElementById('calib-close-btn').addEventListener('click', () => setMode(false));
    document.getElementById('calib-clear').addEventListener('click', clearAll);
    document.getElementById('calib-export').addEventListener('click', exportPolygon);

    // ID input field
    const idInput = document.createElement('input');
    idInput.type        = 'text';
    idInput.placeholder = 'ID du hotspot (ex: livre)';
    idInput.style.cssText = `
      width: 100%; box-sizing: border-box;
      margin-bottom: 8px; padding: 5px 8px;
      background: #1a1a2e; color: #eee;
      border: 1px solid #444; border-radius: 4px;
      font-size: 12px;
    `;
    idInput.addEventListener('input', e => { currentId = e.target.value.trim() || 'new_hotspot'; });
    coords().parentNode.insertBefore(idInput, coords());

    initDrag();

    // Mouse move: crosshair + live dashed line to cursor
    window.addEventListener('mousemove', e => {
      if (!calibMode) return;
      cross().style.left = e.clientX + 'px';
      cross().style.top  = e.clientY + 'px';
      updateSVG(e.clientX, e.clientY);
    });
  }

  function isActive() { return calibMode; }

  // addPoint now also receives screen coords from main.js click event
  function addPoint(phi, theta, screenX, screenY) {
    calibPoints.push({
      phi:   +phi.toFixed(4),
      theta: +theta.toFixed(4),
      sx:    screenX ?? window.innerWidth  / 2,
      sy:    screenY ?? window.innerHeight / 2,
    });
    coords().innerHTML =
      `✅ Point ${calibPoints.length} — phi=<b>${phi.toFixed(4)}</b>  θ=<b>${theta.toFixed(4)}</b>`;
    renderList();
    updateSVG();
  }

  function setMode(on) {
    calibMode = on;
    toggle().classList.toggle('active', on);
    panel().classList.toggle('on', on);
    cross().classList.toggle('on', on);
    svg.style.display = on ? 'block' : 'none';
    if (rendererEl) rendererEl.style.cursor = on ? 'crosshair' : 'grab';
    if (hint()) hint().style.display = on ? 'none' : '';
    if (on) coords().textContent = '▶ Entrez un ID puis cliquez sur les bords de l\'objet.';
    if (!on) { clearAll(); }
  }

  function clearAll() {
    calibPoints = [];
    renderList();
    updateSVG();
    coords().textContent = '▶ Entrez un ID puis cliquez sur les bords de l\'objet.';
  }

  function renderList() {
    list().innerHTML = calibPoints.map((p, i) =>
      `<div class="calib-entry">
        <span><small>pt${i + 1} · phi=${p.phi}  θ=${p.theta}</small></span>
        <button class="calib-del" onclick="window.Calibrator._remove(${i})">✕</button>
      </div>`
    ).join('');
  }

  function exportPolygon() {
    if (!calibPoints.length) { alert('Aucun point enregistré.'); return; }

    const id = currentId;

    const pointsStr = calibPoints
      .map(p => `      { phi: ${p.phi}, theta: ${p.theta} }`)
      .join(',\n');

    const polygonBlock =
`
{
  id: '${id}',
  points: [
${pointsStr}
  ],
},`;

    const jsonBlock = JSON.stringify({
      id,
      article: { tag: '', title: '', description: '', link: '' }
    }, null, 2);

    const output = polygonBlock;

    const btn = document.getElementById('calib-export');
    navigator.clipboard.writeText(output)
      .then(() => {
        btn.textContent = '✅ Copié !';
        setTimeout(() => btn.textContent = '📋 Copier le JSON', 2200);
      })
      .catch(() => {
        const ta = document.createElement('textarea');
        ta.value = output; document.body.appendChild(ta);
        ta.select(); document.execCommand('copy');
        document.body.removeChild(ta);
      });
  }

  function _remove(i) {
    calibPoints.splice(i, 1);
    renderList();
    updateSVG();
  }

  return { init, isActive, addPoint, _remove };
})();