<script setup>

 import Gmap from './Gmap.vue'
 import { ref, onMounted } from 'vue'

 const BIN_URL1 = import.meta.env.VITE_BIN_URL1; 
 const BIN_URL2 = import.meta.env.VITE_BIN_URL2;
 const markers = ref([])
 const bw = ref([])
 const selected = ref({ lat: 57.6911, lng: 11.9255 })
 const mv=markers.value
 
 onMounted(async () => {
   try {
     const response = await fetch(BIN_URL1)
     if (!response.ok) throw new Error('Failed to load data')
     markers.value = await response.json()
   } catch (err) {
     console.error('Error loading restaurants:', err)
   }
 })

 onMounted(async () => {
   try {
     const response = await fetch(BIN_URL2)
     if (!response.ok) throw new Error('Failed to load data')
     bw.value = await response.json()
   } catch (err) {
     console.error('Error loading best worst:', err)
   }
 })

 
 console.log(bw)
 function selectPlace(m) {
   selected.value = { lat: m.lat, lng: m.lng }
 }
 
</script>

<template>

  <div v-if="bw.best && bw.worst" class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[70%] mx-auto">
    <div class="flex flex-wrap gap-4">
      <p class="text-he4 font-roboto font-extralight">Topp: </p>
      <p class="underline text-he2 text-center text-green4g-100 font-roboto font-extralight cursor-pointer hover:text-blue-500 " @click="selectPlace({ lat: bw.best.lat, lng: bw.best.lng })">
	{{ bw.best.title }} </p>
      <p class="text-he4 font-madi font-extralight">"generös sallad<br>kaka till kafet, bra pris"</p>
    </div>
      <div class="flex flex-wrap gap-4">
	<p class="text-he4 font-roboto font-extralight">Botten: </p>
	<p class="underline text-he2 text-red4g-100 font-roboto font-bold1 cursor-pointer hover:text-blue-500" @click="selectPlace({ lat: bw.best.lat, lng: bw.best.lng })">
	  {{ bw.worst.title }} </p>
	<p class="text-he4 font-madi font-extralight">"mängden fetma<br> är abnorm"</p>
      </div>
    </div>
    <div class="max-w-[70%] mx-auto py-10">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="text-left bg-blue-50 p-6 rounded shadow">
	<p class="text-he3 font-comingsoon mb-4">Bäst just nu</p>
	<ul class="flex flex-wrap gap-4">
          <li
            v-for="m in markers.filter(m => m.betyg==='*****')"
            :key="m.title"
            class="cursor-pointer hover:text-blue-500 p-2 border rounded w-[200px]"
            @click="selectPlace(m)">
            <span class="text-he5 font-comingsoon text-brown4g-200 text-extralight">{{ m.title }} {{ m.pris }} {{ m.betyg }}</span>
          </li>
	</ul>
      </div>
      <div class="text-left bg-blue-50 p-6 rounded shadow">
	<p class="text-he3 font-comingsoon mb-4">Sämst just nu</p>
	<ul class="flex flex-wrap gap-4">
          <li
            v-for="m in markers.filter(m => m.betyg<='**')"
            :key="m.title"
            class="cursor-pointer hover:text-blue-500 p-2 border rounded w-[200px]"
            @click="selectPlace(m)">
	    <span class="text-he5 font-comingsoon text-brown4g-200 text-extralight">{{ m.title }} {{ m.pris }} {{ m.betyg }}</span>
          </li>
	</ul>
      </div>

    </div>
      
    <div class="text-center mt-10 bg-blue-50 p-6 rounded shadow">
      <Gmap :markers="markers" :selected="selected" />
    </div>
  </div>
  
</template>
