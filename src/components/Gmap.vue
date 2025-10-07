<script setup>

 import { ref, onMounted, watch } from "vue"

 const markers = ref([])
 const zoomLevel = ref(14)
 const smoothZoom = ref(12) // interpolated zoom for smooth animation

 onMounted(async () => {
   const response = await fetch("/markers.json")
   markers.value = await response.json()
 })

 // Animate smoothZoom → zoomLevel
 watch(zoomLevel, (newZoom) => {
   const step = () => {
     smoothZoom.value += (newZoom - smoothZoom.value) * 0.15 // easing
     if (Math.abs(newZoom - smoothZoom.value) > 0.01) {
       requestAnimationFrame(step)
     } else {
       smoothZoom.value = newZoom
     }
   }
   requestAnimationFrame(step)
 })

 const mapOptions = {
   scrollwheel: true,
   gestureHandling: "greedy",
   zoomControl: true,
 }

 function makeStickerIcon(title, pris, betyg, zoomLevel) {
   const baseWidth = 60;
   const baseHeight = 40;

   // Scale grows with zoom (adjust as needed)
   const scale = Math.max(0.5, Math.min(2.5, zoomLevel / 12));

   const width = baseWidth * scale + 10 * scale; // extra room for pin
   const height = baseHeight * scale;

   const rectX = 10 * scale; // shift box right so pin can "stick out"
   const rectY = 0;

   const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <!-- pin (slightly outside the box) -->
      <circle cx="${4 * scale}" cy="${height / 2}" r="${4 * scale}" fill="#008b00" stroke="black" stroke-width="${0.5 * scale}" />

      <!-- background box -->
      <rect x="${rectX}" y="${rectY}" width="${baseWidth * scale}" height="${baseHeight * scale}"
            rx="${6 * scale}" ry="${6 * scale}" fill="white" stroke="black" stroke-width="${1 * scale}" />

      <!-- text -->
      <text x="${rectX + 8 * scale}" y="${12 * scale}" font-size="${10 * scale}" fill="black" font-family="sans-serif">${title}</text>
      <text x="${rectX + 8 * scale}" y="${24 * scale}" font-size="${9 * scale}" fill="#333" font-family="sans-serif">${pris}</text>
      <text x="${rectX + 8 * scale}" y="${36 * scale}" font-size="${11 * scale}" fill="#8b0000" font-family="sans-serif">${betyg}</text>
    </svg>`;

   return {
     url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
     scaledSize: { width, height },
     anchor: { x: 0, y: height / 2 }, // optional: aligns marker by its pin
   };
 }
 
</script>

<template>

  <div class="text-center max-w-[70%] mx-auto py-10">
    <GMapMap
      :center="{ lat: 57.6911, lng: 11.9255 }"
      :zoom="zoomLevel"
      :options="mapOptions"
      style="width: 100%; height: 500px"
      @zoom_changed="(z) => zoomLevel = z">
      <GMapMarker
        v-for="(m, i) in markers"
        :key="i"
        :position="{ lat: m.lat, lng: m.lng }"
        :icon="makeStickerIcon(m.title, m.pris, m.betyg, zoomLevel)"/>
    </GMapMap>
  </div>
  
</template>
