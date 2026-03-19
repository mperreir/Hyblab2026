import { getLenis } from '../lib/lenis';

// Coordonnées Figma exactes (espace design 1920px)
const ARROW_DOWN_DESIGN_TOP = 750;
const ARROW_DOWN_DESIGN_LEFT = 1065;

// Scroll réel (px) à partir duquel la flèche "haut" devient visible
const ARROW_UP_SHOW_AFTER_SCROLL = 800;

// Scroll réel (px) au-delà duquel la flèche "bas" disparaît
const ARROW_DOWN_HIDE_AFTER_SCROLL = 100;

/**
 * ArrowDown – grande flèche vers le bas, positionnée selon les coords Figma.
 * Disparaît dès que l'utilisateur scroll au-delà de sa position.
 *
 * Props:
 *   scale   {number}  Zoom courant de la page (window.innerWidth / DESIGN_WIDTH)
 *   scrollY {number}  Valeur courante de window.scrollY
 */
export function ArrowDown({ scale, scrollY }) {
  const visible = scrollY < ARROW_DOWN_HIDE_AFTER_SCROLL;

  // Position cible = milieu de l'iceberg dans l'espace design, converti en px écran
  const ICEBERG_MIDDLE_DESIGN = 800;

  function handleClick() {
    const lenis = getLenis();
    const targetPx = ICEBERG_MIDDLE_DESIGN * scale;
    lenis
      ? lenis.scrollTo(targetPx, { duration: 2.0, easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t })
      : window.scrollTo({ top: targetPx, behavior: 'smooth' });
  }

  const topPx  = ARROW_DOWN_DESIGN_TOP  * scale;
  const leftPx = ARROW_DOWN_DESIGN_LEFT * scale;

  return (
    <div
      className="fixed z-50 transition-opacity duration-300"
      style={{
        top: topPx,
        left: leftPx,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <svg
        onClick={handleClick}
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="67"
        viewBox="0 0 45 107"
        fill="none"
        className="cursor-pointer hover:opacity-70 transition-opacity"
        aria-label="Descendre un peu dans l'IceBerg"
      >
        <path
          d="M25.0919 3C25.0919 1.34315 23.7487 -1.20467e-07 22.0919 0C20.435 1.20467e-07 19.0919 1.34315 19.0919 3L22.0919 3L25.0919 3ZM19.9705 106.121C21.1421 107.293 23.0416 107.293 24.2132 106.121L43.3051 87.0294C44.4766 85.8579 44.4766 83.9584 43.3051 82.7868C42.1335 81.6152 40.234 81.6152 39.0624 82.7868L22.0919 99.7574L5.1213 82.7868C3.94973 81.6152 2.05023 81.6152 0.87866 82.7868C-0.292913 83.9584 -0.292913 85.8579 0.878661 87.0294L19.9705 106.121ZM22.0919 3L19.0919 3L19.0919 104L22.0919 104L25.0919 104L25.0919 3L22.0919 3Z"
          fill="url(#gradient-down)"
        />
        <defs>
          <linearGradient id="gradient-down" x1="21.5919" y1="3" x2="21.5919" y2="104" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0DFB8" />
            <stop offset="1" stopColor="#3452FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/**
 * ArrowUp – petite flèche vers le haut, fixe en bas à droite.
 * Apparaît après ARROW_UP_SHOW_AFTER_SCROLL px de scroll.
 *
 * Props:
 *   scrollY {number}  Valeur courante de window.scrollY
 */
export function ArrowUp({ scrollY }) {
  const visible = scrollY > ARROW_UP_SHOW_AFTER_SCROLL;

  function handleClick() {
    const lenis = getLenis();
    lenis
      ? lenis.scrollTo(0, { duration: 1.8 })
      : window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div
      className="fixed right-[40px] bottom-[120px] z-50 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
    >
      <svg
        onClick={handleClick}
        xmlns="http://www.w3.org/2000/svg"
        width="37"
        height="59"
        viewBox="0 0 37 59"
        fill="none"
        className="cursor-pointer hover:opacity-70 transition-opacity"
        aria-label="Remonter en haut de la page"
      >
        <path
          d="M16.613 56.5463C16.6385 57.9268 17.7784 59.0251 19.1588 58.9996C20.5393 58.974 21.6377 57.8342 21.6121 56.4537L19.1125 56.5L16.613 56.5463ZM19.8473 0.699803C18.8531 -0.258259 17.2704 -0.228951 16.3124 0.765265L0.699755 16.967C-0.258311 17.9612 -0.229003 19.5439 0.765217 20.5019C1.75944 21.46 3.34208 21.4307 4.30014 20.4365L18.178 6.03493L32.5796 19.9128C33.5738 20.8709 35.1564 20.8416 36.1145 19.8473C37.0726 18.8531 37.0433 17.2705 36.049 16.3124L19.8473 0.699803ZM19.1125 56.5L21.6121 56.4537L20.6121 2.45371L18.1125 2.5L15.613 2.54629L16.613 56.5463L19.1125 56.5Z"
          fill="url(#gradient-up)"
        />
        <defs>
          <linearGradient id="gradient-up" x1="19.6125" y1="56.4907" x2="18.6125" y2="2.49074" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0DFB8" />
            <stop offset="1" stopColor="#3452FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}