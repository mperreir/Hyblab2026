<template>
    <div class="map-layout">
        <div class="map-canvas">
            <l-map
                :zoom="zoom"
                :center="userCoords ? userCoords : fallback_position"
                :zoom-control="false"
                :use-global-leaflet="false"
                ref="mapRef"
                @ready="onMapReady"
            >
                <l-tile-layer :url="mapTilerUrl" />

                <l-marker v-if="userCoords" :lat-lng="userCoords" :icon="markerIcon" />

                <MapMarker
                    v-for="(r, index) in restaurants"
                    :key="r.name"
                    :coords="[r.latitude, r.longitude]"
                    :image="buildRestaurantImage(r.name)"
                    :is-active="selectedIndex === index"
                    :restaurant-index="index"
                    @focus-marker="focusRestaurant"
                />
            </l-map>
        </div>

        <div
            class="restaurant-carousel-wrapper"
            :class="{ 'restaurant-carousel-wrapper--detail': isClicked }"
        >
            <button class="carousel-nav" type="button" @click="goPrevious">&#8249;</button>

            <div ref="carouselRef" class="restaurant-carousel" @scroll.passive="onCarouselScroll">
                <div
                    v-for="(r, index) in restaurants"
                    :key="r.name"
                    class="restaurant-carousel__slide"
                    @click="focusRestaurant(index)"
                >
                    <RestaurantMiniBox
                        @click="openDetail(index)"
                        :name="r.name"
                        :image="buildRestaurantImage(r.name)"
                        :latitude="r.latitude"
                        :longitude="r.longitude"
                        :is-active="selectedIndex === index"
                        @focus-box="focusRestaurant(index)"
                    />
                    <RestaurantDetail
                        v-if="isClicked && selectedIndex === index"
                        :name="r.name"
                        :image="buildRestaurantImage(r.name)"
                        :latitude="r.latitude"
                        :longitude="r.longitude"
                    />
                </div>
            </div>

            <button class="carousel-nav" type="button" @click="goNext">&#8250;</button>
        </div>
    </div>
</template>

<script setup>
import "leaflet/dist/leaflet.css"
import { ref, watch, computed } from "vue"
import { control, divIcon } from "leaflet"
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet"
import MapMarker from "./MapMarker.vue"
import RestaurantMiniBox from "./RestaurantMiniBox.vue"
import RestaurantDetail from "./RestaurantDetail.vue"
import { userCoords } from "@/stores/mapStore"
import { useFilterStore } from '@/stores/filterStore'

const filterStore = useFilterStore()
const restaurants = computed(() => filterStore.filteredRestaurants)

const API_KEY = "b4BxT11KjV5Zzm2lo2V1"
const STYLE = "streets-v4"
const mapTilerUrl = `https://api.maptiler.com/maps/${STYLE}/{z}/{x}/{y}.png?key=${API_KEY}`
const fallback_position = [47.38935859649009, 0.6860130852825314]

const markerIcon = divIcon({
    className: "user-location-dot",
    html: '<div class="user-dot"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
})

const selectedIndex = ref(0)
const mapRef = ref(null)
const carouselRef = ref(null)
const zoom = ref(13)
const isClicked = ref(false)

const openDetail = (index) => {
    isClicked.value = !isClicked.value
    focusRestaurant(index)
}
let zoomControlInstance = null
let scrollEndTimer = null

const stopWatch = watch(userCoords, (newCoords) => {
    if (newCoords && mapRef.value?.leafletObject) {
        mapRef.value.leafletObject.setView(newCoords, zoom.value)
        stopWatch()
    }
})

const buildRestaurantImage = (restaurantName) =>
    `https://picsum.photos/seed/${encodeURIComponent(restaurantName)}/96/96`

const scrollToRestaurant = (index, smooth = true) => {
    const carousel = carouselRef.value
    if (!carousel) return
    const slide = carousel.children[index]
    if (!slide) return
    const left = slide.offsetLeft - (carousel.clientWidth - slide.offsetWidth) / 2

    carousel.scrollTo({
        left,
        behavior: smooth ? "smooth" : "instant",
    })
}

const centerMapToRestaurant = (index) => {
    const map = mapRef.value.leafletObject
    const restaurant = restaurants[index]

    map.flyTo([restaurant.latitude, restaurant.longitude], 14, {
        duration: 0.8,
    })
}

