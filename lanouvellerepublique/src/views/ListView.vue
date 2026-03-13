<script setup>
import { computed } from "vue"
import { useRouter } from "vue-router"
import ListItem from "@/components/List_item.vue"
import IntroListe from "@/components/intro_liste.vue"
import { COLORS } from "@/assets/Couleurs/Coulleurs.js"
import { useFilterStore } from "@/stores/filterStore"

const filterStore = useFilterStore()
const router = useRouter()
const listBg = COLORS.cream

const toTimestamp = (dateStr) => {
    if (!dateStr) return 0

    const frMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dateStr)
    if (frMatch) {
        const [, day, month, year] = frMatch
        return new Date(Number(year), Number(month) - 1, Number(day)).getTime()
    }

    const parsed = new Date(dateStr).getTime()
    return Number.isNaN(parsed) ? 0 : parsed
}

const sortedRestaurants = computed(() =>
    [...filterStore.filteredRestaurants].sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date)),
)

const openRestaurantDetail = async (restaurant) => {
    if (!restaurant) return

    const restaurantKey = restaurant.id ?? restaurant.name

    await router.push({
        path: "/carte",
        query: {
            restaurant: String(restaurantKey),
            detail: "1",
            pick: String(Date.now()),
        },
    })
}
</script>

<template>
    <main class="list-view">
        <IntroListe />
        <ListItem
            v-for="restaurant in sortedRestaurants"
            :key="restaurant.name"
            :title="restaurant.hook || restaurant.name"
            :image="restaurant.image"
            :badges="restaurant.categories || {}"
            :coup-de-coeur="restaurant.coupDeCoeur"
            :date="restaurant.date || ''"
            @select="openRestaurantDetail(restaurant)"
        >
        </ListItem>
    </main>
</template>

<style scoped>
.list-view {
    min-height: 100vh;
    padding: 8.6rem 1.25rem 10rem;
    background: v-bind(listBg);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.list-view > :deep(.list-item) {
    width: 100%;
    max-width: 600px;
}

@media (min-width: 768px) {
    .list-view {
        padding-top: 8.2rem;
        padding-bottom: 1.25rem;
    }
}
</style>
