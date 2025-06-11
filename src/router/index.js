// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MountainListView from '../views/MountainListView.vue'
import MapView from '../views/MapView.vue'
import GuidesView from '../views/GuidesView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/gunung',
      name: 'mountain-list',
      component: MountainListView
    },
    {
      path: '/peta',
      name: 'map',
      component: MapView
    },
    {
      path: '/panduan',
      name: 'guides',
      component: GuidesView
    },
    {
      path: '/tentang',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router