const TRACK_HEIGHT = 427;
const TRACK_WIDTH = 46;
const FILL_WIDTH = 27;

export default function ProgressBar({ level = 0 }) {
  const safeLevel = Math.min(1, Math.max(0, level));
  const fillHeight = Math.round(TRACK_HEIGHT * safeLevel - 30 );

  return (
    <div
      className="relative"
      style={{ width: TRACK_WIDTH, height: TRACK_HEIGHT }}
    >
      {/* Fond exact */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: 23,
          background: "#233168",
        }}
      />

      {/* Remplissage du haut vers le bas */}
      <div
        className="absolute left-[9px] top-0 transition-[height] duration-300 ease-in-out"
        style={{
          marginTop: 15,
          width: FILL_WIDTH,
          height: fillHeight,
          borderRadius: 13.5,
          background:
            "linear-gradient(to bottom, #F1DFB8 0%, #3452FF 62.0192%)",
        }}
      />
    </div>
  );
}