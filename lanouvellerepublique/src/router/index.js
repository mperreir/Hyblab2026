import { createRouter, createWebHistory } from 'vue-router' 
import ListView from '../views/ListView.vue'
import AxiosExample from '../views/AxiosExample.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ListView,
    },
    {
      path: '/carte',
      name: 'carte',
      component: MapView,
    },
    {
      path: '/axios-example',
      name: 'axios-example',
      component: AxiosExample,
    },
  ],
})

export default router
