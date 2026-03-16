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
    background: #fffcf8;
}

.overlay-close {
  position: relative;
    top: 16px;
    right: 16px;
    transform: translateX(15px) translateY(50px);
    z-index: 10000;
}
</style>
