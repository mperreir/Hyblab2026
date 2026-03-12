const restaurants = [
  { name: "La Cigale", latitude: 47.2127, longitude: -1.5614, badges: ["Option vegetarienne", "Sans gluten"], image: "https://picsum.photos/seed/la-cigale/640/360" }, // Place Graslin
  { name: "L'Entrecôte", latitude: 47.2138, longitude: -1.5539, badges: ["Option sans gluten"], image: "https://picsum.photos/seed/entrecote-nantes/640/360" }, // Rue du Couëdic
  { name: "Le Nid (Tour Bretagne)", latitude: 47.2175, longitude: -1.5581, badges: ["Vegan", "Sans gluten"], image: "https://picsum.photos/seed/le-nid-nantes/640/360" }, // Tour Bretagne
  { name: "Le Bouchon", latitude: 47.2152, longitude: -1.5531, badges: ["Option vegetarienne"], image: "https://picsum.photos/seed/le-bouchon-nantes/640/360" }, // Quartier Bouffay
  { name: "Pickles", latitude: 47.2163, longitude: -1.5518, badges: ["Vegan", "Sans lactose"], image: "https://picsum.photos/seed/pickles-nantes/640/360" }, // Rue de la Marinière
  { name: "L'U.ni", latitude: 47.2115, longitude: -1.5471, badges: ["Option sans gluten", "Option vegetarienne"], image: "https://picsum.photos/seed/l-uni-nantes/640/360" }, // Rue Fouré
  { name: "Le Manoir de la Régate", latitude: 47.2885, longitude: -1.5218, badges: ["Option vegetarienne", "Produits locaux"], image: "https://picsum.photos/seed/manoir-regate/640/360" }, // Bord de l'Erdre
  { name: "La Civelle", latitude: 47.1925, longitude: -1.5835, badges: ["Sans gluten"], image: "https://picsum.photos/seed/la-civelle/640/360" }, // Trentemoult
  { name: "Le Lieu Unique", latitude: 47.2154, longitude: -1.5458, badges: ["Vegan", "Sans gluten", "Bio"], image: "https://picsum.photos/seed/lieu-unique/640/360" }, // Quai Ferdinand-Favre
  { name: "Le Loup, le Renard et la Galette", latitude: 47.2147, longitude: -1.5542, badges: ["Sans gluten", "Option vegetarienne"], image: "https://picsum.photos/seed/loup-renard-galette/640/360" }, // Rue de la Juiverie
  // les vraies coordonnées des restaurantes de Tours
  { name: "Yumi remapEvents,",latitude :47.39442358843276, longitude: 0.6821830966686332}, // Rue de la Monnaie
  { name: "Nobi Nobi ", latitude: 47.39414919627798, longitude: 0.6875319093899888}, // Rue Nationale
  { name: "MIETTES", latitude: 47.39403357371746, longitude: 0.6814853311265712}, // Rue de la Rôtisserie
  { name: "Le Chalet", latitude: 47.39743504637095, longitude: 0.6870343037763887}, // Rue Constantine
  { name: "ToursBouillon", latitude: 47.39516438561861, longitude: 0.6857600350967166}, // Rue des Fusillés
  { name : "Mensa et Potus", latitude: 47.39545716298089, longitude: 0.6849842966687121}, //Rue de Commerce
  { name: "L'Atelier Artisan Crêpier", latitude: 47.396092095364246, longitude: 0.6794546176834312}, //Pl. Gaston Pailhou];
  { name: "Le Bistrok", latitude : 47.39680189149334, longitude: 0.6871143625654882}, // Rue Berthelot
  { name: "PB Poulet braisé", latitude : 47.39418199643938, longitude: 0.6794896566086059}, // Rue du Grand Marché
  {name: "Crousty Game", latitude : 47.39395343649799, longitude: 0.6802914138828114}, // Pl. du Grand Marché
  {id: 1, name: "AP par Anglade Pierre", latitude :47.3865565340522, longitude: 0.6907917985146481}
];

const restaurantsWithDate = restaurants.map((restaurant) => ({
  ...restaurant,
  date: restaurant.date || '12/03/2026',
  hook: restaurant.hook || `A decouvrir: ${restaurant.name}`,
}))

export default restaurantsWithDate;

