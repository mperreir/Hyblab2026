<script setup>
import { ref, onMounted, computed } from "vue"
import { RouterLink, RouterView, useRoute } from "vue-router"
import { COLORS } from "@/assets/Couleurs/Coulleurs.js"
import reglageIcon from "@/assets/Icones/Reglage.svg"
import decouvrirIcon from "@/assets/Icones/Decouvrir.svg"
import Header from "@/components/icons/Header.vue"
import Filtres from "@/components/Filtres.vue"
import { useFilterStore } from "@/stores/filterStore"

const filterStore = useFilterStore()
const route = useRoute()
const showFiltres = ref(false)

const isListRoute = computed(() => route.path === "/")

const onFiltersApply = (appliedFilters) => {
    filterStore.applyFilters(appliedFilters)
}

onMounted(() => {
    filterStore.fetchRestaurantCategories()
})
const inactiveBg = "transparent"
const inactiveColor = COLORS.switchTextBlue
const activeBg = COLORS.pinkSwitch
const activeColor = COLORS.white
const bottomBtnBg = COLORS.white
const bottomBtnColor = COLORS.pinkSwitch
const bottomBtnFilterColor = COLORS.switchTextBlue
</script>

<template>
    <div class="app-shell">
        <Header />
        <nav class="mini-nav" aria-label="Navigation des vues">
            <span class="mini-nav__slider"></span>
            <RouterLink to="/">Liste</RouterLink>
            <RouterLink to="/carte">Carte</RouterLink>
        </nav>
        <div class="view-container">
            <RouterView />
        </div>
        <div class="global-actions" :class="{ 'ui-blocked': showFiltres, 'global-actions--list': isListRoute }">
            <button type="button" class="action-btn action-btn--filter" @click="showFiltres = true">
                <span>Filtrer</span>
                <img :src="reglageIcon" alt="" class="action-btn__icon" aria-hidden="true" />
            </button>
            <button type="button" class="action-btn">
                <span>Fais-moi decouvrir</span>
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
    /* container is transparent, map-main handles its own positioning */
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
    gap: 0.5rem;
    padding: 0.45rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(6px);
}

.mini-nav a {
    display: inline-block;
    padding: 0.5rem 1.75rem;
    border-radius: 999px;
    text-decoration: none;
    background: v-bind(inactiveBg);
    color: v-bind(inactiveColor);
    font-size: 1.05rem;
    font-weight: 600;
}

.mini-nav a.router-link-exact-active {
    background: v-bind(activeBg);
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
    display: grid;
    grid-template-columns: 125px 235px;
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
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    border: none;
    border-radius: 999px;
    padding: 0.72rem 1.1rem;
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
    transform: translateY(2px);
}
</style>
