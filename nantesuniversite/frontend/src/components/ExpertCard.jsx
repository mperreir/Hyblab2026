import calendarIcon from '../assets/figma/calendar-icon.svg';

/**
 * Expert profile card for the "Parole d'Expert" home page.
 *
 * Props:
 *  - portrait  {string}   Circular portrait image URL
 *  - name      {string}   Expert full name
 *  - role      {string}   Role / short description
 *  - joined    {string}   Join date label (e.g. "Joined December 2021")
 *  - featured  {boolean}  True → larger "hero" card variant
 *  - className {string}   Additional classes
 *  - style     {object}   Inline styles (use for absolute positioning from parent)
 */
export default function ExpertCard({
  portrait,
  name,
  role,
  joined,
  featured = false,
  className = '',
  style,
}) {
  const portraitSize = featured ? 'w-[66px] h-[66px]' : 'w-[40px] h-[40px]';
  const nameSize = featured ? 'text-[32px]' : 'text-[14px]';
  const roleWidth = featured ? 'w-[290px] text-[20px]' : 'w-[230px] text-[14px]';

  return (
    <div
      className={`bg-white border border-[#e5e7eb] rounded-[6px] shadow-[0px_4px_4px_0px_rgba(174,174,174,0.25)] flex items-start gap-[16px] p-[17px] ${className}`}
      style={style}
    >
      <img
        alt={name}
        src={portrait}
        className={`${portraitSize} rounded-full object-cover shrink-0`}
      />

      <div className="flex flex-col gap-[4px]">
        <p
          className={`m-0 font-semibold text-[#0f172a] leading-[20px] whitespace-nowrap ${nameSize}`}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {name}
        </p>

        <p
          className={`m-0 font-normal text-[#0f172a] leading-[20px] ${roleWidth}`}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {role}
        </p>

        <div className="flex gap-[4px] items-center">
          <img alt="" src={calendarIcon} className="shrink-0 w-[16px] h-[16px]" />
          <p
            className="m-0 font-normal text-[#64748b] text-[12px] leading-[16px]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {joined}
          </p>
        </div>
      </div>
    </div>
  );
}
  