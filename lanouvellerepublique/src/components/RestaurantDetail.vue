<template>
    <article
        class="detail-box"
        :class="{ 'detail-box--active': props.isActive }"
        tabindex="0"
    >
        <section class="detail-section--date">
            <p class="detail-section__date">{{ props.restaurant.article.created_at }}</p>
        </section>

        <header class="detail-box__header">
            <h3 class="detail-box__name">{{ props.restaurant?.hook || "Restaurant" }}</h3>
        </header>

        <section class="detail-section--chapeau">
            <p class="detail-section__chapeau">{{ props.restaurant.article.catch_phrase }}</p>
        </section>

        <section class="detail-section--lieu">
            <div class="detail-section--lieu__title-div">
                <p class="detail-section--lieu__title">Le lieu</p>
            </div>
            <p class="detail-section--lieu__text">{{ lieuText }}</p>
        </section>

        <section
            v-if="resolvedDetailPhoto"
            class="detail-photo-block"
            aria-label="Photo du restaurant"
        >
            <img
                :src="resolvedDetailPhoto"
                :alt="photoAlt"
                class="detail-photo"
                @error="onDetailPhotoError"
            />
            <p v-if="detailPhotoCaption" class="detail-photo__caption">{{ detailPhotoCaption }}</p>
        </section>

        <section class="detail-section--degustation">
            <div class="detail-section--degustation__title-div">
                <p class="detail-section--degustation__title">La dégustation</p>
            </div>
            <p class="detail-section--degustation__text">{{ degustationText }}</p>
        </section>

        <section class="detail-section--addition">
            <div class="detail-section--addition__title-div">
                <p class="detail-section--addition__title">L'addition</p>
            </div>
            <p class="detail-section--addition__text">{{ additionText }}</p>
        </section>

        <section class="detail-section--coords">
            <div class="detail-section--coords__title-div">
                <p class="detail-section--coords__title">Coordonnées</p>
            </div>
            <ul class="detail-coords__list">
                <li v-if="props.restaurant?.address">
                    <div class="detail-coords__list-div">
                        <div class="detail-coords__list-div-icon">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.25 4.3229C11.0173 4.3229 10.7877 4.26874 10.5795 4.1647L7.4205 2.5852C7.2123 2.48116 6.98275 2.427 6.75 2.427M11.25 4.3229C11.4827 4.3229 11.7123 4.26874 11.9205 4.1647L14.6648 2.7922C14.7792 2.73502 14.9063 2.70806 15.0341 2.71388C15.1619 2.7197 15.2861 2.7581 15.3948 2.82545C15.5036 2.89279 15.5933 2.98684 15.6555 3.09864C15.7177 3.21044 15.7502 3.33628 15.75 3.4642V13.0372C15.7499 13.1764 15.7111 13.3129 15.6378 13.4313C15.5646 13.5498 15.4598 13.6455 15.3353 13.7077L11.9205 15.4155C11.7123 15.5195 11.4827 15.5736 11.25 15.5736C11.0173 15.5736 10.7877 15.5195 10.5795 15.4155L7.4205 13.836C7.2123 13.7319 6.98275 13.6778 6.75 13.6778C6.51726 13.6778 6.2877 13.7319 6.0795 13.836L3.33525 15.2085C3.22077 15.2657 3.09354 15.2926 2.96569 15.2868C2.83784 15.2809 2.71362 15.2424 2.60484 15.175C2.49606 15.1076 2.40635 15.0134 2.34424 14.9015C2.28213 14.7896 2.24969 14.6637 2.25 14.5357V4.96345C2.25008 4.8242 2.28891 4.68773 2.36217 4.56931C2.43542 4.45088 2.54019 4.35519 2.66475 4.29295L6.0795 2.5852C6.2877 2.48116 6.51726 2.427 6.75 2.427M11.25 4.3229L11.25 15.5729M6.75 2.427L6.75 13.677" stroke="#E815B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        {{props.restaurant.name}}, {{ props.restaurant.address }}
                    </div>
                </li>
                <li v-if="props.restaurant?.opening_hours">
                    {{ props.restaurant.opening_hours }}
                </li>
                <li v-if="props.restaurant?.contact_tel">
                    <div class="detail-coords__list-div">
                        <div class="detail-coords__list-div-icon">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.5001 12.6901V14.9401C16.5009 15.1489 16.4581 15.3557 16.3745 15.5471C16.2908 15.7385 16.168 15.9103 16.0141 16.0515C15.8602 16.1927 15.6785 16.3002 15.4806 16.3671C15.2828 16.434 15.0731 16.4589 14.8651 16.4401C12.5572 16.1893 10.3403 15.4007 8.39257 14.1376C6.58044 12.9861 5.04407 11.4497 3.89257 9.63757C2.62506 7.68098 1.83625 5.45332 1.59007 3.13507C1.57133 2.92767 1.59598 2.71864 1.66245 2.52129C1.72892 2.32394 1.83575 2.14259 1.97615 1.98879C2.11654 1.83499 2.28743 1.7121 2.47792 1.62796C2.6684 1.54382 2.87433 1.50027 3.08257 1.50007H5.33257C5.69655 1.49649 6.04942 1.62538 6.32539 1.86272C6.60137 2.10006 6.78163 2.42966 6.83257 2.79007C6.92754 3.51012 7.10366 4.21712 7.35757 4.89757C7.45848 5.16602 7.48032 5.45776 7.4205 5.73823C7.36069 6.01871 7.22172 6.27616 7.02007 6.48007L6.06757 7.43257C7.13524 9.31023 8.68991 10.8649 10.5676 11.9326L11.5201 10.9801C11.724 10.7784 11.9814 10.6395 12.2619 10.5796C12.5424 10.5198 12.8341 10.5417 13.1026 10.6426C13.783 10.8965 14.49 11.0726 15.2101 11.1676C15.5744 11.219 15.9071 11.4025 16.145 11.6832C16.3828 11.9639 16.5092 12.3223 16.5001 12.6901Z" stroke="#E815B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        {{props.restaurant.contact_tel}}
                    </div>
                </li>
                <li v-if="props.restaurant?.instagram">
                    <div class="detail-coords__list-div">
                        <div class="detail-coords__list-div-icon">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.125 4.875H13.1325M5.25 1.5H12.75C14.8211 1.5 16.5 3.17893 16.5 5.25V12.75C16.5 14.8211 14.8211 16.5 12.75 16.5H5.25C3.17893 16.5 1.5 14.8211 1.5 12.75V5.25C1.5 3.17893 3.17893 1.5 5.25 1.5ZM12 8.52754C12.0925 9.15173 11.9859 9.78921 11.6953 10.3493C11.4047 10.9094 10.9448 11.3636 10.3812 11.6473C9.81754 11.931 9.1788 12.0297 8.5558 11.9295C7.93281 11.8292 7.35728 11.5351 6.91109 11.0889C6.4649 10.6427 6.17076 10.0672 6.07051 9.4442C5.97027 8.82121 6.06901 8.18246 6.35271 7.61882C6.6364 7.05518 7.0906 6.59535 7.6507 6.30472C8.2108 6.0141 8.84828 5.90748 9.47246 6.00004C10.1092 6.09446 10.6986 6.39114 11.1537 6.84627C11.6089 7.3014 11.9056 7.89085 12 8.52754Z" stroke="#E815B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <a :href="props.restaurant.instagram" target="_blank">{{ getSocialHandle(props.restaurant.instagram) || "Instagram" }}</a>
                    </div>
                </li>
                <li v-if="props.restaurant?.facebook">
                    <div class="detail-coords__list-div">
                        <div class="detail-coords__list-div-icon">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5 1.5H11.25C10.2554 1.5 9.30161 1.89509 8.59835 2.59835C7.89509 3.30161 7.5 4.25544 7.5 5.25V7.5H5.25V10.5H7.5V16.5H10.5V10.5H12.75L13.5 7.5H10.5V5.25C10.5 5.05109 10.579 4.86032 10.7197 4.71967C10.8603 4.57902 11.0511 4.5 11.25 4.5H13.5V1.5Z" stroke="#E815B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <a :href="props.restaurant.facebook" target="_blank">{{ getSocialHandle(props.restaurant.facebook) || "Facebook" }}</a>
                    </div>
                </li>
                <li v-if="props.restaurant?.contact_web">
                    <div class="detail-coords__list-div">
                        <div class="detail-coords__list-div-icon">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.43945 9.43945L14.25 14.25M2.76604 2.27779C2.69775 2.24901 2.62242 2.24124 2.54969 2.25548C2.47695 2.26971 2.41012 2.30531 2.35771 2.35771C2.30531 2.41012 2.26971 2.47695 2.25548 2.54969C2.24124 2.62242 2.24901 2.69775 2.27779 2.76604L7.15279 14.7653C7.1828 14.8379 7.23481 14.8992 7.30149 14.9408C7.36818 14.9823 7.4462 15.0018 7.52459 14.9967C7.60297 14.9916 7.67778 14.962 7.73848 14.9121C7.79919 14.8623 7.84275 14.7947 7.86304 14.7188L9.03979 10.1565C9.10242 9.89018 9.23671 9.64602 9.42814 9.4505C9.61956 9.25498 9.86082 9.11555 10.1258 9.04729L14.7188 7.86304C14.7951 7.84324 14.8631 7.79992 14.9134 7.73924C14.9636 7.67855 14.9935 7.60358 14.9987 7.52497C15.004 7.44635 14.9843 7.36809 14.9425 7.30128C14.9008 7.23447 14.839 7.18252 14.766 7.15279L2.76604 2.27779Z" stroke="#E815B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <a :href="props.restaurant.contact_web" target="_blank">{{ props.restaurant.contact_web }}</a>
                    </div>
                </li>
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
        String(item?.title || "")
            .toLowerCase()
            .includes(title.toLowerCase()),
    )
    return section?.content || "Information indisponible."
}

