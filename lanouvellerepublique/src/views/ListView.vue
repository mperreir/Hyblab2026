<script setup>
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import ListItem from "@/components/List_item.vue"
import IntroListe from "@/components/intro_liste.vue"
import RestaurantOverlay from "@/components/RestaurantOverlay.vue"
import { COLORS } from "@/assets/colors.js"
import { useFilterStore } from "@/stores/filterStore"

const filterStore = useFilterStore()
const route = useRoute()
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

const getRestaurantKey = (restaurant) => String(restaurant?.id ?? restaurant?.name ?? "")

const selectedRestaurant = computed(() => {
    const restaurantKey = route.query.restaurant

    if (route.query.detail !== "1" || !restaurantKey) {
        return null
    }

    const target = String(restaurantKey)

    return (
        sortedRestaurants.value.find(
            (restaurant) =>
                getRestaurantKey(restaurant) === target ||
                String(restaurant?.name ?? "").toLowerCase() === target.toLowerCase(),
        ) ?? null
    )
})

const openRestaurantDetail = async (restaurant) => {
    if (!restaurant) return

    const restaurantKey = getRestaurantKey(restaurant)

    await router.push({
        path: route.path,
        query: {
            ...route.query,
            restaurant: String(restaurantKey),
            detail: "1",
            pick: String(Date.now()),
        },
    })
}

const closeRestaurantDetail = async () => {
    const nextQuery = { ...route.query }

    delete nextQuery.restaurant
    delete nextQuery.detail
    delete nextQuery.pick

    await router.replace({
        path: route.path,
        query: nextQuery,
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
    <RestaurantOverlay
        v-if="selectedRestaurant"
        :restaurant="selectedRestaurant"
        @close="closeRestaurantDetail"
    />
</template>

<style scoped>
.list-view {
    min-height: 100vh;
    padding: 13rem 1.25rem 80px;
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
