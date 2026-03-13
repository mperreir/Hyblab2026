<template>
    <div class="list-item">
        <div
            class="list-item-image-div"
            :style="{ backgroundImage: `url('${image}')` }"
            :title="title"
        >

            <div class="badges-panel">
                <span v-for="badge in badges" :key="badge" class="badge">
                    {{ badge }}
                </span>
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

defineProps({
    title: {
        type: String,
        default: 'Item Title'
    },
    image: {
        type: String,
        default: ''
    },
    badges: {
        type: Array,
        default: () => []
    },
    date: {
        type: String,
        default: ''
    }
})
</script>

<style scoped>
.list-item {
    position: relative;

    display: flex;
    height: 400px;
    padding: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    align-self: stretch;

    border-radius: 12px;
    background-image: url('img/Vector.png');
    background-color: #FFF;
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
    background-color: #FFFCF8;
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
    background: #FFF;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
}

.date {
    width: 56.568px;
    height: 12.432px;

    color: #377DD1;
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
    background: #FFF;
}

.title {
    flex: 1 0 0;

    color: #E815B2;
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
