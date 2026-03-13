
    const groupeScene1  = document.querySelector('.groupe-scene1');
    const colline       = document.querySelector('.colline');
    const route         = document.querySelector('.route');
    const maison_a      = document.querySelector('.maison_a');
    const maison        = document.querySelector('.maison');
    const femme         = document.querySelector('.femme');

    const altitudeEl    = document.getElementById('altitude');
    const scrollHint    = document.getElementById('scrollHint');
    const arrowButton   = document.querySelector('.bouton_fleche');

    // ── Repères de scroll ──────────────────────────────────
    const scrollColline = 0;
    const scrollM = 800;
    const scrollFinM = 1600;
    const scrollFinColline   = 1000;
    const scrollreste = 1500;
    const scrollFinreste  = 2500; 
    const scrollDernier = 2500;
    const scrollDernierFin = 3500;
    // ──────────────────────────────────────────────────────

    function clamp(val, min, max) { return Math.min(Math.max(val, min), max); }
    function lerp(a, b, t) { return a + (b - a) * clamp(t, 0, 1); }
    function avancement(scroll, debut, fin) { return clamp((scroll - debut) / (fin - debut), 0, 1); }


    arrowButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      const s = window.scrollY;

      scrollHint.style.opacity  = s > 50 ? 0 : 1;
      arrowButton.style.opacity = s > 200 ? 1 : 0;
      altitudeEl.style.opacity  = s > 100 ? 1 : 0;

      // ── Descente ───────────────────────────────────────
      // La ville remonte depuis le bas (translateY de 100% à 0%)
      if (s> scrollColline && s < scrollFinColline) {
        const descente1 = avancement(s, scrollColline, scrollFinColline);
        colline.style.transform = `translate(-${1 + descente1 * 70}%, ${1 + descente1 * 70}%) scale(${1 + descente1 * 1.5})`;
      }

      if (s > scrollM && s < scrollFinM) {
        const descente2 = avancement(s, scrollM, scrollFinM);
        maison_a.style.transform = `translate(${1 + descente2 * 240}%, -${1 + descente2 * 150}%) scale(${1 + descente2 * 8})`;
      }

      if (s > scrollDernier && s < scrollDernierFin) {
        const descente3 = avancement(s, scrollDernier, scrollDernierFin);
        route.style.transform = `translateY( ${1 + descente3 * 150}%)`;
        maison.style.transform = `translateX(-${1 + descente3 * 150}%)`;
        femme.style.transform = `translate(-${1 + descente3 * 100}%, ${1 + descente3 * 1}%) scale(${1 + descente3 * 2})`;
        maison_a.style.transform = `translate(${1 + descente3 * 250}%, -${1 + descente3 * 800}%) scale(${1 + descente3 * 25})`;
      }
     
      // ── Apparition des images ──────────────────────────
      if (s  < scrollM) {maison_a.style.opacity = 0;} else { maison_a.style.opacity = 1}
      if (s< scrollreste ) {route.style.opacity = 0} else {route.style.opacity = 1}
      if (s< scrollreste ) {maison.style.opacity = 0} else {maison.style.opacity = 1}
      if (s< scrollreste ) {femme.style.opacity = 0} else {femme.style.opacity = 1}

    }, { passive: true });