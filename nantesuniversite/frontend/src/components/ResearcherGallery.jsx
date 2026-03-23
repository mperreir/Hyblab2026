import imgGallery from '../assets/figma/researcher-gallery.png';

/**
 * "Fiers de nos chercheuses" gallery section.
 * Shows a section header with a link and a wide group photo.
 */
export default function ResearcherGallery() {
  return (
    <section>
      

      {/* Group photo */}
      <div
        className="absolute overflow-hidden"
        style={{ left: 61, top: 2120, width: 1798, height: 613 }}
      >
        <img
          alt="Fiers de nos chercheuses"
          src={imgGallery}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
