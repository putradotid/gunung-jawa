import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "leaflet/dist/leaflet.css"; 

// Import FontAwesomeIcon yang sudah dikonfigurasi
import FontAwesomeIcon from './plugins/fontawesome';


const app = createApp(App)

app.use(router)

// Daftarkan komponen secara global
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app')
