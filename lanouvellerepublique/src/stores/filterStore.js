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

  // Mapping entre labels et noms de champs API
  const fieldMapping = {
    // Dietary
    'Vegan': 'vegan',
    'Végétarien': 'vegetarien',
    'Sans gluten': 'gluten_free',
    'Halal': 'halal',
    // Cuisine
    'Tourangelle': 'french',
    'Asiatique': 'asian',
    'Italienne': 'italian',
    'Américaine': 'american',
    'Orientale': 'middle_eastern',
    'Méditerranéenne': 'mediterranean',
    'Indienne': 'indian',
    'Cuisine du monde': 'world_cuisine',
    'Traditionnelle': 'traditional',
    'Street Food': 'street_food',
    // Ambiance
    'Entre amis': 'friends',
    'Famille': 'family',
    'Romantique': 'romantic',
    'Professionnel': 'professional',
    // Budget (not in database schema, placeholder)
    '1-10€': 'budget_1_10',
    '10-20€': 'budget_10_20',
    '20-30€': 'budget_20_30',
    '+30€': 'budget_30_plus',
    // Service
    'Sur place': 'on_site',
    'À emporter': 'takeaway',
    'Livraison': 'delivery',
  }

  // Restaurants filtrés (computed)
  const filteredRestaurants = computed(() => {
    return restaurantsWithCategories.value.filter((restaurant) => {
      const categories = restaurant.categories[0] || {}

      // Filtre: Coup de Cœur
      if (filters.value.coupDeCoeur && !restaurant.coupDeCoeur) {
        return false
      }

      // Filtre: Préférences alimentaires
      if (filters.value.dietary.length > 0) {
        const hasAnyDietary = filters.value.dietary.some((selectedLabel) => {
          const fieldName = fieldMapping[selectedLabel]
          return categories[fieldName] === 1 || categories[fieldName] === true
        })
        if (!hasAnyDietary) return false
      }

      // Filtre: Type de cuisine
      if (filters.value.cuisine.length > 0) {
        const hasAnyCuisine = filters.value.cuisine.some((selectedLabel) => {
          const fieldName = fieldMapping[selectedLabel]
          return categories[fieldName] === 1 || categories[fieldName] === true
        })
        if (!hasAnyCuisine) return false
      }

      // Filtre: Ambiance
      if (filters.value.ambiance.length > 0) {
        const hasAnyAmbiance = filters.value.ambiance.some((selectedLabel) => {
          const fieldName = fieldMapping[selectedLabel]
          return categories[fieldName] === 1 || categories[fieldName] === true
        })
        if (!hasAnyAmbiance) return false
      }

      // Filtre: Budget
      if (filters.value.budget.length > 0) {
        const hasAnyBudget = filters.value.budget.some((selectedLabel) => {
          const fieldName = fieldMapping[selectedLabel]
          return categories[fieldName] === 1 || categories[fieldName] === true
        })
        if (!hasAnyBudget) return false
      }

      // Filtre: Service
      if (filters.value.service.length > 0) {
        const hasAnyService = filters.value.service.some((selectedLabel) => {
          const fieldName = fieldMapping[selectedLabel]
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
    loading,
    error,
    fetchRestaurantCategories,
    applyFilters,
    clearFilters,
  }
})
