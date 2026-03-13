/**
 * ResourceCard – a document card pinned at a specific position in the iceberg.
 *
 * Props (matching data.json document fields):
 *   pictogramme  {string}  Resolved URL of the category SVG icon
 *   category     {string}  "prix" | "article" | "conference" | "livre" | "podcast" | "recherche"
 *   title        {string}  Document title
 *   left         {number}  Left offset in px (absolute positioning)
 *   top          {number}  Top offset in px
 *   width        {number}  Card width in px  (default 612)
 *   height       {number}  Card height in px (default 187)
 */

// Accent colours match each SVG pictogram's own stroke/fill colour

const CATEGORY_COLORS = {
  prix: "#ffc800",
  article: "#ff0000",
  conference: "#a900f9",
  livre: "#00c450",
  podcast: "#ff0064",
  recherche: "#00c9ff",
  biographie:"#ff6c00"
};

export default function ResourceCard({
  pictogramme,
  category,
  title,
  left,
  top,
  description = null,
  onClick,
}) {
  const color = CATEGORY_COLORS[category.toLowerCase()] ?? "#3552ff";
  const label = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div
      // className="absolute bg-white rounded-2xl px-6 shadow-sm overflow-hidden "
      className="class-resource-card"
      style={{ left, top }}
      onClick={onClick}
    >
      {/* Pictogram pinned to top-left */}
      <img
        src={pictogramme}
        alt={label}
        // className="absolute object-contain"
        className="class-pictogramme"
        // style={{ top: 14, left: 16, width: 44, height: 44 }}
      />
      {/* Category badge + title — offset right to leave room for the icon */}
      <div
        // className="flex flex-col gap-2 min-w-0 h-full justify-center"
        className="class-ressource-contain"
        // style={{ paddingLeft: 72 }}
      >
        <span
          // className="text-white text-sm font-semibold px-3 py-1 rounded-full w-fit leading-none"
          className="class-category-ressource"
          style={{ backgroundColor: color }}
        >
          {label}
        </span>
        <h3 className="class-title-ressource">
          {title}
        </h3>
        <div className="class-description-wrapper">
          <p className="class-description-ressource">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
