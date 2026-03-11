// ════════════════════════════════════════════════════════════════
//  IMAGE 360°
// ════════════════════════════════════════════════════════════════
const IMAGE_PATH = 'hf_20260311_094348_7b413559-ef8f-49c6-9d32-a165eb3a2bc4.png';

// ════════════════════════════════════════════════════════════════
//  HOTSPOTS
// ════════════════════════════════════════════════════════════════
const HOTSPOTS = [
  {
    id: 'ordinateur',
    label: 'Ordinateur',
    phi: 1.689,
    theta: -2.5746,
    article: {
      category: 'Catégorie · Sous-catégorie',
      title: 'Ordinateur',
      description: 'Décrivez cet objet ici.',
      specs: [
        { label: 'Spec 1', value: 'Valeur 1' },
        { label: 'Spec 2', value: 'Valeur 2' },
        { label: 'Spec 3', value: 'Valeur 3' },
        { label: 'Spec 4', value: 'Valeur 4' },
      ]
    }
  },
  {
    id: 'tigre',
    label: 'Tigre',
    phi: 1.8029,
    theta: 2.9054,
    article: {
      category: 'Catégorie · Sous-catégorie',
      title: 'Tigre',
      description: 'Décrivez cet objet ici.',
      specs: [
        { label: 'Spec 1', value: 'Valeur 1' },
        { label: 'Spec 2', value: 'Valeur 2' },
        { label: 'Spec 3', value: 'Valeur 3' },
        { label: 'Spec 4', value: 'Valeur 4' },
      ]
    }
  },
  {
    id: 'lampe',
    label: 'Lampe',
    phi: 1.6062,
    theta: -3.0781,
    article: {
      category: 'Catégorie · Sous-catégorie',
      title: 'Lampe',
      description: 'Décrivez cet objet ici.',
      specs: [
        { label: 'Spec 1', value: 'Valeur 1' },
        { label: 'Spec 2', value: 'Valeur 2' },
        { label: 'Spec 3', value: 'Valeur 3' },
        { label: 'Spec 4', value: 'Valeur 4' },
      ]
    }
  },
  {
    id: 'cheminee',
    label: 'Cheminée',
    phi: 1.8285,
    theta: -1.6335,
    article: {
      category: 'Catégorie · Sous-catégorie',
      title: 'Cheminée',
      description: 'Décrivez cet objet ici.',
      specs: [
        { label: 'Spec 1', value: 'Valeur 1' },
        { label: 'Spec 2', value: 'Valeur 2' },
        { label: 'Spec 3', value: 'Valeur 3' },
        { label: 'Spec 4', value: 'Valeur 4' },
      ]
    }
  },
  {
    id: 'fauteuil',
    label: 'Fauteuil',
    phi: 1.9723,
    theta: -0.8785,
    article: {
      category: 'Catégorie · Sous-catégorie',
      title: 'Fauteuil',
      description: 'Décrivez cet objet ici.',
      specs: [
        { label: 'Spec 1', value: 'Valeur 1' },
        { label: 'Spec 2', value: 'Valeur 2' },
        { label: 'Spec 3', value: 'Valeur 3' },
        { label: 'Spec 4', value: 'Valeur 4' },
      ]
    }
  },
  {
    id: 'table_basse',
    label: 'Table basse',
    phi: 1.9077,
    theta: -0.4219,
    article: {
      category: 'Catégorie · Sous-catégorie',
      title: 'Table basse',
      description: 'Décrivez cet objet ici.',
      specs: [
        { label: 'Spec 1', value: 'Valeur 1' },
        { label: 'Spec 2', value: 'Valeur 2' },
        { label: 'Spec 3', value: 'Valeur 3' },
        { label: 'Spec 4', value: 'Valeur 4' },
      ]
    }
  },
  {
    id: 'tapis_persan',
    label: 'Tapis persan',
    phi: 2.3582,
    theta: 0.6514,
    article: {
      category: 'Catégorie · Sous-catégorie',
      title: 'Tapis persan',
      description: 'Décrivez cet objet ici.',
      specs: [
        { label: 'Spec 1', value: 'Valeur 1' },
        { label: 'Spec 2', value: 'Valeur 2' },
        { label: 'Spec 3', value: 'Valeur 3' },
        { label: 'Spec 4', value: 'Valeur 4' },
      ]
    }
  },
  {
    id: 'canape_rouge',
    label: 'Canapé rouge',
    phi: 1.8076,
    theta: -0.1755,
    article: {
      category: 'Catégorie · Sous-catégorie',
      title: 'Canapé rouge',
      description: 'Décrivez cet objet ici.',
      specs: [
        { label: 'Spec 1', value: 'Valeur 1' },
        { label: 'Spec 2', value: 'Valeur 2' },
        { label: 'Spec 3', value: 'Valeur 3' },
        { label: 'Spec 4', value: 'Valeur 4' },
      ]
    }
  },
  {
    id: 'lampe_doree',
    label: 'Lampe dorée',
    phi: 1.642,
    theta: 0.1429,
    article: {
      category: 'Catégorie · Sous-catégorie',
      title: 'Lampe dorée',
      description: 'Décrivez cet objet ici.',
      specs: [
        { label: 'Spec 1', value: 'Valeur 1' },
        { label: 'Spec 2', value: 'Valeur 2' },
        { label: 'Spec 3', value: 'Valeur 3' },
        { label: 'Spec 4', value: 'Valeur 4' },
      ]
    }
  },
  {
    id: 'porte',
    label: 'Porte',
    phi: 1.5087,
    theta: 1.5502,
    article: {
      category: 'Catégorie · Sous-catégorie',
      title: 'Porte',
      description: 'Décrivez cet objet ici.',
      specs: [
        { label: 'Spec 1', value: 'Valeur 1' },
        { label: 'Spec 2', value: 'Valeur 2' },
        { label: 'Spec 3', value: 'Valeur 3' },
        { label: 'Spec 4', value: 'Valeur 4' },
      ]
    }
  },
  {
    id: 'documents',
    label: 'Documents',
    phi: 1.8144,
    theta: -2.837,
    article: {
      category: 'Catégorie · Sous-catégorie',
      title: 'Documents',
      description: 'Décrivez cet objet ici.',
      specs: [
        { label: 'Spec 1', value: 'Valeur 1' },
        { label: 'Spec 2', value: 'Valeur 2' },
        { label: 'Spec 3', value: 'Valeur 3' },
        { label: 'Spec 4', value: 'Valeur 4' },
      ]
    }
  }
];

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

