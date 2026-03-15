<template>
    <div class="mini-box">
        <div
            class="mini-box-image-div"
            :style="{ backgroundImage: `url('${displayImage}')` }"
            :title="props.title"
        >
            <div class="badges-panel">
                <span v-for="badge in props.badges" :key="badge" class="badge">
                    {{ badge }}
                </span>
            </div>
            <div class="mini-box-content">
                <div class="div-title">
                    <h3 class="title">{{ props.title }}</h3>
                </div>
            </div>
        </div>
        <slot />
    </div>
</template>

<script setup>
import { computed } from "vue"

const vectorBgUrl = `url('${import.meta.env.BASE_URL}img/Vector.png')`

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
        type: Array,
        default: () => [],
    },
    date: {
        type: String,
        default: "",
    },
})

const displayImage = computed(() => {
    if (!props.image) return ""
    return encodeURI(String(props.image))
})
</script>

<style scoped>
.mini-box {
    position: relative;

    display: flex;
    height: 100%;
    width: 100%;
    padding: 6.25px;
    gap: 6.25;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    align-self: stretch;

    border-radius: 12px;
    background-image: v-bind(vectorBgUrl);
    background-color: #fff;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
}

.mini-box-image-div {
    display: flex;
    padding: 8px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex: 1 0 0;
    align-self: stretch;
    width: 100%;
    height: 100%;

    border-radius: 13.179px;
    background-color: #fffcf8;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
}

.mini-box-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;

    box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.15);
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
    width: 100%;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 0;
}

.badge {
    width: clamp(36px, 10vw, 50px);
    height: clamp(36px, 10vw, 50px);
    transform: rotate(10deg);
    flex-shrink: 0;
}
</style>
