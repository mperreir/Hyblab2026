const ROTATIONS = {
  down:  '0deg',
  left:  '90deg',
  up:    '180deg',
  right: '270deg',
};

const SCROLL_AMOUNT = 400;

/**
 * ScrollArrow – a directional arrow indicator.
 *
 * Props:
 *   direction  {"up"|"down"|"left"|"right"}  Which way the arrow points (default "down")
 *   left       {number|string}               Absolute left position (for absolute placement)
 *   top        {number|string}               Absolute top position
 *   translateX {string}                      Optional CSS translateX (e.g. "-50%" to centre)
 *   scale      {number}                      Zoom factor (default 1 = natural size)
 */
export default function ScrollArrow({ direction = 'down', left, top, translateX, scale = 1 }) {
  const rotation = ROTATIONS[direction] ?? '0deg';

  function handleClick() {
    if (direction === 'up') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (direction === 'down') {
      window.scrollBy({ top: SCROLL_AMOUNT, behavior: 'smooth' });
    }
  }

  return (
    <div
      className={left != null ? 'absolute' : undefined}
      style={{
        left,
        top,
        transform: translateX ? `translateX(${translateX})` : undefined,
      }}
    >
      <svg
        onClick={handleClick}
        xmlns="http://www.w3.org/2000/svg"
        width="67"
        height="110"
        viewBox="0 0 67 110"
        fill="none"
        className="cursor-pointer pointer-events-auto hover:opacity-70 transition-opacity"
        style={{ zoom: scale, transform: `rotate(${rotation})` }}
        aria-label={`Flèche ${direction}`}
      >
        <path
          d="M37.6378 4.5C37.6378 2.01472 35.6231 -1.807e-07 33.1378 0C30.6525 1.807e-07 28.6378 2.01472 28.6378 4.5L33.1378 4.5L37.6378 4.5ZM29.9558 108.682C31.7132 110.439 34.5624 110.439 36.3198 108.682L64.9576 80.0442C66.715 78.2868 66.715 75.4376 64.9576 73.6802C63.2003 71.9228 60.351 71.9228 58.5937 73.6802L33.1378 99.136L7.68198 73.6802C5.92462 71.9228 3.07538 71.9228 1.31802 73.6802C-0.439341 75.4376 -0.439341 78.2868 1.31802 80.0442L29.9558 108.682ZM33.1378 4.5L28.6378 4.5L28.6378 105.5L33.1378 105.5L37.6378 105.5L37.6378 4.5L33.1378 4.5Z"
          fill="url(#arrow-gradient)"
        />
        <defs>
          <linearGradient id="arrow-gradient" x1="32.6378" y1="4.5" x2="32.6378" y2="105.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0DFB8" />
            <stop offset="1" stopColor="#3452FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
