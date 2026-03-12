<script setup>
import { ref } from 'vue'
import { COLORS } from '@/assets/Couleurs/Coulleurs.js'
import { useFilterStore } from '@/stores/filterStore'

defineProps({ show: Boolean })
const emit = defineEmits(['close', 'apply'])

const filterStore = useFilterStore()

const pink       = COLORS.pinkSwitch   // #E815B2
const pinkLight  = COLORS.pinkLight    // #FDE8F7
const blue       = COLORS.switchTextBlue // #007FD8
const green      = '#16A34A'

/* ── état des filtres ── */
const coupDeCoeur = ref(false)
const selectedDietary = ref([])
const selectedCuisine = ref([])
const selectedAmbiance = ref([])
const selectedBudget = ref([])
const selectedService = ref([])

const toggle = (arr, val) => {
  const idx = arr.value.indexOf(val)
  idx === -1 ? arr.value.push(val) : arr.value.splice(idx, 1)
}

const clearAll = () => {
  coupDeCoeur.value = false
  selectedDietary.value = []
  selectedCuisine.value = []
  selectedAmbiance.value = []
  selectedBudget.value = []
  selectedService.value = []
}

const apply = () => {
  emit('apply', {
    coupDeCoeur: coupDeCoeur.value,
    dietary: selectedDietary.value,
    cuisine: selectedCuisine.value,
    ambiance: selectedAmbiance.value,
    budget: selectedBudget.value,
    service: selectedService.value,
  })
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="filtres-slide">
      <div v-if="show" class="filtres-overlay">
        <!-- backdrop -->
        <div class="filtres-backdrop" @click="emit('close')" />

        <!-- feuille -->
        <div class="filtres-sheet">

          <!-- ── En-tête ── -->
          <div class="filtres-header">
            <span class="filtres-title">Filtres</span>
            <button class="btn-clear" @click="clearAll">Effacer tout</button>
          </div>

          <div class="filtres-body">

            <!-- ── Coup de cœur ── -->
            <div class="filtres-section">
              <button
                class="tag-coupdecoeur"
                :class="{ active: coupDeCoeur }"
                @click="coupDeCoeur = !coupDeCoeur"
              >
                ❤️ Coup de cœur TMV
              </button>
            </div>

            <!-- ── Préférences alimentaires ── -->
            <div class="filtres-section">
              <h3 class="section-title">Préférences alimentaires</h3>
              <div class="tags-row">
                <button
                  v-for="opt in filterStore.availableCategories.dietary"
                  :key="opt"
                  class="tag"
                  :class="{ 'tag--green': selectedDietary.includes(opt) }"
                  @click="toggle(selectedDietary, opt)"
                >{{ opt }}</button>
              </div>
            </div>

            <!-- ── Type de cuisine ── -->
            <div class="filtres-section">
              <h3 class="section-title">Type de cuisine</h3>
              <div class="tags-row">
                <button
                  v-for="opt in filterStore.availableCategories.cuisine"
                  :key="opt"
                  class="tag"
                  :class="{ 'tag--blue': selectedCuisine.includes(opt) }"
                  @click="toggle(selectedCuisine, opt)"
                >{{ opt }}</button>
              </div>
            </div>

            <!-- ── Ambiance ── -->
            <div class="filtres-section">
              <h3 class="section-title">Ambiance</h3>
              <div class="tags-row">
                <button
                  v-for="opt in filterStore.availableCategories.ambiance"
                  :key="opt"
                  class="tag"
                  :class="{ 'tag--pink': selectedAmbiance.includes(opt) }"
                  @click="toggle(selectedAmbiance, opt)"
                >{{ opt }}</button>
              </div>
            </div>

            <!-- ── Budget ── -->
            <div class="filtres-section">
              <h3 class="section-title">Budget</h3>
              <div class="tags-row">
                <button
                  v-for="opt in filterStore.availableCategories.budget"
                  :key="opt"
                  class="tag"
                  :class="{ 'tag--pink': selectedBudget.includes(opt) }"
                  @click="toggle(selectedBudget, opt)"
                >{{ opt }}</button>
              </div>
            </div>

            <!-- ── Service ── -->
            <div class="filtres-section">
              <h3 class="section-title">Service</h3>
              <div class="tags-row">
                <button
                  v-for="opt in filterStore.availableCategories.service"
                  :key="opt"
                  class="tag"
                  :class="{ 'tag--pink': selectedService.includes(opt) }"
                  @click="toggle(selectedService, opt)"
                >{{ opt }}</button>
              </div>
            </div>

          </div><!-- /filtres-body -->

          <!-- ── Pied : Voir les résultats ── -->
          <div class="filtres-footer">
            <button class="btn-apply" @click="apply">Voir les résultats</button>
          </div>

        </div><!-- /filtres-sheet -->
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── Overlay ── */
.filtres-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.filtres-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 0;
  pointer-events: auto;
}

/* ── Feuille ── */
.filtres-sheet {
  position: relative;
  z-index: 100;
  background: #fff;
  border-radius: 1.25rem 1.25rem 0 0;
  max-height: 88dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── En-tête ── */
.filtres-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.4rem 0.75rem;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.filtres-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #111;
}

.btn-clear {
  background: #fff;
  color: v-bind(pink);
  border: 1.5px solid v-bind(pink);
  border-radius: 999px;
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}
.btn-clear:hover {
  background: rgba(232, 21, 178, 0.06);
}

/* ── Corps scrollable ── */
.filtres-body {
  overflow-y: auto;
  flex: 1;
  padding: 1rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

/* ── Section ── */
.filtres-section {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #111;
  margin: 0;
}

/* ── Coup de cœur ── */
.tag-coupdecoeur {
  align-self: flex-start;
  padding: 0.55rem 1.2rem;
  border-radius: 50px;
  border: 2px solid var(--Pink-500, #E815B2);
  background: var(--Pink-100, #FDE8F7);
  color: #E815B2;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}
.tag-coupdecoeur.active {
  background: #E815B2;
  color: #fff;
}

/* ── Tags génériques ── */
.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.45rem 1rem;
  border-radius: 999px;
  border: 1.5px solid #d1d5db;
  background: #fff;
  color: #374151;
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, border-color 0.18s;
}

/* activegreen – préférences alimentaires */
.tag--green {
  background: v-bind(green);
  border-color: v-bind(green);
  color: #fff;
}

/* active blue – type de cuisine */
.tag--blue {
  background: v-bind(blue);
  border-color: v-bind(blue);
  color: #fff;
}

/* active pink – ambiance / budget / service */
.tag--pink {
  background: v-bind(pink);
  border-color: v-bind(pink);
  color: #fff;
}

/* ── Pied ── */
.filtres-footer {
  flex-shrink: 0;
  padding: 0.85rem 1.4rem calc(0.85rem + env(safe-area-inset-bottom));
  border-top: 1px solid #f0f0f0;
}

.btn-apply {
  width: 100%;
  padding: 0.85rem;
  border: none;
  border-radius: 999px;
  background: v-bind(pink);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}
.btn-apply:hover {
  opacity: 0.88;
}

/* ── Transition slide-up ── */
.filtres-slide-enter-active,
.filtres-slide-leave-active {
  transition: opacity 0.25s ease;
}
.filtres-slide-enter-active .filtres-sheet,
.filtres-slide-leave-active .filtres-sheet {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
.filtres-slide-enter-from,
.filtres-slide-leave-to {
  opacity: 0;
  pointer-events: none;
}
.filtres-slide-enter-from .filtres-sheet,
.filtres-slide-leave-to .filtres-sheet {
  transform: translateY(100%);
}
</style>
