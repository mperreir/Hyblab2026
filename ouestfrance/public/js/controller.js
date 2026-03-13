window.Controller = (() => {

  let camera, rendererEl;
  let isDragging = false;
  let prevX = 0, prevY = 0;
  let dragStartX = 0, dragStartY = 0;
  let lon = 0, lat = 0;

  const SPEED = 0.3;
  const LAT_LIMIT = 85;

  // Zoom
  let fov     = 75;
  const FOV_MIN = 30;
  const FOV_MAX = 100;

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
      fov += e.deltaY * 0.05;
      fov  = Math.max(FOV_MIN, Math.min(FOV_MAX, fov));
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
        fov -= (dist - lastPinchDist) * 0.1;
        fov  = Math.max(FOV_MIN, Math.min(FOV_MAX, fov));
        applyFov();
        lastPinchDist = dist;
      }
    }, { passive: true });

    rendererEl.addEventListener('touchend', e => {
      if (e.touches.length < 2) lastPinchDist = null;
    });

    rendererEl.addEventListener('mousedown', e => {
      if (window.Calibrator?.isActive()) return;
      isDragging = true;
      prevX = dragStartX = e.clientX;
      prevY = dragStartY = e.clientY;
      rendererEl.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', e => {
      if (!isDragging || window.Calibrator?.isActive()) return;
      lon -= (e.clientX - prevX) * SPEED;
      lat += (e.clientY - prevY) * SPEED;
      lat  = Math.max(-LAT_LIMIT, Math.min(LAT_LIMIT, lat));
      prevX = e.clientX;
      prevY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      rendererEl.style.cursor = 'grab';
    });

    // Touch
    rendererEl.addEventListener('touchstart', e => {
      if (window.Calibrator?.isActive()) return;
      const t = e.touches[0];
      isDragging = true;
      prevX = dragStartX = t.clientX;
      prevY = dragStartY = t.clientY;
    }, { passive: true });

    window.addEventListener('touchmove', e => {
      if (!isDragging || window.Calibrator?.isActive()) return;
      const t = e.touches[0];
      lon -= (t.clientX - prevX) * SPEED;
      lat += (t.clientY - prevY) * SPEED;
      lat  = Math.max(-LAT_LIMIT, Math.min(LAT_LIMIT, lat));
      prevX = t.clientX;
      prevY = t.clientY;
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });
  }

  function update() {
    if (!camera) return;
    const phi   = THREE.MathUtils.degToRad(90  - lat);
    const theta = THREE.MathUtils.degToRad(lon);
    camera.lookAt(
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta)
    );
  }

  function dragging()    { return isDragging; }
  function getDragStart(){ return { x: dragStartX, y: dragStartY }; }

  return { init, update, dragging, getDragStart };
})();