// Sphère inversée 360°
const sphereGeo = new THREE.SphereGeometry(500, 64, 40);
sphereGeo.scale(-1, 1, 1);

const loader = new THREE.TextureLoader();
loader.load(
  IMAGE_PATH,
  tex => {
    scene.add(new THREE.Mesh(sphereGeo, new THREE.MeshBasicMaterial({ map: tex })));
    hideLoading();
  },
  xhr => {
    document.getElementById('loading-bar').style.width =
      Math.round(xhr.loaded / (xhr.total || 1) * 100) + '%';
  },
  () => {
    // Texture de fallback si l'image est introuvable
    const c = document.createElement('canvas');
    c.width = 2048; c.height = 1024;
    const ctx = c.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, 2048, 1024);
    g.addColorStop(0,  '#1a0808');
    g.addColorStop(.5, '#2a1a08');
    g.addColorStop(1,  '#0a0a1a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 2048, 1024);
    for (let x = 0; x < 2048; x += 80) {
      ctx.strokeStyle = 'rgba(240,160,90,.05)';
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1024); ctx.stroke();
    }
    for (let y = 0; y < 1024; y += 80) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(2048, y); ctx.stroke();
    }
    ctx.fillStyle = 'rgba(240,160,90,.7)';
    ctx.font = 'bold 38px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚠  Image non trouvée — placez votre .png dans le même dossier', 1024, 490);
    ctx.fillStyle = 'rgba(255,255,255,.22)';
    ctx.font = '22px sans-serif';
    ctx.fillText(IMAGE_PATH, 1024, 545);
    scene.add(new THREE.Mesh(sphereGeo, new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c) })));
    hideLoading();
  }
);

// ── Hotspot meshes ──
const R = 490;
const hotspotMeshes = [];

function sph2cart(phi, theta) {
  return new THREE.Vector3(
    R * Math.sin(phi) * Math.sin(theta),
    R * Math.cos(phi),
    R * Math.sin(phi) * Math.cos(theta)
  );
}

HOTSPOTS.forEach(h => {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(5, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0x5cf0c8 })
  );
  mesh.position.copy(sph2cart(h.phi, h.theta));
  mesh.userData = h;
  scene.add(mesh);
  hotspotMeshes.push(mesh);

  const label = document.createElement('div');
  label.className = 'hotspot-label';
  label.innerHTML = `<div class="dot"></div><div class="tag">${h.label}</div>`;
  document.body.appendChild(label);
  h._label = label;
  h._mesh  = mesh;
});

