window.Popup = (() => {
  let _current = null;

  function init() {
    document.getElementById('popup-close')
      .addEventListener('click', close);
    document.getElementById('popup-backdrop')
      .addEventListener('click', close);
  }

  function open(data) {
    _current = data;
    const a = data.article || {};

    document.getElementById('popup-tag').textContent         = a.tag         || '';
    document.getElementById('popup-title').textContent       = a.title       || '';
    document.getElementById('popup-description').textContent = a.description || '';

    // object image
    const objWrap = document.getElementById('popup-object-img-wrap');
    const objImg  = document.getElementById('popup-object-img');
    if (a.objectImage) {
      objImg.src = a.objectImage;
      objImg.alt = a.title || '';
      objWrap.style.display = '';
    } else {
      objWrap.style.display = 'none';
    }

    // iframe (optional — e.g. video)
    const iframeWrap = document.getElementById('popup-iframe-wrap');
    const iframe     = document.getElementById('popup-iframe');
    if (a.iframeSrc) {
      iframe.src = a.iframeSrc;
      iframeWrap.style.display = 'block';
    } else {
      iframe.src = '';
      iframeWrap.style.display = 'none';
    }

    // article button — show exact article name
    const btn = document.getElementById('popup-article-btn');
    if (a.link) {
      btn.href = a.link;
      btn.textContent = a.articleHeadline || 'Lire l\'article →';
      btn.style.display = '';
    } else {
      btn.style.display = 'none';
    }

    document.getElementById('popup-panel').classList.add('open');
    document.getElementById('popup-backdrop').classList.add('visible');
  }

  function close() {
    document.getElementById('popup-panel').classList.remove('open');
    document.getElementById('popup-backdrop').classList.remove('visible');
    // stop video/iframe on close
    const iframe = document.getElementById('popup-iframe');
    if (iframe) iframe.src = '';
    _current = null;
    // show completion if all objects have been visited
    setTimeout(() => {
      if (window.visitedIds && window.TOTAL_OBJECTS &&
          window.visitedIds.size >= window.TOTAL_OBJECTS &&
          window.openCompletion) {
        window.openCompletion();
      }
    }, 400);
  }

  function getCurrent() { return _current; }

  return { init, open, close, getCurrent };
})();