<script setup>

 import Gmap from './Gmap.vue'
 import { ref, onMounted } from 'vue'

 const BIN_URL = import.meta.env.VITE_BIN_URL;
 const markers = ref([])
 const selected = ref({ lat: 57.6911, lng: 11.9255 })

 onMounted(async () => {
   try {
     const response = await fetch(BIN_URL)
     if (!response.ok) throw new Error('Failed to load data')
     markers.value = await response.json()
   } catch (err) {
     console.error('Error loading restaurants:', err)
   }
 })
 
 function selectPlace(m) {
   selected.value = { lat: m.lat, lng: m.lng }
 }
 
</script>

<template>

  <div class="max-w-[70%] mx-auto py-10">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="text-left bg-blue-50 p-6 rounded shadow">
	<h2 class="text-xl font-bold mb-4">Bäst just nu (*****)</h2>
	<ul class="flex flex-wrap gap-4">
          <li
            v-for="m in markers.filter(m => m.betyg==='*****')"
            :key="m.title"
            class="cursor-pointer hover:text-blue-500 p-2 border rounded w-[200px]"
            @click="selectPlace(m)">
            <span class="block font-semibold">{{ m.title }}</span>
            <span class="block text-sm text-gray-500">
              {{ m.pris }} — {{ m.betyg }}
            </span>
          </li>
	</ul>
      </div>

      <div class="text-left bg-blue-50 p-6 rounded shadow">
	<h2 class="text-xl font-bold mb-4">Sämst just nu (***)</h2>
	<ul class="flex flex-wrap gap-4">
          <li
            v-for="m in markers.filter(m => m.betyg==='***')"
            :key="m.title"
            class="cursor-pointer hover:text-blue-500 p-2 border rounded w-[200px]"
            @click="selectPlace(m)">
            <span class="block font-semibold">{{ m.title }}</span>
            <span class="block text-sm text-gray-500">
              {{ m.pris }} — {{ m.betyg }}
            </span>
          </li>
	</ul>
      </div>

    </div>
      
    <div class="text-center mt-10 bg-blue-50 p-6 rounded shadow">
      <Gmap :markers="markers" :selected="selected" />
    </div>
  </div>
  
</template>
