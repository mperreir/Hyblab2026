/* ══════════════════════════════════════════
   app.js
   View switching, JMail modal, keyboard
   shortcuts and app initialization.
══════════════════════════════════════════ */

/* ─── View switching ─── */
function switchView(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  document.getElementById('view-' + view).classList.add('active');
  document.getElementById('btn-' + view).classList.add('active');

  if (view === 'map') {
    buildMap();
  }
}

/* ─── JMail modal ─── */
function openJmail() {
  document.getElementById('jmail-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeJmail(event) {
  if (event && event.target !== document.getElementById('jmail-modal')) return;
  document.getElementById('jmail-modal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── Global keyboard shortcuts ─── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    // Close any open modal
    document.getElementById('reader-modal').classList.remove('open');
    document.getElementById('reader-iframe').src = '';
    document.getElementById('jmail-modal').classList.remove('open');
    document.body.style.overflow = '';
  }

  // Cmd/Ctrl + K → focus search
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    const input = document.getElementById('search-input');
    if (input) {
      // Switch to articles view if needed
      if (!document.getElementById('view-articles').classList.contains('active')) {
        switchView('articles');
      }
      input.focus();
      input.select();
    }
  }
});

/* ─── Init ─── */
window.addEventListener('load', () => {
  // Render articles
  renderArticles();

  // Hide loading screen after animation
  setTimeout(() => {
    document.getElementById('loading').classList.add('done');
  }, 1400);
});
