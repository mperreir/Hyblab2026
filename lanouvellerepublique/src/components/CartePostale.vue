<template>
    <div class="global">
        <div
            class="list-item"
            :class="{ 'is-flipped': isFlipped }"
            tabindex="0"
            @click="emit('select')"
            @keydown.enter.prevent="emit('select')"
            @keydown.space.prevent="emit('select')"
        >
            <div class="card-3d">
                <div class="card-face card-face--front">
                    <div
                        class="list-item-image-div"
                        :style="{ backgroundImage: `url('${image}')` }"
                        :title="title"
                    >
                        <div v-if="!isFlipped" class="badges-panel">
                            <img
                                v-for="(badge, i) in displayBadges"
                                :key="badge.key"
                                class="badge"
                                :src="badge.src"
                                :alt="badge.key"
                                :style="rotateBadge(i)"
                            />
                        </div>
                        <div class="list-item-content">
                            <div class="div-title">
                                <h3 class="title">{{ title }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-face card-face--back">
                    <div class="carte-dos">
                        <div class="catch-phrase">
                            <svg
                                width="12"
                                height="10"
                                viewBox="0 0 12 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.67699 0.805716C5.03778 2.77905 4.69227 5.61905 4.64044 9.32571C4.45378 9.35238 4.16045 9.36571 3.76045 9.36571C3.06712 9.36571 2.38708 9.27238 1.72034 9.08571C1.0536 8.89905 0.480151 8.61905 0 8.24571C0.132793 6.91238 0.39886 5.43238 0.798201 3.80571C1.19754 2.17905 1.77036 0.912382 2.51666 0.00571416C3.02332 -0.0209522 3.57001 0.0457144 4.15674 0.205714C4.77014 0.365715 5.27689 0.565716 5.67699 0.805716ZM11.877 0.805716C11.2378 2.77905 10.8923 5.61905 10.8404 9.32571C10.6538 9.35238 10.3605 9.36571 9.96045 9.36571C9.26712 9.36571 8.58708 9.27238 7.92034 9.08571C7.2536 8.89905 6.68015 8.61905 6.2 8.24571C6.33279 6.91238 6.59886 5.43238 6.9982 3.80571C7.39754 2.17905 7.97036 0.912382 8.71666 0.00571416C9.22332 -0.0209522 9.77001 0.0457144 10.3567 0.205714C10.9701 0.365715 11.4769 0.565716 11.877 0.805716Z"
                                    fill="#E815B2"
                                />
                            </svg>
                            <p>{{ description.split('.')[0] }}.</p>
                            <p class="aurelien">Aurélien</p>
                        </div>
                        <div class="localisation">
                            <div v-if="displayBadges.length" class="localisation-badges">
                                <img
                                    v-for="(badge, i) in displayBadges"
                                    :key="`back-${badge.key}`"
                                    class="localisation-badge"
                                    :src="badge.src"
                                    :alt="badge.key"
                                    :style="rotateBadge(i)"
                                />
                            </div>
                            <p class="nom">{{ nom }}</p>
                            <p class="adresse">{{ adresse }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <slot />
        </div>
        <div class="retourner-carte" @click="toggleCard">
            <p>Retourner la carte</p>
            <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8 1.5L10 3.5M10 3.5L8 5.5M10 3.5H2M4 10.5L2 8.5M2 8.5L4 6.5M2 8.5H10"
                    stroke="#E815B2"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue"

const emit = defineEmits(["select"])

const props = defineProps({
    title: {
        type: String,
        default: "Item Title",
    },
    image: {
        type: String,
        default: "",
    },
    badges: {
        type: [Array, Object],
        default: () => [],
    },
    coupDeCoeur: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        default: "",
    },
    catch_phrase: {
        type: String,
        default: "",
    },
})

const vectorBgUrl = `url('${import.meta.env.BASE_URL}img/Vector.png')`

const badgeAssets = import.meta.glob("../assets/badges/*.svg", {
    eager: true,
    import: "default",
})

const badgeFileByKey = {
    asian: "asiat.svg",
    budget_1_10: "1_10.svg",
    budget_10_20: "10_20.svg",
    budget_20_30: "20_30.svg",
    budget_30_plus: "30.svg",
    family: "familial.svg",
    french: "tourangelle.svg",
    friends: "amical.svg",
    gluten_free: "sans_gluten.svg",
    halal: "hallal.svg",
    indian: "indian.svg",
    italian: "italien.svg",
    mediterranean: "mediterraneen.svg",
    middle_eastern: "oriental.svg",
    on_site: "bistrot.svg",
    professional: "pro.svg",
    romantic: "love.svg",
    street_food: "street_food.svg",
    traditional: "tradi.svg",
    vegan: "vegan.svg",
    vegetarien: "vege.svg",
    world_cuisine: "monde.svg",
    coeur_tmv: "coeur.svg",
}

const loadSVG = (badge) => {
    const fileName = badgeFileByKey[badge]
    if (!fileName) return null

    return badgeAssets[`../assets/badges/${fileName}`] ?? null
}

const displayBadges = computed(() => {
    const selectedKeys = []

    if (props.coupDeCoeur) selectedKeys.push("coeur_tmv")
    else selectedKeys.push(props.badges?.budget?.[0])

    const cuisineKey = props.badges?.cuisine_type?.[0]
    const ambianceKey = props.badges?.ambiance?.[0]

    if (cuisineKey) selectedKeys.push(cuisineKey)
    if (ambianceKey) selectedKeys.push(ambianceKey)

    return selectedKeys
        .map((badge) => ({ key: badge, src: loadSVG(badge) }))
        .filter((badge) => badge.src)
})

const rotateBadge = (index) => {
    const rotation = index % 2 === 0 ? "-10deg" : "10deg"
    return {
        transform: `rotate(${rotation})`,
        zIndex: 100 - index,
    }
}

const isFlipped = ref(false)

const toggleCard = () => {
    isFlipped.value = !isFlipped.value
}

const description = computed(() => props.catch_phrase)
const nom = computed(() => props.title)
const adresse = computed(() => props.address)
</script>

<style scoped>
.global {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 100%;
}
.list-item {
    position: relative;
    cursor: pointer;

    display: flex;
    height: 300px;
    padding: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    align-self: stretch;

    border-radius: 12px;
    background-image: v-bind(vectorBgUrl);
    background-color: #fff;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    perspective: 1200px;
}

.card-3d {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.list-item.is-flipped .card-3d {
    transform: rotateY(180deg);
}

.card-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}

.card-face--back {
    transform: rotateY(180deg);
}

.list-item-image-div {
    display: flex;
    height: 100%;
    padding: 8px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex: 1 0 0;
    align-self: stretch;

    border-radius: 13.179px;
    background-color: #fffcf8;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
}

.list-item-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    margin-bottom: 15px;
}

