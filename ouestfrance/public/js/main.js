// ════════════════════════════════════════════════════════════════
//  CONFIG
// ════════════════════════════════════════════════════════════════
const CONFIG = {
  imagePath    : 'img/epstein.png',
  hoverColor   : 0x00ff88,
  clickColor   : 0xffd166,
  hoverOpacity : 0.35,
  clickOpacity : 0.55,
};

// ════════════════════════════════════════════════════════════════
//  THREE.JS SETUP
// ════════════════════════════════════════════════════════════════
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 0.001);

const sphereGeo = new THREE.SphereGeometry(500, 64, 40);
sphereGeo.scale(-1, 1, 1);

new THREE.TextureLoader().load(
  CONFIG.imagePath,
  tex => {
    scene.add(new THREE.Mesh(sphereGeo, new THREE.MeshBasicMaterial({ map: tex })));
    hideLoading();
  },
  xhr => {
    if (window.ovProgress) {
      window.ovProgress(Math.round(xhr.loaded / (xhr.total || 1) * 100));
    }
  },
  () => {
    // Fallback canvas if image fails to load
    const c = document.createElement('canvas');
    c.width = 2048; c.height = 1024;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#1a0808';
    ctx.fillRect(0, 0, 2048, 1024);
    ctx.fillStyle = 'rgba(240,160,90,.8)';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Image non trouvée — ' + CONFIG.imagePath, 1024, 512);
    scene.add(new THREE.Mesh(sphereGeo,
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c) })));
    hideLoading();
  }
);

// ════════════════════════════════════════════════════════════════
//  HOTSPOT REGISTRY
// ════════════════════════════════════════════════════════════════
const R             = 490;
const hotspotMeshes = [];
let   HOTSPOTS      = [];

function sph2cart(phi, theta) {
  return new THREE.Vector3(
    R * Math.sin(phi) * Math.sin(theta),
    R * Math.cos(phi),
    R * Math.sin(phi) * Math.cos(theta)
  );
}

function buildHotspots(list) {
  HOTSPOTS = list;
  HOTSPOTS.forEach(h => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(5, 16, 16),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
    );
    mesh.position.copy(sph2cart(h.phi, h.theta));
    mesh.userData = h;
    scene.add(mesh);
    hotspotMeshes.push(mesh);

    const label = document.createElement('div');
    label.className = 'hotspot-label';
    label.innerHTML = '';
    document.body.appendChild(label);
    h._label = label;
    h._mesh  = mesh;
  });
}