// ════════════════════════════════════════════════════════════════
//  CONTRÔLES
// ════════════════════════════════════════════════════════════════
let isDragging = false;
let lon = 0, lat = 0, targetLon = 0, targetLat = 0;
let mdX = 0, mdY = 0, prevX = 0, prevY = 0;

renderer.domElement.addEventListener('mousedown', e => {
  isDragging = true;
  mdX = prevX = e.clientX;
  mdY = prevY = e.clientY;
  document.body.classList.add('dragging');
});
window.addEventListener('mouseup', () => {
  isDragging = false;
  document.body.classList.remove('dragging');
});
window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  targetLon -= (e.clientX - prevX) * 0.25;
  targetLat += (e.clientY - prevY) * 0.15;
  targetLat  = Math.max(-85, Math.min(85, targetLat));
  prevX = e.clientX; prevY = e.clientY;
});

renderer.domElement.addEventListener('touchstart', e => {
  isDragging = true;
  mdX = prevX = e.touches[0].clientX;
  mdY = prevY = e.touches[0].clientY;
});
window.addEventListener('touchend', () => { isDragging = false; });
window.addEventListener('touchmove', e => {
  if (!isDragging) return;
  targetLon -= (e.touches[0].clientX - prevX) * 0.25;
  targetLat += (e.touches[0].clientY - prevY) * 0.15;
  targetLat  = Math.max(-85, Math.min(85, targetLat));
  prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
});

renderer.domElement.addEventListener('wheel', e => {
  camera.fov = Math.max(30, Math.min(100, camera.fov + e.deltaY * 0.03));
  camera.updateProjectionMatrix();
}, { passive: true });

// ════════════════════════════════════════════════════════════════
//  RAYCASTING
// ════════════════════════════════════════════════════════════════
const raycaster = new THREE.Raycaster();
const mouse     = new THREE.Vector2();

renderer.domElement.addEventListener('click', e => {
  if (Math.hypot(e.clientX - mdX, e.clientY - mdY) > 5) return;
  mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  if (calibMode) {
    const dir = raycaster.ray.direction.clone().normalize();
    const phi   = Math.acos(Math.max(-1, Math.min(1, dir.y)));
    const theta = Math.atan2(dir.x, dir.z);
    addCalibPoint(phi, theta);
    return;
  }

  const hits = raycaster.intersectObjects(hotspotMeshes);
  if (hits.length > 0) openPopup(hits[0].object.userData);
});

renderer.domElement.addEventListener('mousemove', e => {
  if (isDragging || calibMode) return;
  mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  renderer.domElement.style.cursor =
    raycaster.intersectObjects(hotspotMeshes).length > 0 ? 'pointer' : 'grab';
});

// ════════════════════════════════════════════════════════════════
//  POPUP
// ════════════════════════════════════════════════════════════════
function openPopup(data) {
  const a = data.article;
  document.getElementById('popup-category').textContent    = a.category;
  document.getElementById('popup-title').textContent       = a.title;
  document.getElementById('popup-description').textContent = a.description;
  document.getElementById('popup-specs').innerHTML = (a.specs || []).map(s =>
    `<div class="spec-item">
      <div class="spec-label">${s.label}</div>
      <div class="spec-value">${s.value}</div>
    </div>`
  ).join('');
  document.getElementById('popup-overlay').classList.add('visible');
}

function closePopup() {
  document.getElementById('popup-overlay').classList.remove('visible');
}

document.getElementById('popup-close').addEventListener('click', closePopup);
document.getElementById('btn-close-popup').addEventListener('click', closePopup);
document.getElementById('popup-overlay').addEventListener('click', e => {
  if (e.target.id === 'popup-overlay') closePopup();
});

// ════════════════════════════════════════════════════════════════
//  LABEL PROJECTION 3D → 2D
// ════════════════════════════════════════════════════════════════
const tempV = new THREE.Vector3();

function updateLabels() {
  HOTSPOTS.forEach(h => {
    tempV.copy(h._mesh.position).project(camera);
    if (tempV.z > 1) { h._label.style.opacity = '0'; return; }
    h._label.style.opacity = '1';
    h._label.style.left = ((tempV.x * .5 + .5) * window.innerWidth)  + 'px';
    h._label.style.top  = ((-tempV.y * .5 + .5) * window.innerHeight) + 'px';
  });
}

