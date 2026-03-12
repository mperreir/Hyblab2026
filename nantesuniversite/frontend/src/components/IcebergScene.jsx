import React from 'react';
import Robot from './Robot';
import ResourceCard from './ResourceCard';
import DataIceberg from './DataIceberg';

// Decorative lines (47:339/340 = Vector2 side waves, 47:346 = Vector3 centre wave)
const wavyLineSide =
  'https://www.figma.com/api/mcp/asset/02a68ccd-a0df-4a73-b697-55f5605a5a10';
const wavyLineCentre =
  'https://www.figma.com/api/mcp/asset/a7cc859a-99ec-42b5-98df-bd06ed42cbbc';

const arrowDown =
  'https://www.figma.com/api/mcp/asset/ec378145-d58a-484a-bcba-965252b4e421';


// Resource card images (47:343, 47:341, 47:342)
const image17 =
  'https://www.figma.com/api/mcp/asset/4d251bfd-e1d5-40e9-8248-8d08578a4585';
const image12 =
  'https://www.figma.com/api/mcp/asset/703c4fca-2356-4f83-bb57-028ed556b97c';
const image14 =
  'https://www.figma.com/api/mcp/asset/492d21de-de8d-4a0f-b1dc-188e200354d4';

export default function IcebergScene() {
  return (
    <>
      {/* Scroll arrow (47:246) — x=960, y=888, h=101 */}
      <div className="absolute left-1/2 top-[888px] -translate-x-1/2">
        <img src={arrowDown} alt="Défiler vers le bas" className="w-[34px] h-[101px]" />
      </div>

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

      {/* Resource cards at increasing iceberg depths (47:343, 47:341, 47:342) */}
      <ResourceCard src={image17} alt="Ressource – surface" left={227}  top={1394} width={617} height={189} />
      <ResourceCard src={image12} alt="Ressource – milieu"  left={1003} top={2150} />
      <ResourceCard src={image14} alt="Ressource – fond"    left={523}  top={2901} />
    </>
  );
}
