const MovieList = (() => {
  let allMovies = [];
  let isExpanded = false;

  async function loadMovies(jsonPath = 'data/movies.json') {
    try {
      const res = await fetch(jsonPath);
      if (!res.ok) throw new Error('Failed to load movies.json');
      allMovies = await res.json();
      render();
    } catch (e) {
      console.error(e);
      const list = document.querySelector('.list');
      if (list) list.innerHTML = '<div class="list-loading">Failed to load movies.json</div>';
    }
  }

  function createItem(movie, index, isNew = false) {
    const div = document.createElement('div');
    div.className = 'list-item' + (isNew ? ' fade-in' : '');
    div.style.animationDelay = isNew ? `${index * 60}ms` : '0ms';
    div.style.flexShrink = '0';
    div.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}" class="item-img">
      <div class="item-content">
        <div class="item-top">
          <span class="item-title">${movie.title}</span>
          <div class="item-circle bg-red">${movie.rank}</div>
        </div>
        <div class="item-bottom">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${movie.score}%;"></div>
          </div>
          <span class="item-percent">${movie.score}%</span>
        </div>
      </div>
    `;
    return div;
  }

  function render(animate = false) {
    const list = document.querySelector('.list');
    if (!list) return;

    const likedMovies = allMovies.filter(m => m.liked);
    const moviesToShow = isExpanded ? allMovies : likedMovies;

    const existingIds = new Set(
      [...list.querySelectorAll('.list-item')].map(el => el.dataset.id)
    );

    list.innerHTML = '';

    moviesToShow.forEach((movie, i) => {
      const isNew = animate && !existingIds.has(String(movie.id));
      const item = createItem(movie, i, isNew);
      item.dataset.id = movie.id;
      list.appendChild(item);
    });
  }

  function toggle() {
    isExpanded = !isExpanded;

    const btn = document.querySelector('.toggle-btn');
    if (btn) btn.classList.toggle('expanded', isExpanded);

    render(true);
  }

  function initToggleButton() {
    const list = document.querySelector('.list');
    if (!list) return;

    list.style.maxHeight = '350px';
    list.style.overflowY = 'auto';
    list.style.boxSizing = 'border-box';

    if (list.parentElement.classList.contains('list-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'list-wrapper';
    list.parentNode.insertBefore(wrapper, list);
    wrapper.appendChild(list);

    const btn = document.createElement('button');
    btn.className = 'toggle-btn';
    btn.setAttribute('aria-label', 'Toggle all movies');
    btn.innerHTML = `
      <div class="arrow">
        <div class="arrow-up">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none">
            <g filter="url(#filter0_dd_3_411)">
              <path d="M5 5.23633L10.5 1.23633L16 5.23633" stroke="#FF0000" stroke-width="2" stroke-linecap="round"/>
            </g>
            <defs>
              <filter id="filter0_dd_3_411" x="0" y="0" width="24" height="14.2363" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="3" dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_411"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="effect1_dropShadow_3_411" result="effect2_dropShadow_3_411"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_3_411" result="shape"/>
              </filter>
            </defs>
          </svg>
        </div>
        <div class="arrow-down">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none">
            <g filter="url(#filter0_dd_3_412)">
              <path d="M5 1L10.5 5L16 1" stroke="#FF0000" stroke-width="2" stroke-linecap="round"/>
            </g>
            <defs>
              <filter id="filter0_dd_3_412" x="0" y="0" width="24" height="14.2363" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="3" dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_412"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="effect1_dropShadow_3_412" result="effect2_dropShadow_3_412"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_3_412" result="shape"/>
              </filter>
            </defs>
          </svg>
        </div>
      </div>

    `;
    btn.addEventListener('click', toggle);
    wrapper.appendChild(btn);
  }

  function init(jsonPath) {
    initToggleButton();
    loadMovies(jsonPath);
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
  MovieList.init('data/movies.json');
});