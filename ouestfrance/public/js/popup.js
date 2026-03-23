window.Popup = (() => {
  let _current = null;

  // ── Image preload cache ───────────────────────────────────────
  const _imgCache = {};

  function preloadImage(src) {
    if (!src || _imgCache[src]) return;
    const img = new Image();
    img.src = src;
    _imgCache[src] = img;
  }

  function preloadAll(hotspots) {
    (hotspots || []).forEach(h => {
      if (h.article?.objectImage) preloadImage(h.article.objectImage);
    });
  }

  function init() {
    document.getElementById('popup-close')
      .addEventListener('click', close);
    document.getElementById('popup-backdrop')
      .addEventListener('click', close);
  }

  function open(data) {
    _current = data;
    const a = data.article || {};

    document.getElementById('popup-title').textContent       = a.title       || '';
    document.getElementById('popup-description').textContent = a.description || '';

    // ── object image ─────────────────────────────────────────────
    const objWrap = document.getElementById('popup-object-img-wrap');
    const objImg  = document.getElementById('popup-object-img');
    if (a.objectImage) {
      if (objImg.getAttribute('src') !== a.objectImage) {
        objImg.src = a.objectImage;
      }
      objImg.alt            = a.title || '';
      document.getElementById('popup-blur-bg').style.backgroundImage = `url(${a.objectImage})`;
      objWrap.style.display = '';
    } else {
      objWrap.style.display = 'none';
      objImg.removeAttribute('src');
      document.getElementById('popup-blur-bg').style.backgroundImage = '';
    }

    // ── iframe (optional video) ───────────────────────────────────
    const iframeWrap = document.getElementById('popup-iframe-wrap');
    const iframe     = document.getElementById('popup-iframe');
    if (a.iframeSrc) {
      iframe.src               = a.iframeSrc;
      iframeWrap.style.display = 'block';
    } else {
      iframe.src               = '';
      iframeWrap.style.display = 'none';
    }

    // ── article button ────────────────────────────────────────────
    const btn = document.getElementById('popup-article-btn');
    if (a.link) {
      btn.href             = a.link;
      btn.textContent      = a.articleHeadline || 'Lire l\'article →';
      btn.style.display    = '';
    } else {
      btn.style.display = 'none';
    }

    document.getElementById('popup-panel').classList.add('open');
    document.getElementById('popup-backdrop').classList.add('visible');
  }

  function close() {
    document.getElementById('popup-panel').classList.remove('open');
    document.getElementById('popup-backdrop').classList.remove('visible');

    // Stop video on close
    const iframe = document.getElementById('popup-iframe');
    if (iframe) iframe.src = '';
    _current = null;

    // ── Auto-open completion sheet once after the last popup closes ──
    setTimeout(() => {
      if (
        window.visitedIds &&
        window.TOTAL_OBJECTS &&
        window.visitedIds.size >= window.TOTAL_OBJECTS &&
        window._completionShownOnce === false &&
        typeof window.openCompletion === 'function'
      ) {
        window._completionShownOnce = true;
        window.openCompletion();
      }
    }, 400);
  }

  return { init, open, close, preloadAll};
})();