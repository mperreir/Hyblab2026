<template>
    <div class="global">
        <div
            class="list-item"
            tabindex="0"
            @click="emit('select')"
            @keydown.enter.prevent="emit('select')"
            @keydown.space.prevent="emit('select')"
        >
            <div
                class="list-item-image-div"
                :style="{ backgroundImage: `url('${image}')` }"
                :title="title"
            >
                <div class="badges-panel">
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
            <slot />
        </div>
        <div class="retourner-carte">
            <p>Retourner la carte</p>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1.5L10 3.5M10 3.5L8 5.5M10 3.5H2M4 10.5L2 8.5M2 8.5L4 6.5M2 8.5H10" stroke="#E815B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue"

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
    }
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

const displayImage = computed(() => {
    if (!props.image) return ""
    return encodeURI(String(props.image))
})

const rotateBadge = (index) => {
    const rotation = index % 2 === 0 ? "-10deg" : "10deg"
    return {
        transform: `rotate(${rotation})`,
        zIndex: 100 - index,
    }
}
</script>

<style scoped>
.global {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
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
}

.list-item-image-div {
    display: flex;
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

    box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.15);
}

.div-title {
    display: flex;
    transform: rotate(-3deg);
    padding: 4px 8px 0 8px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 10px;
    background: #FFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);
}

.title {
    padding-top: 8px;

    color: #E815B2;

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

.retourner-carte {
    display: flex;
    justify-content: center;
    border-radius: 30px;
    padding: 12px 40px;
    gap: 5px;
    background: #FDE8F7;

    margin-top: -20px;
    z-index: 1;
}

.retourner-carte p {
    color: #E815B2;

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
</style>
