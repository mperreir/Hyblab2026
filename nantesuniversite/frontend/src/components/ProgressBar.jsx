/**
 * ProgressBar – vertical indicator.
 *
 * Props:
 *   level – fill amount 0–1 (default 0)
 */
const TRACK_HEIGHT = 427;
const TRACK_WIDTH  = 46;
const FILL_WIDTH   = 27;

export default function ProgressBar({ level = 0 }) {
  const fillHeight = Math.round(TRACK_HEIGHT * Math.min(1, Math.max(0, level)));

  return (
    <div className="relative w-[46px] h-[427px]">
      {/* Grey track */}
      <div className="w-[46px] h-[427px] rounded-[23px] bg-brand-grey" />

      {/* Gradient fill – grows upward from the bottom */}
      <div
        className="absolute bottom-0 left-[9px] w-[27px] rounded-[23px] transition-[height] duration-300 ease-in-out"
        style={{
          height: fillHeight,
          background: 'linear-gradient(to bottom, var(--color-brand-light-blue) 5%, var(--color-brand-blue) 33%)',
        }}
      />
    </div>
  );
}
