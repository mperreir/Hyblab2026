<template>
    <div
        class="list-item"
        role="button"
        tabindex="0"
        @click="emit('select')"
        @keydown.enter.prevent="emit('select')"
        @keydown.space.prevent="emit('select')"
    >
        <div
            class="list-item-image-div"
            :style="{ backgroundImage: `url('${displayImage}')` }"
            :title="title"
        >
            <div class="badges-panel">
                <img
                    v-for="badge in displayBadges"
                    :key="badge.key"
                    class="badge"
                    :src="badge.src"
                    :alt="badge.key"
                />
            </div>
            <div class="list-item-content">
                <div class="div-date">
                    <p class="date">{{ date }}</p>
                </div>
                <div class="div-title">
                    <h3 class="title">{{ title }}</h3>
                </div>
            </div>
        </div>
        <slot />
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
    },
    date: {
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

    if (props.coupDeCoeur) {
        selectedKeys.push("coeur_tmv")
    }

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
</script>

<style scoped>
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

    box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.15);
}

.div-date {
    display: flex;
    padding: 1.865px 6.216px;
    align-items: center;
    gap: 6.216px;

    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
}

.date {
    width: 56.568px;
    height: 12.432px;

    color: #377dd1;
    font-family: Abordage;
    font-size: 9.946px;
    font-style: normal;
    font-weight: 400;
    line-height: 13.676px; /* 137.5% */
}

.div-title {
    display: flex;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 7px;
    align-self: stretch;

    border-radius: 10px;
    background: #fff;
}

.title {
    flex: 1 0 0;

    color: #e815b2;
    padding-top: 5px;
    font-family: Lalezar;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: 27px;
}

.badges-panel {
    display: flex;
    width: 354px;
    justify-content: flex-end;
    align-items: flex-start;
    gap: -24px;
}

.badge {
    width: 70.227px;
    height: 70px;
    transform: rotate(10deg);
    flex-shrink: 0;
}
</style>
