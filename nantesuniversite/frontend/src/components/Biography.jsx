

export default function Biography() {
  return (
    <div className="biographie-container">

      <div className="biographie-header">
        <img src="./portraits/colin.png" alt="Portrait Colin" className="biographie-portrait" />
        <div className="biographie-intro">
          <h1 className="biographie-titre">BIOGRAPHIE</h1>
          <p>
            Colin de la Higuera est enseignant-chercheur en informatique, spécialiste reconnu de l’intelligence 
            artificielle appliquée à l’éducation à Nantes Université et membre du laboratoire LS2N (laboratoire des sciences du numérique). 
          </p>
          <p>
            Réparti sur cinq sites, le LS2N est la plus importante unité de recherche 
            publique en région Pays de la Loire.  Les travaux de recherche de Colin de la Higuera 
            concernent l'apprentissage automatique et en particulier l'inférence grammaticale, 
            sujet clef dans le développement de l'IA générative.
          </p>  
        </div>
      </div>

      <div className="biographie-section">
        <p>
          Son domaine de compétence s'étend sur les usages de l'IA, notamment leur intérêt et 
          appropriation dans le cadre pédagogique.  Il est l'un des directeurs de la fondation Knowledge 
          for All et est depuis 2017 titulaire de la Chaire Unesco Relia - Ressources éducatives libres et 
          intelligence artificielle à Nantes Université. <br /> 
          Son manuel ouvert Intelligence artificielle pour les enseignants (AI4T) a reçu des distinctions 
          académiques, et ses travaux en éducation ouverte l’ont conduit à remporter l'Open Education 
          Global Awards (catégorie Leadership), marquant une reconnaissance internationale.
        </p>
        <img src="./images/chaireUnesco.jpg" alt="Chaire Unesco" className="biographie-photo" />
      </div>

      <div className="biographie-section">
        <img src="./images/openEducation.png" alt="open education" className="biographie-photo biographie-photo--gauche" />
        <p>
          À travers ses recherches, projets européens et interventions institutionnelles, 
          Colin de la Higuera s’impose comme une référence scientifique engagée pour une IA au service 
          de l’apprentissage et de l’intérêt général. En janvier 2026, il a été nommé au 
          Conseil supérieur des programmes, en tant que personnalité qualifiée - référente IA.
        </p>
      </div>
    </div>
  );
}