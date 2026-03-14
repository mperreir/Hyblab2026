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
                    :image="r.image"
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
            <div ref="carouselRef" class="restaurant-carousel" @scroll.passive="onCarouselScroll">
                <div
                    v-for="(r, index) in restaurants"
                    :key="r.name"
                    class="restaurant-carousel__slide"
                    @click="focusRestaurant(index)"
                >
                    <RestaurantMiniBox
                        v-if="!isClicked"
                        @click="openDetail(index)"
                        :title="r.hook"
                        :name="r.name"
                        :image="r.image"
                        :latitude="r.latitude"
                        :longitude="r.longitude"
                        :is-active="selectedIndex === index"
                        @focus-box="focusRestaurant(index)"
                    />
                    <RestaurantFullArticle
                        v-if="isClicked && selectedIndex === index"
                        :restaurant="r"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import "leaflet/dist/leaflet.css"
import { ref, watch, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { control, divIcon } from "leaflet"
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet"
import MapMarker from "./MapMarker.vue"
import RestaurantMiniBox from "./RestaurantMiniBox.vue"
import RestaurantFullArticle from "./RestaurantFullArticle.vue"
import { userCoords, requestGeolocation } from "@/stores/mapStore"
import { useFilterStore } from "@/stores/filterStore"

const filterStore = useFilterStore()
const route = useRoute()
const restaurants = computed(() => filterStore.filteredRestaurants)

const API_KEY = "b4BxT11KjV5Zzm2lo2V1"
const STYLE = "dataviz-v4"
const mapTilerUrl = `https://api.maptiler.com/maps/${STYLE}/{z}/{x}/{y}.png?key=${API_KEY}`
const fallback_position = [47.38935859649009, 0.6860130852825314]

const markerIcon = divIcon({
    className: "user-location-dot",
    html: '<div class="user-dot"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
})

onMounted(() => {
    requestGeolocation()
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

const scrollToRestaurant = (index) => {
    const carousel = carouselRef.value
    if (!carousel) return
    const slide = carousel.children[index]
    if (!slide) return
    const left = slide.offsetLeft - (carousel.clientWidth - slide.offsetWidth) / 2

    carousel.scrollTo({
        left,
        behavior: "smooth",
    })
}

const centerMapToRestaurant = (index) => {
    const list = restaurants.value
    if (!list.length) return

    const map = mapRef.value?.leafletObject
    if (!map) return

    const restaurant = list[index]
    if (!restaurant) return

    map.flyTo([restaurant.latitude, restaurant.longitude], 14, {
        duration: 0.8,
    })
}

const focusRestaurant = (index) => {
    const list = restaurants.value
    if (!list.length) return

    if (index < 0 || index >= list.length) return

    selectedIndex.value = index
    scrollToRestaurant(index)
    centerMapToRestaurant(index)
}

const openRestaurantFromQuery = () => {
    const key = route.query.restaurant
    if (!key || !restaurants.value.length) {
        return
    }

    const target = String(key)
    const index = restaurants.value.findIndex(
        (restaurant) =>
            String(restaurant.id ?? "") === target ||
            String(restaurant.name ?? "").toLowerCase() === target.toLowerCase(),
    )

    if (index < 0) {
        return
    }

    focusRestaurant(index)
    isClicked.value = route.query.detail === "1"
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

watch(restaurants, (list) => {
    if (!list.length) {
        selectedIndex.value = 0
        isClicked.value = false
        return
    }

    if (selectedIndex.value >= list.length) {
        selectedIndex.value = list.length - 1
    }

    openRestaurantFromQuery()
})

watch(
    () => [route.query.restaurant, route.query.detail, route.query.pick],
    () => {
        openRestaurantFromQuery()
    },
    { immediate: true },
)
</script>

<style scoped>
.map-layout {
    height: 100%;
    width: 100%; /* here */
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
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    bottom: 5rem;
    width: 100%;
    z-index: 500;
    display: block;
    align-items: start;
    justify-content: center;
    gap: 0.65rem;
    transition: transform 0.4s ease-in-out;
}

.restaurant-carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    padding: 0.4rem 0;
    gap: 16px;
    z-index: 1000;
}

.restaurant-carousel::-webkit-scrollbar {
    display: none;
}

.restaurant-carousel__slide {
    flex: 0 0 92%;
    scroll-snap-align: center;
    display: grid;
    align-items: start;
    justify-content: center;
    cursor: pointer;

    width: 364px;
    height: 240px;
    border-radius: 12px;
    padding: 16px;
    gap: 10px;
    background-color: #ffffff;
}

.restaurant-carousel-wrapper--detail {
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
    .restaurant-carousel-wrapper {
        width: 100%;
    }
}
</style>
