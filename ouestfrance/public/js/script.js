// ════════════════════════════════════════════════════════════════
//  360° OVERLAY
// ════════════════════════════════════════════════════════════════
function open360() {
  const f = document.getElementById('frame360');
  if (!f.src || f.src === window.location.href) f.src = 'epstein.html';
  document.getElementById('ov360').classList.add('open');
}

function close360() {
  document.getElementById('ov360').classList.remove('open');
}

// ════════════════════════════════════════════════════════════════
//  PANELS
// ════════════════════════════════════════════════════════════════
function openPanel(id)  { document.getElementById(id).classList.add('open'); }
function closePanel(id) { document.getElementById(id).classList.remove('open'); }

function closeAllPanels() {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('open'));
  close360();
}

function openActu() {
  renderActuList();
  openPanel('panel-actu');
}

function openSearch() {
  openPanel('panel-search');
  setTimeout(() => document.getElementById('search-input').focus(), 350);
}

// ════════════════════════════════════════════════════════════════
//  ARTICLES — chargés depuis data/articles.json
// ════════════════════════════════════════════════════════════════
let ARTICLES        = [];
let ARTICLE_DETAILS = {};

fetch('data/articles.json')
  .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
  .then(data => {
    ARTICLES        = data.articles       || [];
    ARTICLE_DETAILS = data.articleDetails || {};
    renderActuList();
  })
  .catch(err => console.error('Impossible de charger les articles :', err));

// ════════════════════════════════════════════════════════════════
//  ACTU LIST
// ════════════════════════════════════════════════════════════════
function renderActuList() {
  const el = document.getElementById('actu-list');
  if (!el) return;
  el.innerHTML = ARTICLES.map(a => `
    <a class="art-row" onclick="handleArtClick('${a.id}','${a.url.replace(/'/g,"\\'")}')">
      <div class="art-row-body">
        <div class="art-row-source"><div class="dot-red"></div><span>${a.source}</span><span>— ${a.date}</span></div>
        <div class="art-row-title">${escH(a.title)}</div>
      </div>
      <div class="art-row-img">${a.emoji}</div>
    </a>`
  ).join('');
}

function handleArtClick(id, url) {
  if (ARTICLE_DETAILS[id]) { openArticleDetail(id); return; }
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ════════════════════════════════════════════════════════════════
//  ARTICLE DETAIL
// ════════════════════════════════════════════════════════════════
function openArticleDetail(id) {
  const d = ARTICLE_DETAILS[id];
  if (!d) return;
  document.getElementById('art-hero-emoji').textContent = d.emoji || '🕸️';
  document.getElementById('art-title').textContent      = d.title;
  document.getElementById('art-date').textContent       = '— ' + (d.date || '');
  document.getElementById('art-lead').textContent       = d.lead;
  document.getElementById('art-cta-zone').innerHTML = d.url
    ? `<a href="${d.url}" target="_blank" rel="noopener" style="display:block;text-align:center;background:var(--red);color:#fff;border-radius:8px;padding:13px;font-size:14px;font-weight:800;text-decoration:none;">Lire l'article complet →</a>`
    : '';
  openPanel('panel-article');
}

// ════════════════════════════════════════════════════════════════
//  SEARCH
// ════════════════════════════════════════════════════════════════
function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
function escH(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function hl(text, q) {
  if (!q) return escH(text);
  const re = new RegExp(norm(q).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'g');
  const nt = norm(text);
  let res = '', last = 0, m;
  while ((m = re.exec(nt)) !== null) {
    res += escH(text.slice(last, m.index));
    res += `<em class="hl">${escH(text.slice(m.index, m.index + m[0].length))}</em>`;
    last = m.index + m[0].length;
  }
  return res + escH(text.slice(last));
}

function doSearch(val) {
  document.getElementById('search-clear').classList.toggle('vis', val.length > 0);
  const area = document.getElementById('search-results');
  const nv = norm(val.trim());
  if (!nv) {
    area.innerHTML = `<div class="search-empty"><div class="big">🔍</div><p>Entrez un mot-clé ou sélectionnez une suggestion</p></div>`;
    return;
  }
  const results = ARTICLES.filter(a => norm(a.title + ' ' + (a.tags || []).join(' ')).includes(nv));
  let html = `<div class="search-count"><strong>${results.length}</strong> résultat${results.length !== 1 ? 's' : ''} pour « ${escH(val.trim())} »</div>`;
  if (!results.length) {
    html += `<div class="search-empty"><div class="big">🤷</div><p>Aucun article trouvé.</p></div>`;
  } else {
    results.forEach(a => {
      const onclick = ARTICLE_DETAILS[a.id]
        ? `openArticleDetail('${a.id}')`
        : `window.open('${a.url.replace(/'/g,"\\'")}','_blank','noopener')`;
      html += `<a class="art-row" onclick="${onclick}">
        <div class="art-row-body">
          <div class="art-row-source"><div class="dot-red"></div><span>${a.source}</span><span>— ${a.date}</span></div>
          <div class="art-row-title">${hl(a.title, val.trim())}</div>
        </div>
        <div class="art-row-img">${a.emoji}</div>
      </a>`;
    });
  }
  area.innerHTML = html;
}

function clearSearch() {
  const inp = document.getElementById('search-input');
  inp.value = '';
  doSearch('');
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  inp.focus();
}

function setChip(el, kw) {
  const already = el.classList.contains('active');
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  const inp = document.getElementById('search-input');
  if (already) { inp.value = ''; doSearch(''); }
  else { el.classList.add('active'); inp.value = kw; doSearch(kw); }
}

// ════════════════════════════════════════════════════════════════
//  LIVE CLOCK
// ════════════════════════════════════════════════════════════════
function tick() {
  const n = new Date();
  document.getElementById('live-time').textContent =
    String(n.getHours()).padStart(2,'0') + ':' + String(n.getMinutes()).padStart(2,'0');
}
tick();
setInterval(tick, 30000);