const lieuText = computed(() => findSectionText("lieu"))
const degustationText = computed(() => findSectionText("dégustation"))
const additionText = computed(
    () => props.restaurant?.carte || "Information sur les prix indisponible.",
)

const normalizePath = (value) =>
    String(value || "")
        .trim()
        .replace(/https?:\/\/[^/]+/i, "")

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

const resolvedDetailPhoto = computed(
    () => detailPhotoCandidates.value[detailPhotoCandidateIndex.value] || "",
)

const onDetailPhotoError = () => {
    if (detailPhotoCandidateIndex.value < detailPhotoCandidates.value.length - 1) {
        detailPhotoCandidateIndex.value += 1
        return
    }

    // No valid URL left: hide the photo block completely.
    detailPhotoCandidateIndex.value = detailPhotoCandidates.value.length
}

const getSocialHandle = (url) => {
    if (!url) return ""
    try {
        const path = new URL(url).pathname
        const segments = path.split("/").filter((s) => s.length > 0)
        return segments.length > 0 ? `@${segments[segments.length - 1]}` : ""
    } catch {
        const parts = url.split("/")
        const lastPart = parts.filter((p) => p.length > 0).pop()
        return lastPart ? `@${lastPart}` : ""
    }
}
</script>

<style scoped>
.detail-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
}