function buildPolygonHotspot(id, points, articleData) {
  const verts = points.map(p => sph2cart(p.phi, p.theta));

  const center = new THREE.Vector3();
  verts.forEach(v => center.add(v));
  center.divideScalar(verts.length);

  const positions = [];
  for (let i = 0; i < verts.length; i++) {
    const next = (i + 1) % verts.length;
    positions.push(center.x, center.y, center.z);
    positions.push(verts[i].x, verts[i].y, verts[i].z);
    positions.push(verts[next].x, verts[next].y, verts[next].z);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  geo.computeVertexNormals();

  const mat = new THREE.MeshBasicMaterial({
    color: CONFIG.hoverColor, transparent: true, opacity: 0,
    side: THREE.DoubleSide, depthWrite: false,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.userData = { id, _isPolygon: true, _centroid: center.clone(), _mat: mat, article: articleData };
  scene.add(mesh);
  hotspotMeshes.push(mesh);
  return mesh;
}

// ════════════════════════════════════════════════════════════════
//  LOAD DATA + BUILD HOTSPOTS
// ════════════════════════════════════════════════════════════════
fetch('data/epstein-data.json')
  .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
  .then(data => {
    const polygonIds = POLYGON_ZONES.map(z => z.id);
    buildHotspots(data.hotspots.filter(h => !polygonIds.includes(h.id)));
    POLYGON_ZONES.forEach(zone => {
      const match = data.hotspots.find(h => h.id === zone.id);
      if (!match) { console.warn('Hotspot "' + zone.id + '" introuvable dans le JSON'); return; }
      buildPolygonHotspot(zone.id, zone.points, match.article);
    });
  })
  .catch(err => console.error('Impossible de charger les hotspots :', err));

// ════════════════════════════════════════════════════════════════
//  MODULES INIT
// ════════════════════════════════════════════════════════════════
Controller.init(camera, renderer);
Popup.init();

// ════════════════════════════════════════════════════════════════
//  PROGRESS TRACKING
// ════════════════════════════════════════════════════════════════
const TOTAL_OBJECTS = 18;
const visitedIds    = new Set();
// expose for popup.js
window.TOTAL_OBJECTS = TOTAL_OBJECTS;
window.visitedIds    = visitedIds;

function markVisited(id) {
  if (visitedIds.has(id)) return;
  visitedIds.add(id);
  const found   = document.getElementById('progress-found');
  const counter = document.getElementById('progress-counter');
  if (found) found.textContent = visitedIds.size;
  // when all visited, make counter tappable to reopen completion
  if (visitedIds.size >= TOTAL_OBJECTS && counter) {
    counter.style.cursor       = 'pointer';
    counter.style.pointerEvents = 'auto';
    counter.title              = 'Revoir les résultats';
    counter.addEventListener('click', () => {
      if (window.openCompletion) window.openCompletion();
    }, { once: false });
  }
  // completion fires when popup is closed, not here
}

// ════════════════════════════════════════════════════════════════
//  RAYCASTING + HOVER / CLICK STATE
// ════════════════════════════════════════════════════════════════
const raycaster   = new THREE.Raycaster();
const mouse       = new THREE.Vector2();
const tempV       = new THREE.Vector3();
let   hoveredMesh = null;
let   activeMesh  = null;
const readIds = new Set(); // tracks visited by id, not mesh

function setPolygonState(mesh, state) {
  if (!mesh || !mesh.userData._isPolygon) return;
  const mat    = mesh.userData._mat;
  const isRead = readIds.has(mesh.userData.id);
  if      (state === 'idle')   { mat.color.setHex(isRead ? CONFIG.clickColor : CONFIG.hoverColor); mat.opacity = isRead ? 0.55 : 0; }
  else if (state === 'hover')  { mat.color.setHex(isRead ? CONFIG.clickColor : CONFIG.hoverColor); mat.opacity = CONFIG.hoverOpacity; }
  else if (state === 'active') { mat.color.setHex(CONFIG.clickColor); mat.opacity = CONFIG.clickOpacity; readIds.add(mesh.userData.id); }
}

function handleTap(clientX, clientY) {
  const ds = Controller.getDragStart();
  if (Math.hypot(clientX - ds.x, clientY - ds.y) > 5) return;

  mouse.x =  (clientX / window.innerWidth)  * 2 - 1;
  mouse.y = -(clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const hits = raycaster.intersectObjects(hotspotMeshes);
  if (!hits.length) {
    if (activeMesh) { setPolygonState(activeMesh, 'idle'); activeMesh = null; }
    return;
  }

  const mesh = hits[0].object;
  if (mesh.userData._isPolygon) {
    if (activeMesh && activeMesh !== mesh) setPolygonState(activeMesh, 'idle');
    activeMesh = mesh;
    setPolygonState(mesh, 'active');
    // refresh all sibling meshes sharing the same id (e.g. corde x3)
    hotspotMeshes.forEach(m => {
      if (m !== mesh && m.userData.id === mesh.userData.id) setPolygonState(m, 'idle');
    });
  }
  if (mesh.userData.id) markVisited(mesh.userData.id);
  Popup.open(mesh.userData);
}

renderer.domElement.addEventListener('mousemove', e => {
  if (Controller.dragging()) {
    if (hoveredMesh && hoveredMesh !== activeMesh) setPolygonState(hoveredMesh, 'idle');
    hoveredMesh = null;
    renderer.domElement.style.cursor = 'grabbing';
    return;
  }

  mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const hit     = raycaster.intersectObjects(hotspotMeshes)[0];
  const hitMesh = hit ? hit.object : null;

  if (hitMesh !== hoveredMesh) {
    if (hoveredMesh && hoveredMesh !== activeMesh) setPolygonState(hoveredMesh, 'idle');
    hoveredMesh = hitMesh;
    if (hoveredMesh && hoveredMesh !== activeMesh) setPolygonState(hoveredMesh, 'hover');
    renderer.domElement.style.cursor = hoveredMesh
      ? 'pointer' : 'grab';
  }

  if (hoveredMesh && hoveredMesh.userData._isPolygon && hoveredMesh !== activeMesh) {
    setPolygonState(hoveredMesh, 'hover');
  }
});

renderer.domElement.addEventListener('click',    e => handleTap(e.clientX, e.clientY));
renderer.domElement.addEventListener('touchend', e => {
  if (Controller.dragging()) return;
  const t = e.changedTouches[0];
  handleTap(t.clientX, t.clientY);
}, { passive: true });

// ════════════════════════════════════════════════════════════════
//  LABELS (point hotspots)
// ════════════════════════════════════════════════════════════════
function updateLabels() {
  HOTSPOTS.forEach(h => {
    if (!h._mesh || !h._label) return;
    tempV.copy(h._mesh.position).project(camera);
    if (tempV.z > 1) { h._label.style.opacity = '0'; return; }
    h._label.style.opacity = '1';
    h._label.style.left    = ((tempV.x * .5 + .5) * window.innerWidth)  + 'px';
    h._label.style.top     = ((-tempV.y * .5 + .5) * window.innerHeight) + 'px';
  });
}

// ════════════════════════════════════════════════════════════════
//  ANIMATION LOOP
// ════════════════════════════════════════════════════════════════
function animate() {
  requestAnimationFrame(animate);
  Controller.update();
  updateLabels();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ════════════════════════════════════════════════════════════════
//  HIDE LOADING
// ════════════════════════════════════════════════════════════════
function hideLoading() {
  if (window.ovHide) window.ovHide();
}