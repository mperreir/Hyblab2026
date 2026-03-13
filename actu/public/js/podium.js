fetch('data/movies.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('podium-container');
    
    const topThree = data.filter(item => item.rank === 1 || item.rank === 2 || item.rank === 3);

    let stepsHtmlString = '';
    topThree.forEach(item => {
      stepsHtmlString += `
        <div class="step step-${item.rank}">
          <img src="${item.image}" alt="${item.title}" class="step-img img-${item.rank}">
          <span class="step-rank">${item.rank}</span>
        </div>
      `;
    });

    const fullPodiumHtml = `
      <svg class="podium-svg" xmlns="http://www.w3.org/2000/svg" width="308" height="88" viewBox="0 0 308 88" fill="none">
        <g filter="url(#filter0_di_73_541)">
          <path d="M4.5 69.4491C4.5 74.9719 8.97715 79.4491 14.5 79.4491H293.5C299.023 79.4491 303.5 74.9719 303.5 69.4491V48.1425C303.5 42.6406 299.056 38.1722 293.554 38.1426L219.929 37.7465C214.427 37.7169 209.983 33.2484 209.983 27.7466C209.983 21.9879 209.983 16.2584 209.983 10.5001C209.983 4.95738 205.475 0.471961 199.932 0.500127L117.664 0.918202C112.231 0.94581 107.835 5.30627 107.881 10.7388C107.888 11.5987 107.896 12.459 107.904 13.3189C107.95 18.7569 103.546 23.1203 98.1076 23.1296C70.2806 23.1769 42.2909 23.0151 14.4632 23.0616C8.95471 23.0708 4.5 27.5427 4.5 33.0511V69.4491Z" fill="#30A1EF"/>
          <path d="M4.5 69.4491C4.5 74.9719 8.97715 79.4491 14.5 79.4491H293.5C299.023 79.4491 303.5 74.9719 303.5 69.4491V48.1425C303.5 42.6406 299.056 38.1722 293.554 38.1426L219.929 37.7465C214.427 37.7169 209.983 33.2484 209.983 27.7466C209.983 21.9879 209.983 16.2584 209.983 10.5001C209.983 4.95738 205.475 0.471961 199.932 0.500127L117.664 0.918202C112.231 0.94581 107.835 5.30627 107.881 10.7388C107.888 11.5987 107.896 12.459 107.904 13.3189C107.95 18.7569 103.546 23.1203 98.1076 23.1296C70.2806 23.1769 42.2909 23.0151 14.4632 23.0616C8.95471 23.0708 4.5 27.5427 4.5 33.0511V69.4491Z" stroke="#0097D7" stroke-linecap="round" stroke-linejoin="bevel"/>
        </g>
        <defs>
          <filter id="filter0_di_73_541" x="0" y="0" width="308" height="87.9491" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_73_541"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_73_541" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_73_541"/>
          </filter>
        </defs>
      </svg>

      <div class="podium-steps">
        ${stepsHtmlString}
      </div>

    `;

    container.innerHTML = fullPodiumHtml;

    gsap.from(".step", {
      y: 150,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)"
    });

    buildBackSide(data);
    initFlip();
  })
  .catch(error => console.error('failed to read json', error));

function scoreToStars(score, max = 4) {
  const filled = Math.round((score / 100) * max);
  let html = '';
  for (let i = 0; i < max; i++) {
    html += `<span class="star${i < filled ? '' : ' empty'}">&#9733;</span>`;
  }
  return html;
}

function buildBackSide(data) {
  const heroImg = document.getElementById('back-hero-img');
  const backList = document.getElementById('back-list');

  const sorted = [...data].sort((a, b) => a.critic_rank - b.critic_rank);

  const top = sorted[0];
  heroImg.src = top.image;
  heroImg.alt = top.title;

  sorted.forEach((movie, i) => {
    const item = document.createElement('div');
    item.className = 'back-item';
    item.style.animationDelay = `${i * 55}ms`;
    item.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}" class="back-item-img">
      <div class="back-item-content">
        <span class="back-item-title">${movie.title}</span>
        <span class="back-item-critic">${movie.director || ''}</span>
        <div class="back-item-stars">${scoreToStars(movie.critic_score)}</div>
      </div>
    `;
    backList.appendChild(item);
  });
}

function initFlip() {
  const card = document.getElementById('flip-card');
  if (!card) return;

  card.addEventListener('click', (e) => {
    if (
      e.target.closest('.step-img') ||
      e.target.closest('.toggle-btn')
    ) return;

    card.classList.toggle('is-flipped');
  });
}