.detail-box__name {
    align-self: stretch;
    color: #e815b2;
    font-family: Lalezar;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
}

.detail-section__date {
    color: #377dd1;
    font-family: Abordage;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
}

.detail-section__chapeau {
    align-self: stretch;

    color: #000;
    font-family: Abordage;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
}

.detail-section--lieu__title-div {
    display: flex;
    transform: rotate(-3deg);
    justify-content: center;
    width: fit-content;

    margin-bottom: -20px;

    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 0 10px;
}
.detail-section--lieu__title {
    color: #ffbb53;
    font-family: Lalezar;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: 46px;

    padding-top: 8px;
}
.detail-section--lieu__text {
    display: flex;
    padding: 56px 16px 16px 16px;
    align-items: center;
    gap: 10px;
    align-self: stretch;

    border-radius: 15px;
    border: 2px dashed #ffbb53;
    background: #fff;
}

.detail-section--degustation__title-div {
    display: flex;
    transform: rotate(-3deg);
    justify-content: center;
    width: fit-content;

    margin-bottom: -20px;

    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 0 10px;
}
.detail-section--degustation__title {
    color: #007FD8;
    font-family: Lalezar;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: 46px;

    padding-top: 8px;
}
.detail-section--degustation__text {
    display: flex;
    padding: 56px 16px 16px 16px;
    align-items: center;
    gap: 10px;
    align-self: stretch;

    border-radius: 15px;
    border: 2px dashed #007FD8;
    background: #FFF;
}

.detail-section--addition__title-div {
    display: flex;
    transform: rotate(-3deg);
    justify-content: center;
    width: fit-content;

    margin-bottom: -20px;

    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 0 10px;
}
.detail-section--addition__title {
    color: #FF8159;
    font-family: Lalezar;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: 46px;

    padding-top: 8px;
}
.detail-section--addition__text {
    display: flex;
    padding: 56px 16px 16px 16px;
    align-items: center;
    gap: 10px;
    align-self: stretch;

    border-radius: 15px;
    border: 2px dashed #FF8159;
    background: #FFF;
}

.detail-section--coords__title-div {
    display: flex;
    transform: rotate(-3deg);
    justify-content: center;
    width: fit-content;

    margin-bottom: -20px;

    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 0 10px;
}
.detail-section--coords__title {
    color: #191816;
    font-family: Lalezar;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: 46px;

    padding-top: 8px;
}
.detail-coords__list {
    display: flex;
    flex-direction: column;
    padding: 56px 16px 16px 16px;
    gap: 10px;

    border-radius: 15px;
    border: 2px dashed #191816;
    background: #FFF;
}
.detail-coords__list-div {
    display: flex;
    gap: 10px;
    align-items: center;
}
.detail-coords__list-div-icon {
    display: flex;
    width: 36px;
    height: 34px;
    padding: 11px 12px;
    justify-content: center;
    align-items: center;
    gap: 5px;

    border-radius: 30px;
    background: #FDE8F7;
}
.detail-coords__list-div svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
}
</style>