const focusRestaurant = (index) => {
    const distance = Math.abs(index - selectedIndex.value)
    selectedIndex.value = index
    scrollToRestaurant(index, distance <= 1)
    centerMapToRestaurant(index)
}

const goPrevious = () => {
    const nextIndex = (selectedIndex.value - 1 + restaurants.length) % restaurants.length
    isClicked.value = false
    focusRestaurant(nextIndex)
}

const goNext = () => {
    const nextIndex = (selectedIndex.value + 1) % restaurants.length
    isClicked.value = false
    focusRestaurant(nextIndex)
}

const syncSelectedIndexFromScroll = () => {
    const carousel = carouselRef.value

    if (!carousel || carousel.clientWidth === 0) {
        return
    }

    scrollToRestaurant(selectedIndex.value, false, true)
}

const onCarouselScroll = () => {
    clearTimeout(scrollEndTimer)
    scrollEndTimer = setTimeout(() => {
        const carousel = carouselRef.value
        if (!carousel || carousel.clientWidth === 0) return

        const center = carousel.scrollLeft + carousel.clientWidth / 2
        let closest = 0
        let minDist = Infinity
        for (let i = 0; i < carousel.children.length; i++) {
            const child = carousel.children[i]
            const childCenter = child.offsetLeft + child.offsetWidth / 2
            const dist = Math.abs(center - childCenter)
            if (dist < minDist) {
                minDist = dist
                closest = i
            }
        }

        if (closest !== selectedIndex.value) {
            selectedIndex.value = closest
            centerMapToRestaurant(closest)
        }
    }, 80)
}

const onMapReady = (map) => {
    if (map?.zoomControl) map.removeControl(map.zoomControl)
    if (zoomControlInstance) zoomControlInstance.remove()
    zoomControlInstance = control.zoom({ position: "topright" })
    zoomControlInstance.addTo(map)
}
</script>

<style scoped>
.map-layout {
    height: 100dvh;
    width: 100%;
    position: relative;
    overflow: hidden;
}

.map-canvas {
    height: 100%;
    width: 100%;
}

.map-canvas :deep(.leaflet-container) {
    width: 100%;
    height: 100%;
}

.restaurant-carousel-wrapper {
    position: absolute;
    left: 0;
    bottom: calc(4.2rem + 4.2rem + max(0.75rem, env(safe-area-inset-bottom)));
    width: 100%;
    z-index: 500;
    display: grid;
    grid-template-columns: auto minmax(0, 560px) auto;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    transition: transform 0.4s ease-in-out;
}

.carousel-nav {
    width: 34px;
    height: 34px;
    border-radius: 999px;
    border: 1px solid #cbd5e1;
    background: #ffffff;
    color: #0f172a;
    font-size: 1.4rem;
    line-height: 1;
    cursor: pointer;
}

.restaurant-carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    padding: 0.4rem 0;
}

.restaurant-carousel::-webkit-scrollbar {
    display: none;
}

.restaurant-carousel__slide {
    flex: 0 0 92%;
    scroll-snap-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.restaurant-carousel-wrapper--detail {
    position: fixed;
    display: grid;
    grid-template-columns: auto minmax(0, 560px) auto;
    align-items: start;
    justify-content: center;
    gap: 0.65rem;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    transform: translateY(-83%);
    height: 100%;
    background-color: #ffffff;
    z-index: 1000;
}

.restaurant-carousel__slide :deep(.mini-box) {
    width: 100%;
    transition:
        opacity 0.25s ease,
        transform 0.25s ease;
}

.restaurant-carousel__slide :deep(.mini-box.mini-box--active) {
    opacity: 1;
    transform: scale(1);
}

:deep(.leaflet-top.leaflet-right .leaflet-control-zoom) {
    margin-top: 12px;
    margin-right: 12px;
}

:deep(.user-location-dot) {
    background: none !important;
    border: none !important;
}

:deep(.user-dot) {
    width: 18px;
    height: 18px;
    background: #e91e8a;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(233, 30, 138, 0.5);
}

@media (max-width: 700px) {
    .map-canvas {
        height: 600px;
    }

    .restaurant-carousel-wrapper {
        width: 100%;
    }
}
</style>
