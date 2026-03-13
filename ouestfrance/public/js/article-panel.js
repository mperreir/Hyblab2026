window.ArticlePanel = (() => {

  function init() {
    document.getElementById('article-close')
      .addEventListener('click', close);
    document.getElementById('article-backdrop')
      .addEventListener('click', close);
    document.getElementById('btn-back-to-scene')
      .addEventListener('click', close);
  }

  function open(data) {
    const fa = data.article?.fullArticle;
    if (!fa) return;
    document.getElementById('article-kicker').textContent   = fa.kicker   || '';
    document.getElementById('article-headline').textContent = fa.headline  || data.article?.title || '';
    document.getElementById('article-intro').textContent    = fa.intro     || '';
    document.getElementById('article-date').textContent     = fa.date      || '';
    document.getElementById('article-read').textContent     = fa.readTime  ? fa.readTime + ' de lecture' : '';
    document.getElementById('article-body').innerHTML = (fa.body || []).map(b =>
      '<div class="article-block">'
      + (b.subtitle ? '<h3 class="article-subtitle">' + b.subtitle + '</h3>' : '')
      + '<p class="article-text">' + b.text + '</p>'
      + '</div>'
    ).join('');
    document.getElementById('article-panel').classList.add('open');
    document.getElementById('article-backdrop').classList.add('visible');
  }

  function close() {
    document.getElementById('article-panel').classList.remove('open');
    document.getElementById('article-backdrop').classList.remove('visible');
  }

  return { init, open, close };
})();