/* ══════════════════════════════════════════
   data.js — Articles & map data
   All article content and country mappings
══════════════════════════════════════════ */

const ARTICLES = [
  {
    id: 1, featured: true,
    tag: "Enquête Exclusive",
    title: "Jeffrey Epstein : l'homme qui tenait le monde dans sa toile",
    desc: "Infographies et décryptage de l'empire de connexions, de l'argent et des secrets du prédateur sexuel Jeffrey Epstein — de ses débuts à sa chute.",
    categories: ["reseau", "finance"],
    countries: ["usa"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/infographies-jeffrey-epstein-lhomme-qui-tenait-le-monde-dans-sa-toile-e3a93fe0-13f1-11f1-8725-6cea811c3c37",
    date: "Mars 2026"
  },
  {
    id: 2,
    tag: "Finance",
    title: "Comptes bancaires, sociétés offshore, mariages arrangés : comment fonctionnait l'entreprise Epstein",
    desc: "Un réseau financier tentaculaire dissimulé derrière des montages offshore et des arrangements insolites révélés par Ouest-France.",
    categories: ["finance"],
    countries: ["usa", "uk"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/info-ouest-france-comptes-bancaires-societes-offshore-mariages-arranges-comment-fonctionnait-lentreprise-epstein-64c1b40a-0d8e-11f1-b839-4d59eb76df60",
    date: "Fév. 2026"
  },
  {
    id: 3,
    tag: "Justice",
    title: "La première plainte contre Epstein date de 1996 : pourquoi le prédateur n'a-t-il pas été stoppé avant ?",
    desc: "Trente ans de signalements ignorés, de complicités institutionnelles et d'impunité inexpliquée au cœur du système judiciaire américain.",
    categories: ["justice"],
    countries: ["usa"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/la-premiere-plainte-contre-jeffrey-epstein-date-de-1996-pourquoi-le-predateur-sexuel-na-t-il-pas-ete-stoppe-avant-ae380504-0be9-11f1-b839-4d59eb76df60",
    date: "Fév. 2026"
  },
  {
    id: 4,
    tag: "Portrait",
    title: "Prof de maths médiocre issu de la classe moyenne : comment le pédocriminel Epstein a-t-il bâti sa fortune ?",
    desc: "Des origines modestes à une fortune estimée à des centaines de millions, le parcours improbable d'un prédateur financier.",
    categories: ["finance"],
    countries: ["usa"],
    url: "https://www.ouest-france.fr/leditiondusoir/2026-02-20/prof-de-maths-mediocre-issu-de-la-classe-moyenne-comment-le-pedocriminel-jeffrey-epstein-a-t-il-bati-sa-fortune-28e50824-39c4-4a94-b9e3-f63299a29df2",
    date: "20 Fév. 2026"
  },
  {
    id: 5,
    tag: "France — Exclusif",
    title: "Mineures, châteaux, dîners : comment le réseau Epstein a opéré en France grâce à Brunel",
    desc: "Jean-Luc Brunel, agent de mannequins parisien, a servi de porte d'entrée pour Epstein en France. Des jeunes femmes recrutées dans les milieux de la mode.",
    categories: ["france", "reseau"],
    countries: ["france"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/exclusif-mineures-chateaux-diners-comment-le-reseau-epstein-a-pu-operer-en-france-en-toute-impunite-grace-a-brunel-d7b3de9e-1b11-11f1-9fa1-ca7616976f61",
    date: "Mars 2026"
  },
  {
    id: 6,
    tag: "Enquête",
    title: "Les 10 choses les plus troublantes découvertes dans l'appartement d'Epstein",
    desc: "Faux passeport autrichien, photos compromettantes, cerveau exposé en plafond… ce que les enquêteurs ont retrouvé lors des perquisitions.",
    categories: ["justice"],
    countries: ["usa"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/en-images-les-10-choses-les-plus-troublantes-que-les-enqueteurs-ont-decouvert-dans-lappartement-depstein-57960758-18a2-11f1-92e2-ea7c021e42bb",
    date: "Fév. 2026"
  },
  {
    id: 7,
    tag: "Réseau",
    title: "Bill Clinton s'explique sur une photo de lui dans un bain à remous",
    desc: "L'ancien président américain brise le silence sur l'une des images les plus compromettantes liées à l'affaire Epstein.",
    categories: ["reseau"],
    countries: ["usa"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/affaire-epstein-lancien-president-americain-bill-clinton-sexplique-sur-une-photo-de-lui-dans-un-bain-a-remous-2211a04e-1742-11f1-97f1-526ef9f97286",
    date: "Fév. 2026"
  },
  {
    id: 8,
    tag: "France — Finance",
    title: "L'art, les trusts et les millions : les coulisses du montage financier qui lie les Lang à la galaxie Epstein",
    desc: "Comment des figures de la culture française se retrouvent liées aux structures financières complexes de Jeffrey Epstein.",
    categories: ["france", "finance"],
    countries: ["france"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/enquete-lart-les-trusts-et-les-millions-les-coulisses-du-montage-financier-qui-lie-les-lang-a-la-galaxie-epstein-5f525dae-1544-11f1-8725-6cea811c3c37",
    date: "Fév. 2026"
  },
  {
    id: 9,
    tag: "Art / Macabre",
    title: "Il exposait sur son plafond les images de son cerveau en œuvre d'art",
    desc: "Dans son appartement new-yorkais, Epstein avait fait plastifier des scans de son propre cerveau transformés en décoration murale.",
    categories: ["reseau"],
    countries: ["usa"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/info-ouest-france-affaire-epstein-il-exposait-sur-son-plafond-les-images-de-son-cerveau-en-oeuvre-dart-dbf5ae40-13f2-11f1-9747-d91830b32b05",
    date: "Fév. 2026"
  },
  {
    id: 10,
    tag: "Transport / Données",
    title: "Destinations, passagers : ce que révèlent les trajets en avion d'Epstein",
    desc: "Analyse des logs de vol du fameux « Lolita Express » — qui montait à bord, vers quelles destinations, et à quelle fréquence.",
    categories: ["reseau"],
    countries: ["usa", "usvi"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/video-destinations-passagers-ce-que-revelent-les-trajets-en-avion-depstein-enquete-3d5c443c-8a1e-4b97-9f5e-c3f2ac3f6ab9",
    date: "Fév. 2026"
  },
  {
    id: 11,
    tag: "Fortune",
    title: "Qu'est devenue l'immense fortune d'Epstein après sa mort ?",
    desc: "Héritiers, trusts, procès civils, saisies… la bataille pour contrôler les centaines de millions de dollars d'Epstein.",
    categories: ["finance"],
    countries: ["usa"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/enquete-quest-devenue-limmense-fortune-de-jeffrey-epstein-apres-sa-mort-7a711d5a-123d-11f1-b716-b464f6755d91",
    date: "Fév. 2026"
  },
  {
    id: 12,
    tag: "Recrutement — Russie",
    title: "Comment une étudiante russe à Paris identifiait et recrutait des jeunes femmes pour Epstein",
    desc: "Un profil glaçant de recrutement opéré depuis la capitale française par une ressortissante russe au sein des milieux étudiants.",
    categories: ["france", "reseau"],
    countries: ["france", "russia"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/info-ouest-france-comment-une-etudiante-russe-a-paris-identifiait-et-recrutait-des-jeunes-femmes-pour-epstein-3531bee0-0a6b-11f1-8d8f-93b36c1239ba",
    date: "Fév. 2026"
  },
  {
    id: 13,
    tag: "Recruteur",
    title: "Qui est Daniel Siad, ce recruteur de mannequins soupçonné d'être un rabatteur ?",
    desc: "L'enquête sur cet agent parisien suspecté d'avoir orienté de jeunes femmes vers le réseau Epstein-Brunel.",
    categories: ["france", "reseau"],
    countries: ["france"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/affaire-epstein-qui-est-daniel-siad-ce-recruteur-de-mannequin-soupconne-detre-un-rabatteur-de-jeunes-femmes-ed4be82e-09bd-11f1-8d8f-93b36c1239ba",
    date: "Fév. 2026"
  },
  {
    id: 14,
    tag: "Documents",
    title: "Quels secrets cache le faux passeport autrichien trouvé dans l'appartement d'Epstein ?",
    desc: "Un passeport sous une fausse identité avec une adresse en Arabie Saoudite : ce que ce document révèle sur la paranoïa d'Epstein.",
    categories: ["justice"],
    countries: ["usa", "austria"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/quels-secrets-cache-le-faux-passeport-autrichien-trouve-dans-lappartement-depstein-cdbe6070-09a1-11f1-8f27-f38523081a88",
    date: "Fév. 2026"
  },
  {
    id: 15,
    tag: "Guide Pratique",
    title: "Fichiers Epstein : comment les consulter ? Trois questions pour comprendre",
    desc: "Tout ce qu'il faut savoir sur la publication des archives judiciaires, leur contenu et leur portée pour les victimes et la justice.",
    categories: ["justice"],
    countries: ["usa"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/affaire-epstein-comment-consulter-les-fichiers-trois-questions-pour-mieux-comprendre-les-enjeux-de-leur-publication-49899192-08bd-11f1-8d8f-93b36c1239ba",
    date: "Fév. 2026"
  },
  {
    id: 16,
    tag: "Récit Long",
    title: "«Il savait manipuler les gens» : l'affaire Epstein, un poison lent qui fait trembler l'élite mondiale",
    desc: "Récit immersif sur la mécanique de prédation et de manipulation qui a permis à Epstein de se rendre intouchable pendant des décennies.",
    categories: ["reseau", "justice"],
    countries: ["usa"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/recit-il-savait-manipuler-les-gens-laffaire-jeffrey-epstein-un-poison-lent-qui-fait-trembler-lelite-mondiale-7391af22-0766-11f1-900b-ad4c91c3d8b7",
    date: "Fév. 2026"
  },
  {
    id: 17,
    tag: "Mort",
    title: "Gardiens endormis, os du cou fracturés, caméras éteintes : que sait-on des circonstances de la mort d'Epstein ?",
    desc: "Analyse des zones d'ombre autour de la mort officielle par suicide de Jeffrey Epstein en prison fédérale en 2019.",
    categories: ["mort", "justice"],
    countries: ["usa"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/gardiens-endormis-os-du-cou-fractures-cameras-eteintes-que-sait-on-des-circonstances-de-la-mort-de-jeffrey-epstein-23b9f5ae-0b12-11f1-8f27-f38523081a88",
    date: "Fév. 2026"
  },
  {
    id: 18,
    tag: "Île Privée",
    title: "Little Saint Jeff : l'île où Jeffrey Epstein régnait sans police ni témoins",
    desc: "Sur cette île des Îles Vierges américaines, Epstein avait créé un territoire où il était au-dessus de toute loi.",
    categories: ["reseau"],
    countries: ["usvi"],
    url: "https://www.ouest-france.fr/leditiondusoir/2026-02-16/little-saint-jeff-l-ile-ou-jeffrey-epstein-regnait-sans-police-ni-temoins-80fd505f-cef2-460f-b902-b745c1e22592",
    date: "16 Fév. 2026"
  },
  {
    id: 19,
    tag: "Justice — Impunité",
    title: "Jeffrey Epstein bénéficiait d'un passe-droit de la justice pour ses voyages internationaux",
    desc: "Des accords secrets avec le FBI et le Département de la Justice lui auraient garanti une immunité partielle pour ses déplacements.",
    categories: ["justice"],
    countries: ["usa"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/info-ouest-france-jeffrey-epstein-beneficiait-dun-passe-droit-de-la-justice-pour-ses-voyages-internationaux-8a06dbc2-1172-11f1-ac20-ad3e04eb72b3",
    date: "Fév. 2026"
  },
  {
    id: 20,
    tag: "France — ONU",
    title: "Fabrice Aidan : le protecteur diplomatique français qui a permis le retour d'Epstein à l'ONU",
    desc: "Ce fonctionnaire onusien de nationalité française aurait facilité l'accréditation d'Epstein auprès des Nations Unies à New York.",
    categories: ["france", "reseau"],
    countries: ["france", "usa"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/a-lonu-fabrice-aidan-ce-protecteur-diplomatique-francais-qui-a-permis-le-retour-de-jeffrey-epstein-3b9a6f84-10b5-11f1-8e97-58d10b9feb4d",
    date: "Fév. 2026"
  },
  {
    id: 21,
    tag: "Finance — UK",
    title: "Comment Epstein avait réussi à s'introduire au cœur de l'empire Rothschild",
    desc: "Analyse des connexions entre Epstein et la puissante famille bancaire britannique — réunions privées, co-investissements, accès au gotha.",
    categories: ["finance", "reseau"],
    countries: ["uk", "france"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/info-ouest-france-comment-jeffrey-epstein-avait-reussi-a-sintroduire-au-cur-de-lempire-rothschild-2cd246ba-0e7c-11f1-8e97-58d10b9feb4d",
    date: "Fév. 2026"
  },
  {
    id: 22,
    tag: "France — Immobilier",
    title: "Epstein voulait s'offrir le château du Da Vinci Code, à une heure de Paris",
    desc: "Château de Villette, décor du film Da Vinci Code : des négociations avancées entre Epstein et ses intermédiaires français ont été révélées.",
    categories: ["france", "finance"],
    countries: ["france"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/info-ouest-france-jeffrey-epstein-voulait-soffrir-le-chateau-de-da-vinci-code-a-une-heure-de-paris-c370d2e2-0e33-11f1-b929-abb85d5fd4cd",
    date: "Fév. 2026"
  },
  {
    id: 23,
    tag: "UK — Royal",
    title: "L'arrestation de l'ex-prince Andrew secoue le Royaume-Uni",
    desc: "Le duc d'York, figure incontournable de l'affaire Epstein, finalement mis en examen dans le cadre des enquêtes internationales.",
    categories: ["reseau", "justice"],
    countries: ["uk"],
    url: "https://www.ouest-france.fr/europe/royaume-uni/larrestation-de-lex-prince-andrew-secoue-le-royaume-uni-61b9e426-0da2-11f1-b839-4d59eb76df60",
    date: "Fév. 2026"
  },
  {
    id: 24,
    tag: "France — Brunel",
    title: "Un reportage de 1988 montre Jean-Luc Brunel au cœur du système parisien",
    desc: "Des archives télévisées vieilles de 35 ans lèvent le voile sur les méthodes de l'agent de mannequins avant sa rencontre avec Epstein.",
    categories: ["france", "reseau"],
    countries: ["france"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/affaire-epstein-un-reportage-de-1988-montre-jean-luc-brunel-au-cur-du-systeme-parisien-cc45adbc-0cb1-11f1-a992-d10c268d755d",
    date: "Fév. 2026"
  },
  {
    id: 25,
    tag: "Témoignage — France",
    title: "«J'ai été droguée et violée à Paris» : le témoignage glaçant d'une ancienne mannequin",
    desc: "Une victime témoigne à visage couvert de son recrutement dans les milieux de la mode parisienne et des violences subies.",
    categories: ["france", "justice"],
    countries: ["france"],
    url: "https://www.ouest-france.fr/monde/etats-unis/jeffrey-epstein/affaire-epstein-jai-ete-droguee-et-violee-a-paris-le-temoignage-glacant-dune-ancienne-mannequin-ba510ca0-0bd5-11f1-b839-4d59eb76df60",
    date: "Fév. 2026"
  }
];

// Country map data — computed from ARTICLES
const COUNTRY_DATA = {
  france: {
    name: "France", flag: "🇫🇷",
    svgIds: ["fr"],
    articles: ARTICLES.filter(a => a.countries.includes("france"))
  },
  usa: {
    name: "États-Unis", flag: "🇺🇸",
    svgIds: ["us"],
    articles: ARTICLES.filter(a => a.countries.includes("usa"))
  },
  uk: {
    name: "Royaume-Uni", flag: "🇬🇧",
    svgIds: ["gb"],
    articles: ARTICLES.filter(a => a.countries.includes("uk"))
  },
  russia: {
    name: "Russie", flag: "🇷🇺",
    svgIds: ["ru"],
    articles: ARTICLES.filter(a => a.countries.includes("russia"))
  },
  austria: {
    name: "Autriche", flag: "🇦🇹",
    svgIds: ["at"],
    articles: ARTICLES.filter(a => a.countries.includes("austria"))
  },
  usvi: {
    name: "Îles Vierges américaines", flag: "🏝",
    svgIds: [],
    articles: ARTICLES.filter(a => a.countries.includes("usvi"))
  }
};
