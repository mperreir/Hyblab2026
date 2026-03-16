window.Controller = (() => {
  let camera, rendererEl;
  let isDragging = false;
  let prevX = 0, prevY = 0;
  let dragStartX = 0, dragStartY = 0;
  let lon = 250.2, lat = -10.2;
  const SPEED     = 0.3;
  const LAT_LIMIT = 85;
  const FOV_MIN   = 30;
  const FOV_MAX   = 100;
  let fov = 75;

  function applyFov() {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }

  function init(cam, renderer) {
    camera     = cam;
    rendererEl = renderer.domElement;

    // ── Mouse wheel zoom ──────────────────────────────────────
    rendererEl.addEventListener('wheel', e => {
      e.preventDefault();
      fov = Math.max(FOV_MIN, Math.min(FOV_MAX, fov + e.deltaY * 0.05));
      applyFov();
    }, { passive: false });

    // ── Pinch zoom (touch) ────────────────────────────────────
    let lastPinchDist = null;
    rendererEl.addEventListener('touchstart', e => {
      if (e.touches.length === 2) {
        lastPinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    rendererEl.addEventListener('touchmove', e => {
      if (e.touches.length === 2 && lastPinchDist !== null) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        fov = Math.max(FOV_MIN, Math.min(FOV_MAX, fov - (dist - lastPinchDist) * 0.1));
        applyFov();
        lastPinchDist = dist;
      }
    }, { passive: true });

    rendererEl.addEventListener('touchend', e => {
      if (e.touches.length < 2) lastPinchDist = null;
    });

    // ── Mouse drag ────────────────────────────────────────────
    rendererEl.addEventListener('mousedown', e => {
      isDragging = true;
      prevX = dragStartX = e.clientX;
      prevY = dragStartY = e.clientY;
      rendererEl.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      lon -= (e.clientX - prevX) * SPEED;
      lat  = Math.max(-LAT_LIMIT, Math.min(LAT_LIMIT, lat + (e.clientY - prevY) * SPEED));
      prevX = e.clientX;
      prevY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      rendererEl.style.cursor = 'grab';
    });

    // ── Touch drag ────────────────────────────────────────────
    rendererEl.addEventListener('touchstart', e => {
      const t = e.touches[0];
      isDragging = true;
      prevX = dragStartX = t.clientX;
      prevY = dragStartY = t.clientY;
    }, { passive: true });

    window.addEventListener('touchmove', e => {
      if (!isDragging) return;
      const t = e.touches[0];
      lon -= (t.clientX - prevX) * SPEED;
      lat  = Math.max(-LAT_LIMIT, Math.min(LAT_LIMIT, lat + (t.clientY - prevY) * SPEED));
      prevX = t.clientX;
      prevY = t.clientY;
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });
  }

  function update() {
    if (!camera) return;
    const phi   = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon);
    camera.lookAt(
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta)
    );
  }

  function dragging()     { return isDragging; }
  function getDragStart() { return { x: dragStartX, y: dragStartY }; }

  return { init, update, dragging, getDragStart };
})();