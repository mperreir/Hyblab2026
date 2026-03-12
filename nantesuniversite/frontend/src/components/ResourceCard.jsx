/**
 * ResourceCard – a resource image pinned at a specific position.
 *
 * Props:
 *   src    – image URL
 *   alt    – accessible description
 *   left   – left offset in px
 *   top    – top offset in px
 *   width  – card width in px (default 612)
 *   height – card height in px (default 187)
 */
export default function ResourceCard({ src, alt, left, top, width = 612, height = 187 }) {
  return (
    <div className="absolute overflow-hidden" style={{ left, top, width, height }}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}
