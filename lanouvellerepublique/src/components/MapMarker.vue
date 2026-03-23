<template>
    <l-marker :lat-lng="props.coords" :icon="markerIcon" @click="emitFocus"> </l-marker>
</template>

<script setup>
import { computed } from "vue"
import { divIcon } from "leaflet"
import { LMarker, LPopup } from "@vue-leaflet/vue-leaflet"
import colors from "@/assets/colors"

const props = defineProps({
    coords: {
        type: Array,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    restaurantIndex: {
        type: Number,
        required: true,
    },
})

const emit = defineEmits(["focus-marker"])

const imageUrl = computed(
    () => props.image || "https://picsum.photos/seed/restaurant-default/96/96",
)

const pinBorderColor = computed(() => (props.isActive ? colors.pinkSwitch : "#ffffff"))
const pinShadow = computed(() =>
    props.isActive
        ? "0 0 0 3px rgba(249, 115, 22, 0.3), 0 7px 16px rgba(0, 0, 0, 0.35)"
        : "0 4px 10px rgba(0, 0, 0, 0.25)",
)
const pinScale = computed(() => (props.isActive ? 1.08 : 1))

const markerIcon = computed(() =>
    divIcon({
        className: "restaurant-pin-wrapper",
        html: `
      <div style="position: relative; width: 32px; height: 42px; transform: scale(${pinScale.value}); transform-origin: center bottom;">
        <div style="position: absolute; top: 0; left: 0; width: 32px; height: 32px; border-radius: 999px; overflow: hidden; border: 2px solid ${pinBorderColor.value}; box-shadow: ${pinShadow.value}; background: #f3f4f6; z-index: 2;">
          <img src="${imageUrl.value}" alt="${props.name}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
        </div>
        <div style="position: absolute; left: 50%; top: 24px; width: 11px; height: 11px; background: ${pinBorderColor.value}; transform: translateX(-50%) rotate(45deg); border-radius: 2px; box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2); z-index: 1;"></div>
        <div style="position: absolute; left: 50%; top: 29px; width: 4px; height: 8px; background: rgba(0, 0, 0, 0.12); transform: translateX(-50%); border-radius: 999px; filter: blur(0.4px);"></div>
      </div>
    `,
        iconSize: [32, 42],
        iconAnchor: [16, 41],
        popupAnchor: [0, -36],
    }),
)

const emitFocus = () => {
    emit("focus-marker", props.restaurantIndex)
}
</script>

<style scoped>
:deep(.restaurant-pin-wrapper) {
    background: transparent;
    border: 0;
}
</style>
