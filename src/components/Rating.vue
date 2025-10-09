<script setup>

 import Gmap from './Gmap.vue'
 import { ref, onMounted } from 'vue'
 
 const markers = ref([])
 const selected = ref({ lat: 57.6911, lng: 11.9255 })

 onMounted(async () => {
   const response = await fetch('/markers.json')
   markers.value = await response.json()
 })

 function selectPlace(m) {
   selected.value = { lat: m.lat, lng: m.lng }
 }
 
</script>

<template>
  
  <div class="text-left max-w-[70%] mx-auto bg-SkyBlueg-400 py-10">
    <h2 class="text-xl font-bold mb-2">bäst just nu</h2>
    <ul class="flex flex-wrap gap-4">
      <li v-for="(m, i) in markers" :key="m.title"
        class="cursor-pointer hover:text-blue-500" @click="selectPlace(m)">
        <span class="font-semibold">{{ m.title }}</span>
        <span class="block text-sm text-gray-500">{{ m.pris }} — {{ m.betyg }}</span>
      </li>
    </ul>
  </div>
  <div class="text-center max-w-[70%] mx-auto bg-SkyBlueg-400 py-10">
    <Gmap :markers="markers" :selected="selected" />
  </div>
  
</template>