.div-title {
    display: flex;
    transform: rotate(-3deg);
    padding: 4px 8px 0 8px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.title {
    padding-top: 8px;

    color: #e815b2;

    font-family: Lalezar;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: 46px;
}

.badges-panel {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 0;
    padding-right: 2px;
}

.badge {
    width: clamp(50px, 70px, 70px);
    height: clamp(50px, 70px, 70px);
    display: block;
    position: relative;
    flex-shrink: 0;
}

.badge + .badge {
    margin-left: -18px;
}

.carte-dos {
    display: flex;
    justify-content: space-between;
    height: 100%;

    border-radius: 13.179px;
    background-color: #fffcf8;

    padding: 8px;
}

.catch-phrase {
    margin: 2.5rem 1rem;
    width: 60%;

    border-right: 0.5px solid #e815b2;

    flex: 1 0 0;
    color: #000;
    font-family: Abordage;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}
.catch-phrase p {
    padding: 0.4rem;
}
.localisation {
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 2.5rem 1rem 2.5rem 0rem;
    width: 40%;

    color: #000;
    font-family: Abordage;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.localisation-badges {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    margin-bottom: 1rem;
    padding-right: 0.15rem;
}

.localisation-badge {
    width: 50px;
    height: 50px;
    display: block;
    position: relative;
    flex-shrink: 0;
}

.localisation-badge + .localisation-badge {
    margin-left: -12px;
}

.localisation p {
    padding-top: 0.7rem;
    border-bottom: 0.5px solid #e815b2;
}

.retourner-carte {
    display: flex;
    justify-content: center;
    border-radius: 30px;
    padding: 12px 40px;
    gap: 5px;
    background: #fde8f7;

    margin-top: -20px;
    z-index: 1;
}

.retourner-carte p {
    color: #e815b2;

    font-family: "OpenSans";
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px;
}

.retourner-carte svg {
    width: 14px;
    height: 14px;
}

.aurelien {
    color: var(--TMV-Rose, #E815B2);
    font-family: Abordage;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 153.846% */
}

@media (prefers-reduced-motion: reduce) {
    .card-3d {
        transition: none;
    }
}
</style>
