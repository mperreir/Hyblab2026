
const MovieList = (() => {
  let isExpanded = false;

  function createItem(affiche, titre, realisateur, rank, like_pourcentage, index) {

    const div = document.createElement('div');
    div.className = 'list-item ';
    div.style.animationDelay = `${index * 60}ms`;
    div.style.flexShrink = '0';
    div.innerHTML = `
    <img src="${affiche}" alt="${titre}" class="item-img">
    <div class="item-content">
      
      <div class="item-top">
        <div class="item-info">
          <span class="item-title">${titre}</span>
          <span class="item-director">${realisateur}</span>
        </div>
        <span class="item-rank">${rank}</span>
      </div>
      
      <div class="item-bottom">
        <div class="progress-wrapper">
          <div class="thumb-icon" style="left: calc(${like_pourcentage}% - 8px);">
            <img src="img/podium/thumb.svg" alt="Thumb Icon" class="thumb-img">
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${like_pourcentage}%;">

            </div>
          </div>
        </div>
        <span class="item-percent">${like_pourcentage}%</span>
      </div>

    </div>
    `;
    return div;
  }

  //création de la liste liké
  async function render(like_only) {

    const list = document.querySelector('.list');
    if (!list) return;

    const {filmLiked, classement} = await loadClassement();

    //récupération des films liké par l'utilisateur
    let likedMovies = null
    if (like_only){
      likedMovies = filmLiked;
    }else{
      likedMovies = classement;
    }

    list.innerHTML = '';

    let i = likedMovies.length;

      likedMovies.forEach(element => {
        const ratio_like = (element.nb_likes / (element.nb_likes + element.nb_dislikes))*100 || 0
        const item = createItem(element?.affiche, element?.nom, element?.realisateur, element?.classement, ratio_like, i);
        item.dataset.id = element.id;
        list.appendChild(item);
      });
  }

  function toggle() {
    console.log("ici")
    isExpanded = !isExpanded;

    const btn = document.querySelector('.toggle-btn');
    if (btn) btn.classList.toggle('expanded', isExpanded);

    render(isExpanded);
  }

  function initToggleButton() {
    const list = document.querySelector('.list');
    if (!list) return;

    list.style.maxHeight = '750px';
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
            <img src="img/arrow.svg" alt="arrow">
        </div>
        <div class="arrow-down">
            <img src="img/arrow.svg" alt="arrow">
        </div>
      </div>
    `;
    btn.addEventListener('click', toggle);
    wrapper.appendChild(btn);
  }

  function init(jsonPath) {
    initToggleButton();
    // loadClassement();
    render(like_only = true);
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
  MovieList.init('data/movies.json');
});