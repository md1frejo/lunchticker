<script setup>

 import { ref, defineProps, watch, onMounted } from 'vue'

 const props = defineProps({
   markers: Array,
   selected: Object,
 })

 const mapRef = ref(null)
 let map = null
 const zoomLevel = ref(12)
 const markerMap = new Map()
 const selectedMarker = ref(null) // <-- Track selected marker

 onMounted(() => {
   if (!window.google || !google.maps) {
     console.error('Google Maps API not loaded.')
     return
   }

   map = new google.maps.Map(mapRef.value, {
     center: { lat: 57.6911, lng: 11.9255 },
     zoom: zoomLevel.value,
   })

   if (props.markers) {
     props.markers.forEach((m) => {
       const marker = new google.maps.Marker({
         position: { lat: m.lat, lng: m.lng },
         map,
         title: m.title,
         icon: makeStickerIcon(m.title, m.pris, m.betyg, zoomLevel.value, false),
       })
       marker.addListener('click', () => {
         // Deselect previous marker
         if (selectedMarker.value && selectedMarker.value !== marker) {
           const prev = selectedMarker.value
           const prevData = [...markerMap.entries()].find(([_, mk]) => mk === prev)
           if (prevData) {
             const [prevTitle] = prevData
             const prevInfo = props.markers.find(m => m.title === prevTitle)
             prev.setIcon(makeStickerIcon(prevInfo.title, prevInfo.pris, prevInfo.betyg, zoomLevel.value, false))
           }
         }

         // Select this marker
         selectedMarker.value = marker
         marker.setIcon(makeStickerIcon(m.title, m.pris, m.betyg, zoomLevel.value, true))
         map.panTo(marker.getPosition())
       })

       markerMap.set(m.title, marker)
     })
   }
 })

 // Utility to draw SVG marker
 function makeStickerIcon(title, pris, betyg, zoomLevel, isSelected = false) {
   const baseWidth = isSelected ? 100 : 70  // enlarge on selection
   const baseHeight = isSelected ? 60 : 40
   const scale = Math.max(0.5, Math.min(2.5, zoomLevel / 12))
   const boxWidth = baseWidth * scale
   const boxHeight = baseHeight * scale
   const pinHeight = 10 * scale
   const totalHeight = boxHeight + pinHeight

   const glowFilter = isSelected
		    ? `<filter id="glow">
         <feGaussianBlur stdDeviation="${2 * scale}" result="coloredBlur"/>
         <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
       </filter>`
		    : ''

   const glowStyle = isSelected ? 'filter="url(#glow)"' : ''

   const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${boxWidth}" height="${totalHeight}">
    ${glowFilter}
    <rect x="0" y="0" width="${boxWidth}" height="${boxHeight}"
          rx="${6 * scale}" ry="${6 * scale}" fill="#ffffff"
          stroke="${isSelected ? '#00bfff' : '#000'}"
          stroke-width="${1 * scale}" ${glowStyle} />
    <polygon points="${boxWidth / 2 - 5 * scale},${boxHeight}
                     ${boxWidth / 2 + 5 * scale},${boxHeight}
                     ${boxWidth / 2},${boxHeight + pinHeight}"
              fill="${isSelected ? '#00bfff' : '#1e90ff'}" ${glowStyle} />
    <text x="${6 * scale}" y="${14 * scale}" font-size="${10 * scale}" fill="black">${title}</text>
    <text x="${6 * scale}" y="${26 * scale}" font-size="${9 * scale}" fill="#333">${pris}</text>
    <text x="${8 * scale}" y="${38 * scale}" font-size="${11 * scale}" fill="#8b0000">${betyg}</text>
  </svg>`

   return {
     url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
     scaledSize: new google.maps.Size(boxWidth, totalHeight),
     anchor: new google.maps.Point(boxWidth / 2, totalHeight),
   }
 }

 const mapOptions = {
   scrollwheel: true,
   gestureHandling: 'greedy',
   zoomControl: true,
 }
</script>

<template>
  <div ref="mapRef" style="width: 100%; height: 500px"></div>
</template>
