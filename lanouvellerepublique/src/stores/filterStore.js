import { defineStore } from "pinia"
import { ref, computed } from "vue"
import restaurants from "@/restaurants.js"

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

    // Mapping entre labels et noms de champs API
    const fieldMapping = {
        // Dietary
        vegetarien: "Végétarien",
        gluten_free: "Sans gluten",
        halal: "Halal",

        // Cuisine
        tourgangelle: "Tourangelle",
        asian: "Asiatique",
        italian: "Italienne",
        american: "Américaine",
        middle_eastern: "Orientale",
        mediterranean: "Méditerranéenne",
        indian: "Indienne",
        world_cuisine: "Cuisine du monde",
        traditional: "Traditionnelle",
        street_food: "Street Food",

        // Ambiance
        friends: "Entre amis",
        family: "Famille",
        romantic: "Romantique",
        professional: "Professionnel",

        // Budget
        budget_1_10: "1-10€",
        budget_10_20: "10-20€",
        budget_20_30: "20-30€",
        budget_30_plus: "+30€",

        // Service
        on_site: "Sur place",
        takeaway: "À emporter",
        delivery: "Livraison",
    }

    // Restaurants filtrés (computed)
    const filteredRestaurants = computed(() => {
        return restaurants.filter((restaurant) => {

            // Coup de Cœur
            if (filters.value.coupDeCoeur && !restaurant.coupDeCoeur) return false

            // catégories
            for (let category of Object.keys(restaurant.categories)) {
                if (filters.value[category].length > 0) {
                    let filterHasValue = restaurant.categories[category].some((element) =>
                        filters.value[category].includes(fieldMapping[element]),
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
