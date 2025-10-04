import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'

createApp(App).use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,  // ✅ load from .env
  },
}).mount('#app')




