<template>
  <div class="overlay">
    <button class="overlay-close" @click="$emit('close')">✕</button>

    <RestaurantFullArticle :restaurant="restaurant" />
  </div>
</template>

<script setup>
import RestaurantFullArticle from "./RestaurantFullArticle.vue"

defineProps({
  restaurant: Object
})
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;

  background: white;
  z-index: 2000;

  overflow-y: auto;
}

.overlay-close {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>