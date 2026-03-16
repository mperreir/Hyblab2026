<template>
    <div class="article">
        <CartePostale
            :title="restaurant.name"
            :image="restaurant.image"
            :badges="restaurant.categories || {}"
            :coup-de-coeur="restaurant.coupDeCoeur"
            :address="restaurant.address"
        />
        <div class="badges">
            <div v-for="(badge, index) in allBadges" :key="index" :class="`badge--${badge[1]}`">
                {{ badge[0] }}
            </div>
        </div>
        <RestaurantDetail :restaurant="restaurant" />
        <button class="share-button" @click="sharePage">
            <p class="share-button__text">Partager</p>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.3335 10.0001V16.6667C3.3335 17.1088 3.50909 17.5327 3.82165 17.8453C4.13421 18.1578 4.55814 18.3334 5.00016 18.3334H15.0002C15.4422 18.3334 15.8661 18.1578 16.1787 17.8453C16.4912 17.5327 16.6668 17.1088 16.6668 16.6667V10.0001M13.3335 5.00008L10.0002 1.66675M10.0002 1.66675L6.66683 5.00008M10.0002 1.66675V12.5001" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CartePostale from './CartePostale.vue';
import RestaurantDetail from './RestaurantDetail.vue';
import MAPPING_CAT from '@/constants/categories';

import { sharePage } from '@/utils/share';

const p = defineProps({
    restaurant: {
        type: Object,
        default: () => ({}),
    },
})

const allBadges = computed(() => {
    let badges = []
    Object.keys(p.restaurant.categories).forEach((category) => {
        p.restaurant.categories[category].forEach((v) => badges.push([MAPPING_CAT[category][v], category]))
    })
    return badges
})
</script>

<style scoped>
.article {
    position: relative;
    top: 9rem;

    z-index: 1003;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;

    background: #fffcf8;
}

.share-button {
    display: flex;
    width: 180px;
    padding: 16px 40px;
    justify-content: center;
    align-items: center;
    gap: 5px;

    border-radius: 30px;
    background: #e815b2;

    margin-bottom: 20px;
}
.share-button__text {
    color: #fff;

    font-family: "OpenSans";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
}
.share-button svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
}

.badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-left: 10px;
    padding-right: 10px;

    color: #000;
    font-family: "OpenSans";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16.5px;
}

.badge--diet {
    display: flex;
    padding: 3px 9px;
    align-items: center;
    gap: 3px;

    border-radius: 37.5px;
    background: #EBF8E7;
}
.badge--cuisine_type {
    display: flex;
    padding: 3px 9px;
    align-items: center;
    gap: 3px;

    border-radius: 37.5px;
    background: #E6F2FB;
}
.badge--ambiance {
    display: flex;
    padding: 3px 9px;
    align-items: center;
    gap: 3px;

    border-radius: 37.5px;
    background: #FFEBCB;
}
.badge--budget {
    display: flex;
    padding: 3px 9px;
    align-items: center;
    gap: 3px;

    border-radius: 37.5px;
    background: #FFC8B8;
}
.badge--service {
    display: flex;
    padding: 3px 9px;
    align-items: center;
    gap: 3px;

    border-radius: 37.5px;
    background: #C1ADFF;
}
</style>
