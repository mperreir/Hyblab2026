import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import restaurantsData from '@/restaurants.js'

export const useFilterStore = defineStore('filterStore', () => {
  // État des filtres
  const filters = ref({
    coupDeCoeur: false,
    dietary: [],
    cuisine: [],
    ambiance: [],
    budget: [],
    service: [],
  })

  // Catégories disponibles (récupérées de l'API)
  const availableCategories = ref({
    dietary: [],
    cuisine: [],
    ambiance: [],
    budget: [],
    service: [],
  })

  // Liste des restaurants avec leurs catégories (enrichis de l'API)
  const restaurantsWithCategories = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Récupérer les catégories pour chaque restaurant via l'API
  const fetchRestaurantCategories = async () => {
    loading.value = true
    error.value = null

    try {
      // Enrichir chaque restaurant avec ses catégories
      const enriched = await Promise.all(
        restaurantsData.map(async (restaurant) => {
          try {
            // Essayer de récupérer les catégories via l'API
            const res = await axios.get(`http://localhost:3000/api/restaurant/getRestaurantCat/${restaurant.id || restaurant.name}`)
            return {
              ...restaurant,
              categories: res.data || [],
            }
          } catch (err) {
            // Si l'API ne répond pas, retourner le restaurant sans catégories
            console.warn(`Categories not found for ${restaurant.name}`, err)
            return {
              ...restaurant,
              categories: [],
            }
          }
        })
      )
      restaurantsWithCategories.value = enriched

      // Extraire les catégories uniques
      extractAvailableCategories(enriched)
    } catch (err) {
      console.error('Error fetching restaurant categories:', err)
      error.value = err.message
      // Fallback : utiliser les restaurants locaux sans catégories
      restaurantsWithCategories.value = restaurantsData.map((r) => ({
        ...r,
        categories: [],
      }))
    } finally {
      loading.value = false
    }
  }

  // Extraire toutes les catégories uniques des restaurants
  const extractAvailableCategories = (restaurants) => {
    const categories = {
      dietary: [],
      cuisine: [],
      ambiance: [],
      budget: [],
      service: [],
    }

    // Noms des champs qui correspondent aux catégories alimentaires
    const dietaryFields = ['diet_vegan', 'vegan', 'diet_vegetarien', 'vegetarien', 'diet_sans_gluten', 'sans_gluten', 'diet_halal', 'halal']
    const cuisineFields = ['cuisine_tourangelle', 'tourangelle', 'cuisine_asiatique', 'asiatique', 'cuisine_italienne', 'italienne', 'cuisine_americaine', 'americaine', 'cuisine_orientale', 'orientale', 'cuisine_mediterraneenne', 'mediterraneenne', 'cuisine_indienne', 'indienne', 'cuisine_du_monde', 'du_monde', 'cuisine_traditionnelle', 'traditionnelle', 'cuisine_street_food', 'street_food']
    const ambianceFields = ['ambiance_entre_amis', 'entre_amis', 'ambiance_famille', 'famille', 'ambiance_romantique', 'romantique', 'ambiance_professionnel', 'professionnel']
    const budgetFields = ['budget_1_10', '1-10', 'budget_10_20', '10-20', 'budget_20_30', '20-30', 'budget_30', '+30']
    const serviceFields = ['service_sur_place', 'sur_place', 'service_a_emporter', 'a_emporter', 'service_livraison', 'livraison']

    // Extraire les hautes du mapping
    const dietaryMapping = {
      'diet_vegan': 'Vegan',
      'vegan': 'Vegan',
      'diet_vegetarien': 'Végétarien',
      'vegetarien': 'Végétarien',
      'diet_sans_gluten': 'Sans gluten',
      'sans_gluten': 'Sans gluten',
      'diet_halal': 'Halal',
      'halal': 'Halal',
    }
    const cuisineMapping = {
      'cuisine_tourangelle': 'Tourangelle',
      'tourangelle': 'Tourangelle',
      'cuisine_asiatique': 'Asiatique',
      'asiatique': 'Asiatique',
      'cuisine_italienne': 'Italienne',
      'italienne': 'Italienne',
      'cuisine_americaine': 'Américaine',
      'americaine': 'Américaine',
      'cuisine_orientale': 'Orientale',
      'orientale': 'Orientale',
      'cuisine_mediterraneenne': 'Méditerranéenne',
      'mediterraneenne': 'Méditerranéenne',
      'cuisine_indienne': 'Indienne',
      'indienne': 'Indienne',
      'cuisine_du_monde': 'Cuisine du monde',
      'du_monde': 'Cuisine du monde',
      'cuisine_traditionnelle': 'Traditionnelle',
      'traditionnelle': 'Traditionnelle',
      'cuisine_street_food': 'Street Food',
      'street_food': 'Street Food',
    }
    const ambianceMapping = {
      'ambiance_entre_amis': 'Entre amis',
      'entre_amis': 'Entre amis',
      'ambiance_famille': 'Famille',
      'famille': 'Famille',
      'ambiance_romantique': 'Romantique',
      'romantique': 'Romantique',
      'ambiance_professionnel': 'Professionnel',
      'professionnel': 'Professionnel',
    }
    const budgetMapping = {
      'budget_1_10': '1-10€',
      '1-10': '1-10€',
      'budget_10_20': '10-20€',
      '10-20': '10-20€',
      'budget_20_30': '20-30€',
      '20-30': '20-30€',
      'budget_30': '+30€',
      '+30': '+30€',
    }
    const serviceMapping = {
      'service_sur_place': 'Sur place',
      'sur_place': 'Sur place',
      'service_a_emporter': 'À emporter',
      'a_emporter': 'À emporter',
      'service_livraison': 'Livraison',
      'livraison': 'Livraison',
    }

    const dietarySet = new Set()
    const cuisineSet = new Set()
    const ambianceSet = new Set()
    const budgetSet = new Set()
    const serviceSet = new Set()

    restaurants.forEach((restaurant) => {
      if (restaurant.categories && restaurant.categories[0]) {
        const cat = restaurant.categories[0]
        console.log('Restaurant categories:', cat) // Debug

        // Parcourir tous les champs et vérifier les booléens
        Object.entries(cat).forEach(([key, value]) => {
          if (value === 1 || value === true || value === '1') {
            if (dietaryMapping[key]) dietarySet.add(dietaryMapping[key])
            if (cuisineMapping[key]) cuisineSet.add(cuisineMapping[key])
            if (ambianceMapping[key]) ambianceSet.add(ambianceMapping[key])
            if (budgetMapping[key]) budgetSet.add(budgetMapping[key])
            if (serviceMapping[key]) serviceSet.add(serviceMapping[key])
          }
        })
      }
    })

    availableCategories.value = {
      dietary: Array.from(dietarySet).sort(),
      cuisine: Array.from(cuisineSet).sort(),
      ambiance: Array.from(ambianceSet).sort(),
      budget: Array.from(budgetSet).sort(),
      service: Array.from(serviceSet).sort(),
    }

    console.log('Available categories:', availableCategories.value) // Debug
  }

  // Appliquer les filtres
  const applyFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  // Réinitialiser les filtres
  const clearFilters = () => {
    filters.value = {
      coupDeCoeur: false,
      dietary: [],
      cuisine: [],
      ambiance: [],
      budget: [],
      service: [],
    }
  }

  // Restaurants filtrés (computed)
  const filteredRestaurants = computed(() => {
    return restaurantsWithCategories.value.filter((restaurant) => {
      const categories = restaurant.categories[0] || {}

      // Filtre: Coup de Cœur
      if (filters.value.coupDeCoeur && !restaurant.coupDeCoeur) {
        return false
      }

      // Filtre: Préférences alimentaires (vérifier les booléens)
      if (filters.value.dietary.length > 0) {
        const hasAnyDietary = filters.value.dietary.some((selectedDiet) => {
          const fieldName = selectedDiet.toLowerCase().replace(/\s+/g, '_')
          return categories[fieldName] === 1 || categories[fieldName] === true
        })
        if (!hasAnyDietary) return false
      }

      // Filtre: Type de cuisine
      if (filters.value.cuisine.length > 0) {
        const hasAnyCuisine = filters.value.cuisine.some((selectedCuisine) => {
          const fieldName = selectedCuisine.toLowerCase().replace(/\s+/g, '_')
          return categories[fieldName] === 1 || categories[fieldName] === true
        })
        if (!hasAnyCuisine) return false
      }

      // Filtre: Ambiance
      if (filters.value.ambiance.length > 0) {
        const hasAnyAmbiance = filters.value.ambiance.some((selectedAmbiance) => {
          const fieldName = selectedAmbiance.toLowerCase().replace(/\s+/g, '_')
          return categories[fieldName] === 1 || categories[fieldName] === true
        })
        if (!hasAnyAmbiance) return false
      }

      // Filtre: Budget
      if (filters.value.budget.length > 0) {
        const hasAnyBudget = filters.value.budget.some((selectedBudget) => {
          const fieldName = selectedBudget.toLowerCase().replace(/\s+/g, '_')
          return categories[fieldName] === 1 || categories[fieldName] === true
        })
        if (!hasAnyBudget) return false
      }

      // Filtre: Service
      if (filters.value.service.length > 0) {
        const hasAnyService = filters.value.service.some((selectedService) => {
          const fieldName = selectedService.toLowerCase().replace(/\s+/g, '_')
          return categories[fieldName] === 1 || categories[fieldName] === true
        })
        if (!hasAnyService) return false
      }

      return true
    })
  })

  return {
    filters,
    restaurantsWithCategories,
    filteredRestaurants,
    availableCategories,
    loading,
    error,
    fetchRestaurantCategories,
    applyFilters,
    clearFilters,
  }
})
