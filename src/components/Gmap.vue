<script setup>
 import { ref, onMounted } from "vue";

 const markers = ref([]);

 onMounted(async () => {
   const response = await fetch("/markers.json");
   markers.value = await response.json();
 });

 const mapOptions = {
   scrollwheel: true,
   gestureHandling: "greedy",
   zoomControl: true,
 };

 // helper to generate sticker icons
 function makeStickerIcon(title, subtitle) {
   const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="140" height="50">
      <rect x="0" y="0" width="140" height="50" rx="8" ry="8" fill="white" stroke="black"/>
      <text x="10" y="20" font-size="14" fill="black">${title}</text>
      <text x="10" y="40" font-size="12" fill="gray">${subtitle}</text>
    </svg>
   `;
   return {
     url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
     scaledSize: { width: 140, height: 50 }
   };
 }
</script>

<template>
  <p class="text-gm1 text-red-400">gmap</p>
  <div class="text-center max-w-[70%] mx-auto py-10">
    <GMapMap
      :center="{ lat: 57.789, lng: 11.9746 }"
      :zoom="12"
      :options="mapOptions"
      style="width: 75%; height: 500px"
    >
      <GMapMarker
        v-for="(m, i) in markers"
        :key="i"
        :position="{ lat: m.lat, lng: m.lng }"
        :icon="makeStickerIcon(m.title, m.subtitle)"
      />
    </GMapMap>
  </div>
</template>
