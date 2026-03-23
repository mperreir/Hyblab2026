import { defineStore } from "pinia"
import { ref, computed } from "vue"
import restaurants from "@/constants/restaurants.js"
import mapping_categories from "@/constants/categories"

export const useFilterStore = defineStore("filterStore", () => {
    // État des filtres
    const filters = ref({
        coupDeCoeur: false,
        diet: [],
        cuisine_type: [],
        ambiance: [],
        budget: [],
        service: [],
    })

    const loading = ref(false)
    const error = ref(null)
    // Appliquer les filtres
    const applyFilters = (newFilters) => {
        filters.value = { ...filters.value, ...newFilters }
    }

    // Réinitialiser les filtres
    const clearFilters = () => {
        filters.value = {
            coupDeCoeur: false,
            diet: [],
            cuisine_type: [],
            ambiance: [],
            budget: [],
            service: [],
        }
    }

    const filteredRestaurants = computed(() => {
        return restaurants.filter((restaurant) => {

            // Coup de Cœur
            if (filters.value.coupDeCoeur && !restaurant.coupDeCoeur) return false

            // catégories
            for (let category of Object.keys(restaurant.categories)) {
                if (filters.value[category].length > 0) {
                    let filterHasValue = restaurant.categories[category].some((element) =>
                        filters.value[category].includes(mapping_categories[category][element]),
                    )
                    if (!filterHasValue) return false
                }
            }
            return true
        })
    })

    return {
        filters,
        restaurants,
        filteredRestaurants,
        loading,
        error,
        applyFilters,
        clearFilters,
    }
})
