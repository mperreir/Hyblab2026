/**
 * A pill-shaped card used in the "CHERCHEURS À LA UNE" footer section.
 *
 * Props:
 *  - portrait  {string}  Image URL for the researcher thumbnail
 *  - name      {string}  Researcher name (rendered as a link)
 *  - role      {string}  Short description / role text
 *  - url       {string}  External link for the researcher
 *  - top       {number}  Absolute Y position (px) within the design canvas
 */
export default function LinkedResearcherCard({ portrait, name, role, url, top }) {
  return (
    <div
      className="absolute bg-white rounded-[117.5px] overflow-hidden"
      style={{ left: '1044px', top: `${top}px`, width: '684px', height: '116px' }}
    >
      {/* Circular portrait thumbnail */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{ left: '25px', top: '15px', width: '85px', height: '85px' }}
      >
        <img src={portrait} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Name + role text */}
      <div
        className="absolute"
        style={{ left: '130px', top: '18px', right: '24px', bottom: '12px' }}
      >
        <p
          className="m-0 text-[#0025ff] text-[20px] leading-snug"
          style={{ fontFamily: "'Massilia', Inter, sans-serif", fontWeight: 700 }}
        >
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-75"
          >
            {name}
          </a>
          {', '}
          <span
            className="font-normal"
            style={{ fontFamily: "'Massilia', Inter, sans-serif", fontWeight: 300 }}
          >
            {role}
          </span>
        </p>
      </div>
    </div>
  );
}
