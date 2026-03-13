<template>
  <article
    class="mini-box"
    :class="{ 'mini-box--active': props.isActive }"
    role="button"
    tabindex="0"
    @click="emit('focus-box')"
    @keydown.enter.prevent="emit('focus-box')"
    @keydown.space.prevent="emit('focus-box')"
  >
    <img :src="props.image" :alt="props.name" class="mini-box__image" />

    <div class="mini-box__content">
      <h3 class="mini-box__title">{{ props.name }}</h3>
      <p class="mini-box__coords">
        {{ formatCoord(props.latitude) }}, {{ formatCoord(props.longitude) }}
      </p>
    </div>
  </article>
</template>

<script setup>
const emit = defineEmits(['focus-box'])

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
})

const formatCoord = (value) => value.toFixed(4)
</script>

<style scoped>
.mini-box {
  top:8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.mini-box:hover {
  border-color: #fdba74;
  transform: translateY(-1px);
}

.mini-box--active {
  border-color: #f97316;
  box-shadow:
    0 0 0 2px rgba(249, 115, 22, 0.22),
    0 10px 22px rgba(15, 23, 42, 0.14);
}

.mini-box__image {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  object-fit: cover;
  flex-shrink: 0;
}

.mini-box__content {
  min-width: 0;
}

.mini-box__title {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mini-box__coords {
  margin: 0.2rem 0 0;
  font-size: 0.78rem;
  color: #475569;
}
</style>
