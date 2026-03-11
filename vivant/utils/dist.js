// func(points,centre, rayon) --> boolean

import * as turf from '@turf/turf';

/**
 * Extrait latitude/longitude depuis un champ JSON string ou objet
 * Format CSV Vivant: {"latitude":"46.84083","longitude":"0.54177",...}
 * @param {*} field - Valeur du champ (string JSON, objet, ou null)
 * @returns {{lat: number|null, lng: number|null}}
 */
function parseCoordinates(field) {
  // Cas 1: Déjà un objet avec lat/lng
  if (field && typeof field === 'object' && !Array.isArray(field)) {
    const lat = parseFloat(field.latitude || field.lat);
    const lng = parseFloat(field.longitude || field.lng);
    return { lat: isNaN(lat) ? null : lat, lng: isNaN(lng) ? null : lng };
  }

  // Cas 2: String JSON à parser (format WordPress CSV)
  if (typeof field === 'string' && field.trim().startsWith('{')) {
    try {
      const cleaned = field.replace(/\\"/g, '"').replace(/\\'/g, "'");
      const parsed = JSON.parse(cleaned);

      const lat = parseFloat(parsed.latitude || parsed.lat);
      const lng = parseFloat(parsed.longitude || parsed.lng);

      return { lat: isNaN(lat) ? null : lat, lng: isNaN(lng) ? null : lng };
    } catch (error) {
      console.warn('⚠️ Erreur parse JSON coordinates:', error);
      return { lat: null, lng: null };
    }
  }

  // Cas 3: Valeur simple (string ou number) - fallback
  if (field !== null && field !== undefined && field !== '') {
    const value = parseFloat(String(field).replace(/"/g, ''));
    return isNaN(value) ? { lat: null, lng: null } : { lat: value, lng: null };
  }

  return { lat: null, lng: null };
}

/**
 * Filtre les articles situés dans un rayon donné autour d'un point centre
 * @param {Array} articles - Tableau d'articles (coords en JSON string ou objet)
 * @param {Object} centre - Point de départ { latitude: number, longitude: number }
 * @param {number} rayon - Rayon de recherche en kilomètres (défaut: 50)
 * @param {string} coordField - Nom du champ contenant les coords (défaut: '_latlngmarker')
 * @returns {Array} Articles filtrés + distance calculée
 */
export function filterArticlesByRadius(articles, centre, rayon = 50, coordField = '_latlngmarker') {
  // Validation des paramètres
  if (!articles || !Array.isArray(articles)) {
    console.warn('⚠️ Articles doit être un tableau');
    return [];
  }

  if (!centre || typeof centre.latitude !== 'number' || typeof centre.longitude !== 'number') {
    console.warn('⚠️ Centre doit contenir latitude et longitude valides');
    return [];
  }

  // Créer le point centre avec Turf (ordre: [longitude, latitude] - norme GeoJSON)
  const centrePoint = turf.point([centre.longitude, centre.latitude]);

  // Filtrer et enrichir les articles
  const articlesFiltres = articles.reduce((acc, article) => {
    // 🔄 Extraction flexible des coordonnées
    let lat = null, lng = null;

    // Option A: Champ JSON dédié (ex: _latlngmarker)
    if (coordField && article[coordField]) {
      const coords = parseCoordinates(article[coordField]);
      lat = coords.lat;
      lng = coords.lng;
    }

    // Option B: Champs latitude/longitude séparés (fallback)
    if ((lat === null || lng === null) && article.latitude && article.longitude) {
      const directLat = parseCoordinates(article.latitude);
      const directLng = parseCoordinates(article.longitude);
      lat = directLat.lat ?? lat;
      lng = directLng.lng ?? lng;
    }

    // Skip si coordonnées invalides
    if (lat === null || lng === null) {
      return acc;
    }

    try {
      // Créer le point de l'article
      const articlePoint = turf.point([lng, lat]);

      // Calculer la distance en kilomètres
      const distance = turf.distance(centrePoint, articlePoint, { units: 'kilometers' });

      // Inclure l'article si dans le rayon
      if (distance <= rayon) {
        acc.push({
          ...article,
          _distanceFromCentre: Math.round(distance * 100) / 100, // Arrondi à 2 décimales
          _inRadius: true
        });
      }
    } catch (error) {
      console.warn(`⚠️ Erreur calcul distance pour "${article.title || article.slug}":`, error);
    }

    return acc;
  }, []);

  // Trier par distance croissante (plus proche en premier)
  articlesFiltres.sort((a, b) => a._distanceFromCentre - b._distanceFromCentre);

  return articlesFiltres;
}

/**
 * Calcule la distance entre deux points sans filtrage
 * @param {Object} point1 - { latitude, longitude }
 * @param {Object} point2 - { latitude, longitude }
 * @param {string} units - 'kilometers' | 'miles' | 'meters' | 'degrees'
 * @returns {number} Distance
 */
export function calculateDistance(point1, point2, units = 'kilometers') {
  const p1 = turf.point([point1.longitude, point1.latitude]);
  const p2 = turf.point([point2.longitude, point2.latitude]);
  return turf.distance(p1, p2, { units });
}

/**
 * Trouve les N articles les plus proches d'un centre
 * @param {Array} articles 
 * @param {Object} centre 
 * @param {number} limit - Nombre max d'articles à retourner
 * @param {string} coordField - Nom du champ contenant les coords
 * @returns {Array}
 */
export function findNearestArticles(articles, centre, limit = 10, coordField = '_latlngmarker') {
  return filterArticlesByRadius(articles, centre, 99999, coordField).slice(0, limit);
}

// test-fetch.js
import fetch from 'node-fetch';           // omit if Node ≥18

const URL = 'http://localhost:8080/vivant/api/articles';

(async () => {
  try {
    const res = await fetch(URL);
    const articles = await res.json();
    console.log(articles)
    console.log('received', articles.length, 'articles');

    // call one of your util functions just to be sure it works
    const near = filterArticlesByRadius(
      articles,
      { latitude: 48.0, longitude: 2.0 },
      50
    );
    console.log('articles within 50 km:', near.length);
  } catch (e) {
    console.error(e);
  }
})();