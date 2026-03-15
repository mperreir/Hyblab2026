<template>
    <div class="article">
            <CartePostale
                :title="restaurant.name"
                :image="restaurant.image"
                :badges="restaurant.categories || {}"
                :coup-de-coeur="restaurant.coupDeCoeur"
            />
            <RestaurantDetail
                :restaurant="restaurant"
            />
    </div>
</template>


<script setup lang="ts">
import CartePostale from './CartePostale.vue';
import RestaurantDetail from './RestaurantDetail.vue';
import ListItem from "@/components/List_item.vue"
defineProps({
    restaurant: {
        type: Object,
        default: () => ({}),
    },
})

</script>

<style scoped>
.article {
    position: absolute;
    bottom: 0;
    top: 8.5rem;

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
