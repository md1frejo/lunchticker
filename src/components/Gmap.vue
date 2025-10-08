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
   const baseWidth = 70;
   const baseHeight = 40;

   // Scale based on zoom
   const scale = Math.max(0.5, Math.min(2.5, zoomLevel / 12));
   const boxWidth = baseWidth * scale;
   const boxHeight = baseHeight * scale;
   const pinHeight = 10 * scale; // pin "triangle" height
   const totalHeight = boxHeight + pinHeight;

   const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${boxWidth}" height="${totalHeight}">
      <!-- background box -->
      <rect x="0" y="0" width="${boxWidth}" height="${boxHeight}"
            rx="${6 * scale}" ry="${6 * scale}" fill="#e5ffff" stroke="black" stroke-width="${1 * scale}" />

      <!-- pin below the box -->
      <polygon points="${boxWidth / 2 - 5 * scale},${boxHeight}
                       ${boxWidth / 2 + 5 * scale},${boxHeight}
                       ${boxWidth / 2},${boxHeight + pinHeight}"
               fill="#1e90ff" stroke="black" stroke-width="${0.5 * scale}" />

      <!-- text -->
      <text x="${6 * scale}" y="${14 * scale}" font-size="${10 * scale}" fill="black" font-family="sans-serif">${title}</text>
      <text x="${6 * scale}" y="${26 * scale}" font-size="${9 * scale}" fill="#333" font-family="sans-serif">${pris}</text>
      <text x="${8 * scale}" y="${38 * scale}" font-size="${11 * scale}" fill="#8b0000" font-family="sans-serif">${betyg}</text>
    </svg>`;

   return {
     url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
     scaledSize: { width: boxWidth, height: totalHeight },
     anchor: { x: boxWidth / 2, y: totalHeight }, // anchor at the tip of the pin
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
