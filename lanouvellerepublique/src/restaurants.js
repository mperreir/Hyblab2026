import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/restaurant';
const res = await axios.get(API_BASE_URL);
const restaurants = res.data;


const restaurantsWithDate = restaurants.map((restaurant) => ({
  ...restaurant,
  date: restaurant.date || '12/03/2026',
  hook: restaurant.hook || `A decouvrir: ${restaurant.name}`,
}))

export default restaurantsWithDate;
