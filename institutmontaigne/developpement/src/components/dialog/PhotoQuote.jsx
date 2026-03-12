/**
 * PhotoQuote — bulle de citation avec photo, comme dans le Figma.
 *
 * Usage dans debate.jsx :
 * {
 *   "type": "photo_quote",
 *   "intervenant": "morel",          // pour la flèche et la couleur
 *   "photo": "/img/morel.jpg",        // chemin ou URL de la photo
 *   "quote": "Le texte de la citation avec du <b>gras</b> si besoin.",
 *   "side": "left"                    // "left" (défaut) ou "right"
 * }
 */
export default function PhotoQuote({ photo, quote, isLeft = true }) {
  const bubbleBg = isLeft ? 'bg-[#C8D4E8]' : 'bg-[#F0C4B8]';
  const arrowColor = isLeft ? '#0B1D3A' : '#C41E3A';

  return (
    <div className="w-full pb-5">
      <div className={`grid grid-cols-2 items-end ${isLeft ? 'justify-items-start ' : 'justify-items-end'} `}>

        {/* Photo */}
        <div className={`${isLeft ? 'order-1 ' : 'order-2'} flex `}>
          <div
            className="w-36 h-40 overflow-hidden"
            style={{
              transform: `rotate(${isLeft ? '-5deg' : '5deg'}) translateY(15px)`,
            }}
          >
            <img src={photo} alt="" className="w-full h-full object-cover object-top" />
          </div>
        </div>

        {/* Flèche */}
        <div className={`${isLeft ? 'order-2' : 'order-1 '} flex items-end pb-6`}
            style={{
                transform: `${isLeft ? 'translateX(-35px)' : 'translateX(35px)'} translateY(15px)`,
                }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: arrowColor,
              maskImage: 'url(/icons/quoteArrow.svg)',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: 'url(/icons/quoteArrow.svg)',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              transform: isLeft ? 'scaleX(-1)' : 'none',
            }}
          />
        </div>
      </div>

      {/* Bulle de citation */}
      <blockquote className={`${bubbleBg} rounded-2xl pt-6 pb-5 px-5`}>
        <p
          className="text-sm md:text-base font-helvetica leading-relaxed text-ink/90 text-center"
          dangerouslySetInnerHTML={{ __html: `“ ${quote} ”` }}
        />
      </blockquote>
    </div>
  );
}
