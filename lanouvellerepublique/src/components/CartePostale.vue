<template>
    <div class="global">
        <div class="carte-postale">
            <div
                class="carte-postale-image-div"
                :style="{ backgroundImage: `url('${image}')` }"
                :title="title"
            >

                <div class="badges-panel">
                    <span v-for="badge in badges" :key="badge" class="badge">
                        {{ badge }}
                    </span>
                </div>
                <div class="carte-postale-content">
                    <div class="div-title">
                        <h3 class="title">{{ title }}</h3>
                    </div>
                </div>
            </div>
            <slot />
        </div>
        <div class="retourner-carte">
            <p>Retourner la carte</p>
        </div>
    </div>
</template>

<script setup>

const vectorBgUrl = `url('${import.meta.env.BASE_URL}img/Vector.png')`

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
.global {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 430px;
    height: 286px;
    padding-right: 16px;
    padding-left: 16px;
}
.carte-postale {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    /* height: 400px;
    padding: 8px;
    gap: 8px; */


    width: 399px;
    height: 257.71px;
    padding: 6px;
    gap: 11.81px;

    align-self: stretch;

    border-radius: 12px;
    background-image: v-bind(vectorBgUrl);
    background-color: #FFF;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
}

.carte-postale-image-div {
    display: flex;
    padding: 16px;
    /* padding: 8px; */
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex: 1 0 0;
    align-self: stretch;
    width: 386px;
    height: 245.71px;

    border-radius: 13.179px;
    background-color: #fffcf8;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
}

.carte-postale-content {
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

.retourner-carte {
    display: flex;
    justify-content: center;
    width: 226px;
    height: 40px;
    border-radius: 30px;
    padding-top: 11px;
    padding-right: 40px;
    padding-bottom: 11px;
    padding-left: 40px;
    gap: 5px;
    background: #FDE8F7;
}

.retourner-carte p {
    color: #E815B2;
    font-family: Lalezar;
    font-size: 14px;
    font-style: Bold;
    font-weight: 700;
    line-height: 18px;
}
</style>
