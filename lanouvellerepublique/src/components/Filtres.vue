<script setup>
import { ref } from "vue"
import { COLORS } from "@/assets/colors.js"
import mapping_categories from "@/constants/categories"

defineProps({ show: Boolean })
const emit = defineEmits(["close", "apply"])

const pink = COLORS.pinkSwitch // #E815B2
const pinkLight = COLORS.pinkLight // #FDE8F7
const blue = COLORS.switchTextBlue // #007FD8
const green = "#16A34A"

/* ── état des filtres ── */
const coupDeCoeur = ref(false)

const title_mapping = {
    diet: "Préférences alimentaires",
    cuisine_type: "Type de cuisine",
    ambiance: "Ambiance",
    budget: "Budget",
    service: "Service",
}

const selectedCategories = ref(
    Object.keys(mapping_categories).reduce((acc, key) => {
        acc[key] = []
        return acc
    }, {}),
)

const availableCategories = Object.keys(mapping_categories).reduce((acc, key) => {
    acc[key] = Object.values(mapping_categories[key])
    return acc
}, {})

const clearAll = () => {
    coupDeCoeur.value = false
    for (let k in selectedCategories.value) selectedCategories.value[k] = []
}

const apply = () => {
    emit("apply", {
        coupDeCoeur: coupDeCoeur.value,
        diet: selectedCategories.value.diet,
        cuisine_type: selectedCategories.value.cuisine_type,
        ambiance: selectedCategories.value.ambiance,
        budget: selectedCategories.value.budget,
        service: selectedCategories.value.service,
    })
    emit("close")
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
                    <div
                        class="filtres-section"
                        v-for="category, key in availableCategories"
                        :key="category"
                    >
                        <h3 class="section-title">{{ title_mapping[key] }}</h3>
                        <div class="tags-row">
                            <label
                                v-for="opt in category"
                                :key="opt"
                                class="option-chip option-chip--green"
                                :class="{ 'is-selected': selectedCategories[key].includes(opt) }"
                            >
                                <input
                                    v-model="selectedCategories[key]"
                                    type="checkbox"
                                    :value="opt"
                                    class="option-chip__input"
                                />
                                <span class="tag">{{ opt }}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <!-- /filtres-body -->

                <!-- ── Pied : Voir les résultats ── -->
                <div class="filtres-footer">
                    <button class="btn-apply" @click="apply">Voir les résultats</button>
                </div>
            </div>
            <!-- /filtres-sheet -->
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
    border: 2px solid var(--Pink-500, #e815b2);
    background: var(--Pink-100, #fde8f7);
    color: #e815b2;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition:
        background 0.18s,
        color 0.18s;
}
.tag-coupdecoeur.active {
    background: #e815b2;
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
    transition:
        background 0.18s,
        color 0.18s,
        border-color 0.18s;
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
