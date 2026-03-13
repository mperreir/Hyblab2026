import { createRouter, createWebHistory } from 'vue-router' 
import ListView from '../views/ListView.vue'
import MapView from '../views/MapView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            alias: "/lanouvellerepublique/",
            name: "home",
            component: ListView,
        },
        {
            path: "/carte",
            alias: "/lanouvellerepublique/carte",
            name: "carte",
            component: MapView,
        },
    ],
})

export default router
