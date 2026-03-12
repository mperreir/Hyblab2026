<script setup>
import { computed } from 'vue'
import ListItem from '@/components/List_item.vue'
import { COLORS } from '@/assets/Couleurs/Coulleurs.js'
import { useFilterStore } from '@/stores/filterStore'

const filterStore = useFilterStore()
const listBg = COLORS.cream

const toTimestamp = (dateStr) => {
  if (!dateStr) return 0

  const frMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dateStr)
  if (frMatch) {
    const [, day, month, year] = frMatch
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime()
  }

  const parsed = new Date(dateStr).getTime()
  return Number.isNaN(parsed) ? 0 : parsed
}

const sortedRestaurants = computed(() =>
  [...filterStore.filteredRestaurants].sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date)),
)
</script>

<template>
  <main class="list-view">
    <ListItem
      v-for="restaurant in sortedRestaurants"
      :key="restaurant.name"
      :title="restaurant.hook || restaurant.name"
      :image="restaurant.image || ''"
      :badges="restaurant.badges || []"
      :date="restaurant.date || ''"
    >
    </ListItem>
  </main>
</template>

<style scoped>
.list-view {
  min-height: 100vh;
  padding: 5rem 1.25rem 10rem;
  background: v-bind(listBg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.list-view > :deep(.list-item) {
  width: 100%;
  max-width: 600px;
}

@media (min-width: 768px) {
  .list-view {
    padding-bottom: 1.25rem;
  }
}
</style>