// ════════════════════════════════════════════════════════════════
//  BOUCLE D'ANIMATION
// ════════════════════════════════════════════════════════════════
function animate() {
  requestAnimationFrame(animate);
  lon += (targetLon - lon) * 0.09;
  lat += (targetLat - lat) * 0.09;
  const phi   = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon);
  camera.lookAt(
    Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta)
  );
  const t = Date.now() * .003;
  hotspotMeshes.forEach((m, i) => m.scale.setScalar(1 + .14 * Math.sin(t + i * 1.6)));
  updateLabels();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function hideLoading() {
  document.getElementById('loading-bar').style.width = '100%';
  setTimeout(() => document.getElementById('loading').classList.add('hidden'), 400);
}

// ════════════════════════════════════════════════════════════════
//  CALIBRATION MODE
// ════════════════════════════════════════════════════════════════
let calibMode   = false;
let calibPoints = [];

const calibToggle = document.getElementById('calib-toggle');
const calibPanel  = document.getElementById('calib-panel');
const calibCross  = document.getElementById('calib-crosshair');

function setCalibMode(on) {
  calibMode = on;
  calibToggle.classList.toggle('active', on);
  calibPanel.classList.toggle('on', on);
  calibCross.classList.toggle('on', on);
  renderer.domElement.style.cursor = on ? 'crosshair' : 'grab';
  document.getElementById('hint').style.display = on ? 'none' : '';
  if (on) document.getElementById('calib-coords').textContent =
    '▶ Cliquez sur un objet pour obtenir ses coordonnées.';
}

calibToggle.addEventListener('click', () => setCalibMode(!calibMode));
document.getElementById('calib-close-btn').addEventListener('click', () => setCalibMode(false));

window.addEventListener('mousemove', e => {
  if (!calibMode) return;
  calibCross.style.left = e.clientX + 'px';
  calibCross.style.top  = e.clientY + 'px';
});

function addCalibPoint(phi, theta) {
  const name = prompt("Nom de l'objet :", 'Objet ' + (calibPoints.length + 1));
  if (!name) return;
  calibPoints.push({ name, phi: +phi.toFixed(4), theta: +theta.toFixed(4) });
  document.getElementById('calib-coords').innerHTML =
    `✅ <b>${name}</b> — phi = <b>${phi.toFixed(4)}</b>  /  theta = <b>${theta.toFixed(4)}</b>`;
  renderCalibList();
}

function renderCalibList() {
  document.getElementById('calib-list').innerHTML = calibPoints.map((p, i) =>
    `<div class="calib-entry">
      <span><b>${p.name}</b> &nbsp;<small style="opacity:.4">phi=${p.phi}  θ=${p.theta}</small></span>
      <button class="calib-del" onclick="removeCalib(${i})">✕</button>
    </div>`
  ).join('');
}

window.removeCalib = i => { calibPoints.splice(i, 1); renderCalibList(); };

document.getElementById('calib-clear').addEventListener('click', () => {
  calibPoints = [];
  renderCalibList();
  document.getElementById('calib-coords').textContent =
    '▶ Cliquez sur un objet pour obtenir ses coordonnées.';
});

document.getElementById('calib-export').addEventListener('click', () => {
  if (!calibPoints.length) { alert('Aucun point enregistré.'); return; }
  const code =
    `const HOTSPOTS = [\n` +
    calibPoints.map(p =>
`  {
    id: '${p.name.toLowerCase().replace(/\s+/g, '_')}',
    label: '${p.name}',
    phi: ${p.phi},
    theta: ${p.theta},
    article: {
      category: 'Catégorie · Sous-catégorie',
      title: '${p.name}',
      description: 'Décrivez cet objet ici.',
      specs: [
        { label: 'Spec 1', value: 'Valeur 1' },
        { label: 'Spec 2', value: 'Valeur 2' },
        { label: 'Spec 3', value: 'Valeur 3' },
        { label: 'Spec 4', value: 'Valeur 4' },
      ]
    }
  }`).join(',\n') +
    `\n];`;

  navigator.clipboard.writeText(code)
    .then(() => {
      const btn = document.getElementById('calib-export');
      btn.textContent = '✅ Copié dans le presse-papier !';
      setTimeout(() => btn.textContent = '📋 Copier le code JS', 2200);
    })
    .catch(() => {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      alert('Code copié !');
    });
});
