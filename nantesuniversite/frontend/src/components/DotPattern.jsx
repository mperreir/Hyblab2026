/**
 * DotPattern – decorative diamond grid of blue squares.
 *
 * Props:
 *  dotSize   – side length of each square in px (default 22)
 *  mirror    – when true the diamond opens right-to-left instead of left-to-right
 *  className – extra classes for the wrapper
 */
export default function DotPattern({ dotSize = 22, mirror = false, className = '' }) {
  const rows  = 5;
  const mid   = Math.floor(rows / 2);
  const colGap = 3 * dotSize;

  const dots = [];
  for (let row = 0; row < rows; row++) {
    const spread = Math.abs(mid - row);
    const leftX  = mirror ? (mid - spread) * dotSize : spread * dotSize;
    const rightX = leftX + colGap;
    dots.push({ x: leftX,  y: row * dotSize });
    dots.push({ x: rightX, y: row * dotSize });
  }

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: 6 * dotSize, height: rows * dotSize }}
    >
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute bg-brand-blue"
          style={{ left: dot.x, top: dot.y, width: dotSize, height: dotSize }}
        />
      ))}
    </div>
  );
}
