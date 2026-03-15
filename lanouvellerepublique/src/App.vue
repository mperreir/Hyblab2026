<script setup>
import { ref, onMounted, computed } from "vue"
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router"
import { COLORS } from "@/assets/colors.js"
import reglageIcon from "@/assets/Icones/Reglage.svg"
import decouvrirIcon from "@/assets/Icones/Decouvrir.svg"
import Header from "@/components/Header.vue"
import Filtres from "./components/Filtres.vue"
import { useFilterStore } from "@/stores/filterStore"
import restaurants from "./constants/restaurants"

const filterStore = useFilterStore()
const route = useRoute()
const router = useRouter()
const showFiltres = ref(false)

const isListRoute = computed(() => route.path === "/")

const onFiltersApply = (appliedFilters) => {
    filterStore.applyFilters(appliedFilters)
}

const inactiveBg = "transparent"
const inactiveColor = COLORS.switchTextBlue
const activeBg = COLORS.pinkSwitch
const activeColor = COLORS.white
const bottomBtnBg = COLORS.white
const bottomBtnColor = COLORS.pinkSwitch
const bottomBtnFilterColor = COLORS.switchTextBlue

const isCarteActive = computed(() => route.path === "/carte")

const randomSelection = () => {
    let i = Math.floor(Math.random() * restaurants.length);
    let restaurant = restaurants[i];

    router.push({
        path: "/carte",
        query: {
            restaurant: String(restaurant.id ?? restaurant.name),
            detail: "1",
            pick: String(Date.now()),
        },
    })
}

</script>

<template>
    <div class="app-shell">
        <Header />
        <nav class="mini-nav" aria-label="Navigation des vues">
            <span
                class="mini-nav__slider"
                :class="{ 'mini-nav__slider--right': isCarteActive }"
            ></span>
            <RouterLink to="/"><strong>Liste</strong></RouterLink>
            <RouterLink to="/carte"><strong>Carte</strong></RouterLink>
        </nav>
        <div class="view-container">
            <RouterView />
        </div>
        <div
            class="global-actions"
            :class="{ 'ui-blocked': showFiltres, 'global-actions--list': isListRoute }"
        >
            <button type="button" class="action-btn action-btn--filter" @click="showFiltres = true">
                <span>Filtrer</span>
                <img :src="reglageIcon" alt="" class="action-btn__icon" aria-hidden="true" />
            </button>
            <button type="button" class="action-btn" @click="randomSelection()">
                <span>Fais-moi découvrir</span>
                <img :src="decouvrirIcon" alt="" class="action-btn__icon" aria-hidden="true" />
            </button>
        </div>
        <Filtres :show="showFiltres" @close="showFiltres = false" @apply="onFiltersApply" />
    </div>
</template>

<style scoped>
.app-shell {
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: 100dvh;
}

.view-container {
    flex: 1;
    min-height: 0;
}

.ui-blocked {
    pointer-events: none;
}

.top-banner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1001;
    text-align: center;
    padding: 2rem 1rem;
    background: #000;
    color: #fff;
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 0.02em;
}

.mini-nav {
    position: fixed;
    top: 5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;

    display: flex;
    gap: 8px;
    border-radius: 50px;
    background: #FFF;
    box-shadow: 2px 4px 10.4px 0 rgba(213, 52, 173, 0.07);

    font-family: "OpenSans";
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px;
}

.mini-nav__slider {
    position: absolute;
    top: 0;
    bottom: 0;
    width: calc(50% - 8px);
    border-radius: 100px;
    background: v-bind(activeBg);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
}

.mini-nav__slider--right {
    transform: translateX(calc(100% + 16px));
}

.mini-nav a {
    position: relative;
    top: 0;
    bottom: 0;
    padding: 11px 60px;

    text-align: center;

    border-radius: 30px;

    background: transparent;
    color: v-bind(inactiveColor);
    transition: color 0.25s ease;
}

.mini-nav a.router-link-exact-active {
    background: transparent;
    color: v-bind(activeColor);
}

@media (min-width: 1024px) {
    .mini-nav {
        top: 4.75rem;
    }
}

.global-actions {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1002;
    display: flex;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.75rem 1.4rem calc(1rem + env(safe-area-inset-bottom));
}

.global-actions--list {
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 250, 244, 0.87) 46.15%,
        #fff9f2 100%
    );
}

.action-btn {
    display: flex;
    justify-content: center;
    gap: 0.45rem;
    border: none;
    border-radius: 999px;
    padding: 1rem 1rem;
    background: v-bind(bottomBtnBg);
    color: v-bind(bottomBtnColor);
    font-weight: 700;
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;
}

.action-btn--filter {
    color: v-bind(bottomBtnFilterColor);
}

.action-btn__icon {
    width: 0.95rem;
    height: 0.95rem;
    object-fit: contain;
}
</style>
