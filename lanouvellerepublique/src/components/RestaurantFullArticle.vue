<template>
    <div class="article">
            <CartePostale
                :title="restaurant.name"
                :image="restaurant.image"
                :badges="restaurant.badges"
                :date="restaurant.date"
            />
            <div v-for="badge in allBadges">
                {{ badge }}
            </div>
            <RestaurantDetail
                :restaurant="restaurant"
            />
    </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import CartePostale from './CartePostale.vue';
import RestaurantDetail from './RestaurantDetail.vue';
import MAPPING_CAT from '@/constants/categories';

const p = defineProps({
    restaurant: {
        type: Object,
        default: () => ({}),
    },
})

const allBadges = computed(() => {
    let badges = []
    Object.keys(p.restaurant.categories).forEach(category => {
        p.restaurant.categories[category].forEach(v => badges.push(MAPPING_CAT[category][v]))
    })
    return badges
})

console.log(allBadges.value)

</script>

<style scoped>
.article {
    position: absolute;
    bottom: 0;
    top: 5rem;

    width: 100%;
    height: 100%;

    z-index: 1003;

    display: block;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;

    background-color: #ffffff;

    overflow-y: auto;
    overflow-x: hidden;
}
</style>
