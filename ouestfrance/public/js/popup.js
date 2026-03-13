window.Popup = (() => {

  let _current = null;

  function init() {
    document.getElementById('popup-close')
      .addEventListener('click', close);
    document.getElementById('btn-close-popup')
      .addEventListener('click', close);
    document.getElementById('popup-overlay')
      .addEventListener('click', e => {
        if (e.target.id === 'popup-overlay') close();
      });

    document.getElementById('btn-read-more')
      .addEventListener('click', () => {
        if (!_current) return;
        const link = _current.article?.link;
        if (link) {
          window.open(link, '_blank', 'noopener,noreferrer');
        } else {
          close();
          window.ArticlePanel.open(_current);
        }
      });
  }

  function open(data) {
    _current = data;
    const a = data.article || {};
    document.getElementById('popup-category').textContent    = a.category    || a.tag || '';
    document.getElementById('popup-title').textContent       = a.title       || '';
    document.getElementById('popup-description').textContent = a.description || '';
    document.getElementById('popup-overlay').classList.add('visible');
  }

  function close() {
    document.getElementById('popup-overlay').classList.remove('visible');
    _current = null;
  }

  function getCurrent() { return _current; }

  return { init, open, close, getCurrent };
})();