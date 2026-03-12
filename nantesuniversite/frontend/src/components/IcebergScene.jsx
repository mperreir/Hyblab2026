import React from 'react';
import Robot from './Robot';
import ResourceCard from './ResourceCard';
import DataIceberg from './DataIceberg';
import ScrollArrow from './ScrollArrow';
import data from '../data/data.json';

import prixSvg       from '../data/pictogramme/prix.svg';
import articleSvg    from '../data/pictogramme/article.svg';
import conferenceSvg from '../data/pictogramme/conference.svg';
import livreSvg      from '../data/pictogramme/livre.svg';
import podcastSvg    from '../data/pictogramme/podcast.svg';
import rechercheSvg  from '../data/pictogramme/recherche.svg';

const PICTOGRAMMES = {
  prix: prixSvg, article: articleSvg, conference: conferenceSvg,
  livre: livreSvg, podcast: podcastSvg, recherche: rechercheSvg,
};

const CARD_POSITIONS = [
  { left: 227,  top: 1394},
  { left: 1003, top: 2150},
  { left: 523,  top: 2901},
];

const cardDocuments = data.researcher.documents.slice(0, 3);

// Iceberg layers (Figma nodes 47:248, 47:252, 47:274)
const icebergOutline =
  'https://www.figma.com/api/mcp/asset/5269f595-e74b-4e55-afe5-a7554468a35e';
const icebergFill =
  'https://www.figma.com/api/mcp/asset/e0dd227c-79e9-4ec8-ab24-ca8d1e2d240b';
const icebergOutline2 =
  'https://www.figma.com/api/mcp/asset/32052552-9008-407e-b009-4f0f62e864ab';

// Decorative lines (47:339/340 = Vector2 side waves, 47:346 = Vector3 centre wave)
const wavyLineSide =
  'https://www.figma.com/api/mcp/asset/02a68ccd-a0df-4a73-b697-55f5605a5a10';
const wavyLineCentre =
  'https://www.figma.com/api/mcp/asset/a7cc859a-99ec-42b5-98df-bd06ed42cbbc';

export default function IcebergScene() {
  return (
    <>
      {/* Scroll down arrow — centred, node 15:2 */}
      <ScrollArrow direction="down" left="50%" top={888} translateX="-50%" />


      {/* Centre wavy line (47:346) — x=843, y=1036, w=234, h=18 */}
      <div className="absolute left-[843px] top-[1036px] w-[234px] h-[18px]">
        <img src={wavyLineCentre} alt="" className="w-full h-full" aria-hidden />
      </div>

      {/* full iceberg group exported from Figma */}
      <div className="absolute left-[99px] top-[894px] w-[1588px] h-[2701px]">
        <DataIceberg className="w-full h-full" />
      </div>

      {/* Side wavy lines at the waterline (47:339 right, 47:340 left) */}
      <div className="absolute left-[1678px] top-[1488px] w-[242px] h-[9px]">
        <img src={wavyLineSide} alt="" className="w-full h-full" aria-hidden />
      </div>
      <div className="absolute left-[-74px] top-[1644px] w-[242px] h-[9px]">
        <img src={wavyLineSide} alt="" className="w-full h-full" aria-hidden />
      </div>

      {/* Robot on the waterline */}
      <Robot />

      {/* Resource cards at increasing iceberg depths */}
      {cardDocuments.map((doc, i) => (
        <ResourceCard
          key={doc.id}
          pictogramme={PICTOGRAMMES[doc.category]}
          category={doc.category}
          title={doc.title}
          description={doc.description}
          {...CARD_POSITIONS[i]}
        />
      ))}
    </>
  );
}
