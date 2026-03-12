<script setup>
import { ref } from 'vue'
import { COLORS } from '@/assets/Couleurs/Coulleurs.js'

defineProps({ show: Boolean })
const emit = defineEmits(['close', 'apply'])

const pink       = COLORS.pinkSwitch   // #E815B2
const pinkLight  = COLORS.pinkLight    // #FDE8F7
const blue       = COLORS.switchTextBlue // #007FD8
const green      = '#16A34A'

/* ── état des filtres ── */
const coupDeCoeur = ref(false)

const dietaryOptions = ['Vegan', 'Végétarien', 'Sans gluten', 'Halal']
const selectedDietary = ref([])

const cuisineOptions = ['Tourangelle', 'Asiatique', 'Italienne', 'Américaine', 'Orientale', 'Méditerranéenne', 'Indienne', 'Cuisine du monde', 'Traditionnelle', 'Street Food']
const selectedCuisine = ref([])

const ambianceOptions = ['Entre amis', 'Famille', 'Romantique', 'Professionnel']
const selectedAmbiance = ref([])

const budgetOptions = ['1-10€', '10-20€', '20-30€', '+30€']
const selectedBudget = ref([])

const serviceOptions = ['Sur place', 'À emporter', 'Livraison']
const selectedService = ref([])

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
      <div v-if="show" class="filtres-overlay" @click.self="emit('close')">
        <!-- backdrop -->
        <div class="filtres-backdrop" />

        <!-- feuille -->
        <div class="filtres-sheet" @click.stop>

          <!-- ── En-tête ── -->
          <div class="filtres-header">
            <span class="filtres-title">Filtres</span>
            <button class="btn-clear" @click="clearAll">Effacer tout</button>
          </div>

          <div class="filtres-body">

            <!-- ── Coup de cœur ── -->
            <div class="filtres-section">
              <button
                type="button"
                class="tag-coupdecoeur"
                :class="{ active: coupDeCoeur }"
                @click.stop.prevent="coupDeCoeur = !coupDeCoeur"
              >
                ❤️ Coup de cœur TMV
              </button>
            </div>

            <!-- ── Préférences alimentaires ── -->
            <div class="filtres-section">
              <h3 class="section-title">Préférences alimentaires</h3>
              <div class="tags-row">
                <label
                  v-for="opt in dietaryOptions"
                  :key="opt"
                  class="option-chip option-chip--green"
                  :class="{ 'is-selected': selectedDietary.includes(opt) }"
                >
                  <input v-model="selectedDietary" type="checkbox" :value="opt" class="option-chip__input">
                  <span class="tag">{{ opt }}</span>
                </label>
              </div>
            </div>

            <!-- ── Type de cuisine ── -->
            <div class="filtres-section">
              <h3 class="section-title">Type de cuisine</h3>
              <div class="tags-row">
                <label
                  v-for="opt in cuisineOptions"
                  :key="opt"
                  class="option-chip option-chip--blue"
                  :class="{ 'is-selected': selectedCuisine.includes(opt) }"
                >
                  <input v-model="selectedCuisine" type="checkbox" :value="opt" class="option-chip__input">
                  <span class="tag">{{ opt }}</span>
                </label>
              </div>
            </div>

            <!-- ── Ambiance ── -->
            <div class="filtres-section">
              <h3 class="section-title">Ambiance</h3>
              <div class="tags-row">
                <label
                  v-for="opt in ambianceOptions"
                  :key="opt"
                  class="option-chip option-chip--pink"
                  :class="{ 'is-selected': selectedAmbiance.includes(opt) }"
                >
                  <input v-model="selectedAmbiance" type="checkbox" :value="opt" class="option-chip__input">
                  <span class="tag">{{ opt }}</span>
                </label>
              </div>
            </div>

            <!-- ── Budget ── -->
            <div class="filtres-section">
              <h3 class="section-title">Budget</h3>
              <div class="tags-row">
                <label
                  v-for="opt in budgetOptions"
                  :key="opt"
                  class="option-chip option-chip--pink"
                  :class="{ 'is-selected': selectedBudget.includes(opt) }"
                >
                  <input v-model="selectedBudget" type="checkbox" :value="opt" class="option-chip__input">
                  <span class="tag">{{ opt }}</span>
                </label>
              </div>
            </div>

            <!-- ── Service ── -->
            <div class="filtres-section">
              <h3 class="section-title">Service</h3>
              <div class="tags-row">
                <label
                  v-for="opt in serviceOptions"
                  :key="opt"
                  class="option-chip option-chip--pink"
                  :class="{ 'is-selected': selectedService.includes(opt) }"
                >
                  <input v-model="selectedService" type="checkbox" :value="opt" class="option-chip__input">
                  <span class="tag">{{ opt }}</span>
                </label>
              </div>
            </div>

          </div><!-- /filtres-body -->

          <!-- ── Pied : Voir les résultats ── -->
          <div class="filtres-footer">
            <button class="btn-apply" @click="apply">Voir les résultats</button>
          </div>

        </div><!-- /filtres-sheet -->
      </div>
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
  pointer-events: auto;
}

.filtres-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1;
  pointer-events: none;
}

/* ── Feuille ── */
.filtres-sheet {
  position: relative;
  z-index: 2;
  background: #fff;
  border-radius: 1.25rem 1.25rem 0 0;
  max-height: 88dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  pointer-events: auto;
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

.option-chip {
  position: relative;
  display: inline-flex;
}

.option-chip__input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  border: 1.5px solid #d1d5db;
  background: #fff;
  color: #374151;
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition: background 0.18s, color 0.18s, border-color 0.18s;
}

.option-chip.is-selected .tag {
  color: #fff;
}

.option-chip--green.is-selected .tag {
  background: v-bind(green);
  border-color: v-bind(green);
}

.option-chip--blue.is-selected .tag {
  background: v-bind(blue);
  border-color: v-bind(blue);
}

.option-chip--pink.is-selected .tag {
  background: v-bind(pink);
  border-color: v-bind(pink);
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
</style>
