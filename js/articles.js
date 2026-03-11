/* ══════════════════════════════════════════
   articles.js
   Handles article grid rendering, search,
   filter logic, and in-site reader modal.
══════════════════════════════════════════ */

let currentFilter = 'all';
let currentSearch = '';

/* ─── Highlight search terms in text ─── */
function highlight(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

/* ─── Filter + search articles ─── */
function getFilteredArticles() {
  let list = currentFilter === 'all'
    ? ARTICLES
    : ARTICLES.filter(a => a.categories.includes(currentFilter));

  if (currentSearch.trim()) {
    const q = currentSearch.toLowerCase().trim();
    list = list.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.desc.toLowerCase().includes(q) ||
      a.tag.toLowerCase().includes(q) ||
      a.categories.some(c => c.includes(q)) ||
      a.countries.some(c => c.includes(q))
    );
  }
  return list;
}

/* ─── Render articles grid ─── */
function renderArticles() {
  const grid = document.getElementById('articles-grid');
  const info = document.getElementById('search-results-info');
  const list = getFilteredArticles();

  grid.innerHTML = '';

  // Result count message
  if (currentSearch.trim()) {
    info.innerHTML = list.length > 0
      ? `<strong>${list.length}</strong> article${list.length > 1 ? 's' : ''} trouvé${list.length > 1 ? 's' : ''} pour <strong>"${currentSearch}"</strong>`
      : `Aucun résultat pour <strong>"${currentSearch}"</strong>`;
  } else {
    info.innerHTML = '';
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔎</div>
        <p>Aucun article ne correspond à <strong>"${currentSearch}"</strong>.</p>
        <p style="margin-top:8px;font-size:12px;">Essayez : Brunel, Paris, finance, Clinton, île…</p>
      </div>
    `;
    return;
  }

  const q = currentSearch.trim();

  list.forEach((a, i) => {
    const card = document.createElement('div');
    card.className = 'article-card' + (a.featured && !q ? ' featured' : '');
    card.style.animation = 'fadeIn 0.35s ease both';
    card.style.animationDelay = Math.min(i * 30, 300) + 'ms';

    const titleHL  = highlight(a.title, q);
    const descHL   = highlight(a.desc, q);
    const tagHL    = highlight(a.tag, q);

    if (a.featured && !q) {
      card.innerHTML = `
        <div>
          <span class="article-tag">${tagHL}</span>
          <h3>${titleHL}</h3>
          <p>${descHL}</p>
          <div class="article-meta">
            <span class="article-meta-left">Ouest-France · ${a.date}</span>
            <button class="article-read-btn" onclick="openReader(${a.id}, event)">Lire l'article →</button>
          </div>
        </div>
        <div class="featured-visual">
          <div class="redacted-block">
            <div>CLIENT: <span class="blacked">XXXXXXXXXXXXXXXX</span></div>
            <div>STATUS: <span class="redline"></span></div>
            <div>FILE: <span class="blacked">CLASSIFIED</span></div>
            <div>NETWORK: <span class="blacked">███████████████</span></div>
            <div>CONTACTS: <span class="blacked">█████ ██████████</span></div>
            <div>CASE_NO: EP-19-2026-███</div>
          </div>
        </div>
      `;
    } else {
      card.innerHTML = `
        <span class="article-tag">${tagHL}</span>
        <h3>${titleHL}</h3>
        <p>${descHL}</p>
        <div class="article-meta">
          <span class="article-meta-left">Ouest-France · ${a.date}</span>
          <button class="article-read-btn" onclick="openReader(${a.id}, event)">Lire →</button>
        </div>
      `;
    }

    // Clicking the card opens the reader
    card.addEventListener('click', () => openReader(a.id));
    grid.appendChild(card);
  });
}

/* ─── Filter button handler ─── */
function filterCards(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = cat;
  renderArticles();
}

/* ─── Search handlers ─── */
function onSearch() {
  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear');
  currentSearch = input.value;
  clearBtn.classList.toggle('visible', currentSearch.length > 0);
  renderArticles();
}

function clearSearch() {
  const input = document.getElementById('search-input');
  input.value = '';
  currentSearch = '';
  document.getElementById('search-clear').classList.remove('visible');
  input.focus();
  renderArticles();
}

/* ─── Article Reader Modal ─── */
function openReader(articleId, event) {
  if (event) event.stopPropagation();

  const article = ARTICLES.find(a => a.id === articleId);
  if (!article) return;

  const modal    = document.getElementById('reader-modal');
  const title    = document.getElementById('reader-title');
  const tag      = document.getElementById('reader-tag');
  const extLink  = document.getElementById('reader-ext-link');
  const iframe   = document.getElementById('reader-iframe');
  const loading  = document.getElementById('reader-loading');
  const blocked  = document.getElementById('reader-blocked');
  const fbLink   = document.getElementById('reader-fallback-link');

  // Reset state
  title.textContent   = article.title;
  tag.textContent     = article.tag;
  extLink.href        = article.url;
  fbLink.href         = article.url;
  iframe.style.display = 'none';
  loading.style.display = 'flex';
  blocked.style.display = 'none';
  iframe.src = '';

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Attempt to load in iframe
  // Use a proxy approach — many news sites block iframes via X-Frame-Options
  // We load it and detect errors via timeout + error event
  let loaded = false;

  const timeout = setTimeout(() => {
    if (!loaded) {
      showBlocked(article.url);
    }
  }, 6000);

  iframe.onload = () => {
    loaded = true;
    clearTimeout(timeout);
    try {
      // If we can access the document, it loaded fine
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!doc || doc.body.innerHTML === '' || doc.title === '') {
        showBlocked(article.url);
      } else {
        loading.style.display = 'none';
        iframe.style.display = 'block';
      }
    } catch (e) {
      // Cross-origin — can't read, but may still display
      loading.style.display = 'none';
      iframe.style.display = 'block';
    }
  };

  iframe.onerror = () => {
    loaded = true;
    clearTimeout(timeout);
    showBlocked(article.url);
  };

  // Load through a CORS proxy for better iframe compatibility
  // Using allorigins as public proxy fallback
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(article.url)}`;
  iframe.src = proxyUrl;
}

function showBlocked(url) {
  document.getElementById('reader-loading').style.display = 'none';
  document.getElementById('reader-iframe').style.display = 'none';
  const blocked = document.getElementById('reader-blocked');
  blocked.style.display = 'flex';
  document.getElementById('reader-fallback-link').href = url;
}

function closeReader(event) {
  if (event && event.target !== document.getElementById('reader-modal')) return;
  document.getElementById('reader-modal').classList.remove('open');
  document.getElementById('reader-iframe').src = '';
  document.body.style.overflow = '';
}

// Allow closing reader from map panel too
function openReaderFromPanel(articleId) {
  // Close map panel first on mobile
  openReader(articleId);
}
