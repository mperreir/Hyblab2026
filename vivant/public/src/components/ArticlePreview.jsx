import React from 'react';

const ArticlePreview = ({ articleData }) => {
  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-2xl border border-gray-200 w-64 text-left text-black hover:scale-[1.02] transition-all shadow-xl overflow-hidden flex flex-col group cursor-pointer" onClick={() => window.open(articleData.fullArticle.Permalink, '_blank')}>
      {/* Image de couverture */}
      {articleData.image && (
        <div className="w-full h-32 overflow-hidden relative">
          <img 
            src={articleData.image} 
            alt={articleData.nom} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {articleData.categories && (
            <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
              {articleData.categories.split('>')[0]}
            </div>
          )}
        </div>
      )}
      
      {/* Contenu */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-sm leading-tight line-clamp-2">
          {articleData.nom}
        </h3>
        
        <div className="flex items-center text-[11px] text-gray-500 font-medium">
          <p>{articleData.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
