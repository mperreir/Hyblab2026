import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/restaurant';
const IMAGE_BASE_URL = 'http://localhost:3000/img';

const restaurantImageById = {
  1: 'resto ramen.jpg',
  2: 'resto nobi nobi.jpg',
  3: 'resto miettes.jpg',
  4: 'resto le chalet.jpg',
  5: 'resto tours bouillon.jpg',
  6: 'resto mensa et potus.jpg',
  7: 'resto artisan crepier.jpg',
  8: 'resto bistrok.jpg',
  9: 'resto franchises poulet.jpg',
  10: 'resto franchises poulet pb poulet braisé plat.jpg',
  11: 'resto AP.jpg',
};

const res = await axios.get(API_BASE_URL);
const restaurants = res.data;

const restaurantsWithDate = restaurants.map((restaurant) => ({
  ...restaurant,
  image: restaurantImageById[restaurant.id]
    ? `${IMAGE_BASE_URL}/${encodeURIComponent(restaurantImageById[restaurant.id])}`
    : '',
  date: restaurant.date || '12/03/2026',
  hook: restaurant.hook || `A decouvrir: ${restaurant.name}`,
}))

export default restaurantsWithDate;
