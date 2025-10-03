import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'

createApp(App).use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyDMkWhquqyt3UkE5hypi8NKH1VveOCazDs',
    },
  }).mount('#app')





