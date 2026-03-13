<template>
  <article
    class="detail-box"
    :class="{ 'detail-box--active': props.isActive }"
    role="textbox"
    tabindex="0"
  >
    <header class="detail-box__header">
      <h3 class="detail-box__name">{{ props.restaurant?.name || 'Restaurant' }}</h3>
    </header>

    <section class="detail-section detail-section--lieu">
      <h4 class="detail-section__title">Lieu</h4>
      <p class="detail-section__text">{{ lieuText }}</p>
    </section>

    <section v-if="resolvedDetailPhoto" class="detail-photo-block" aria-label="Photo du restaurant">
      <img :src="resolvedDetailPhoto" :alt="photoAlt" class="detail-photo" @error="onDetailPhotoError" />
      <p v-if="detailPhotoCaption" class="detail-photo__caption">{{ detailPhotoCaption }}</p>
    </section>

    <section class="detail-section detail-section--degustation">
      <h4 class="detail-section__title">Dégustation</h4>
      <p class="detail-section__text">{{ degustationText }}</p>
    </section>

    <section class="detail-section detail-section--addition">
      <h4 class="detail-section__title">Addition</h4>
      <p class="detail-section__text">{{ additionText }}</p>
    </section>

    <section class="detail-section detail-section--coords">
      <h4 class="detail-section__title">Coordonnées</h4>
      <ul class="detail-coords">
        <li v-if="props.restaurant?.address"><strong>Adresse:</strong> {{ props.restaurant.address }}</li>
        <li v-if="props.restaurant?.opening_hours"><strong>Horaires:</strong> {{ props.restaurant.opening_hours }}</li>
        <li v-if="props.restaurant?.contact_tel"><strong>Téléphone:</strong> {{ props.restaurant.contact_tel }}</li>
        <li v-if="props.restaurant?.contact_web"><strong>Site:</strong> {{ props.restaurant.contact_web }}</li>
        <li><strong>Latitude:</strong> {{ formatCoord(props.restaurant?.latitude) }}</li>
        <li><strong>Longitude:</strong> {{ formatCoord(props.restaurant?.longitude) }}</li>
      </ul>
    </section>
  </article>
</template>

<script setup>
import { computed, ref, watch } from "vue"

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  restaurant: {
    type: Object,
    default: () => ({}),
  },
})

const findSectionText = (title) => {
  const sections = props.restaurant?.article?.sections || []
  const section = sections.find((item) =>
    String(item?.title || "").toLowerCase().includes(title.toLowerCase()),
  )
  return section?.content || "Information indisponible."
}

const lieuText = computed(() => findSectionText("lieu"))
const degustationText = computed(() => findSectionText("dégustation"))
const additionText = computed(() =>
  props.restaurant?.carte || "Information sur les prix indisponible.",
)

const normalizePath = (value) => String(value || "").trim().replace(/https?:\/\/[^/]+/i, "")

const detailPhotoData = computed(() => {
  const articleImages = (props.restaurant?.article?.images || []).map((img) => ({
    src: img?.content,
    description: img?.description,
  }))

  const sectionImages = (props.restaurant?.article?.sections || []).flatMap((section) =>
    (section?.images || []).map((img) => ({
      src: img?.content,
      description: img?.description,
    })),
  )

  const all = [...sectionImages, ...articleImages].filter((img) => img?.src)
  if (!all.length) {
    return null
  }

  const topImage = normalizePath(props.restaurant?.image)
  const differentFromTop = all.find((img) => normalizePath(img.src) !== topImage)

  // If there is no distinct image from the top card, we hide this block entirely.
  return differentFromTop || null
})

const detailPhoto = computed(() => detailPhotoData.value?.src || "")
const detailPhotoCaption = computed(() => detailPhotoData.value?.description || "")
const photoAlt = computed(
  () => detailPhotoCaption.value || `Photo de ${props.restaurant?.name || "ce restaurant"}`,
)

const buildPhotoCandidates = (src) => {
  if (!src) return []

  const raw = String(src).trim()
  const candidates = [raw]

  if (raw.startsWith("/lanouvellerepublique/")) {
    candidates.push(raw.replace(/^\/lanouvellerepublique/, ""))
  } else if (raw.startsWith("/img/")) {
    candidates.push(`/lanouvellerepublique${raw}`)
  }

  return [...new Set(candidates.map((item) => encodeURI(item)))]
}

const detailPhotoCandidates = computed(() => buildPhotoCandidates(detailPhoto.value))
const detailPhotoCandidateIndex = ref(0)

watch(
  () => detailPhotoCandidates.value,
  () => {
    detailPhotoCandidateIndex.value = 0
  },
)

const resolvedDetailPhoto = computed(() =>
  detailPhotoCandidates.value[detailPhotoCandidateIndex.value] || "",
)

const onDetailPhotoError = () => {
  if (detailPhotoCandidateIndex.value < detailPhotoCandidates.value.length - 1) {
    detailPhotoCandidateIndex.value += 1
    return
  }

  // No valid URL left: hide the photo block completely.
  detailPhotoCandidateIndex.value = detailPhotoCandidates.value.length
}

const formatCoord = (value) => {
  const num = Number(value)
  return Number.isFinite(num) ? num.toFixed(6) : "Non renseignée"
}
</script>

<style scoped>
.detail-box {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;
  margin-top: 0.65rem;
  padding: 1rem;
  border-radius: 16px;
  border: 1px solid #f4cce7;
  background: #fff9f2;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
}

.detail-box__name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: #312e81;
}

.detail-section {
  --section-color: #be185d;
  position: relative;
  padding: 0.85rem 0.95rem;
  border-radius: 14px;
  background: #ffffff;
  border: 2px dashed var(--section-color);
}

.detail-section__title {
  margin: 0 0 0.35rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--section-color);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.detail-section__text {
  margin: 0;
  white-space: pre-line;
  font-size: 0.92rem;
  line-height: 1.45;
  color: #1f2937;
  text-align: justify;
}

.detail-photo-block {
  margin: 0;
  padding: 0.55rem;
  border-radius: 14px;
  background: #ffffff;
  border: 2px dashed #377dd1;
}

.detail-photo {
  width: 100%;
  display: block;
  border-radius: 10px;
  object-fit: cover;
}

.detail-photo__caption {
  margin: 0.45rem 0 0;
  font-size: 0.78rem;
  color: #475569;
  line-height: 1.35;
}

.detail-coords {
  margin: 0;
  padding-left: 1rem;
  display: grid;
  gap: 0.2rem;
  font-size: 0.88rem;
  color: #1f2937;
}

.detail-section--lieu {
  --section-color: #ffbb53;
}

.detail-section--degustation {
  --section-color: #377dd1;
}

.detail-section--addition {
  --section-color: #ff8159;
}

.detail-section--coords {
  --section-color: #191816;
}
</style>
