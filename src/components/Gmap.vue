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
 
onMounted(() => {
  // Wait until google maps script is ready
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
        // emit custom event if needed:
        // emit('update:selected', m)
        // Or if selection is managed locally, you can modify props.selected (with v-model)
        map.panTo({ lat: m.lat, lng: m.lng })
      })
      markerMap.set(m.title, marker)
    })
  }
 })

 
 //      markerMap.set(m.title, marker)

   // Watch selected and center + animate marker
 watch(() => props.selected,(sel,prevSel) => {

    if (!map) return

    // Reset previous marker's icon to normal size
    if (prevSel && markerMap.has(prevSel.title)) {
      const prevMarker = markerMap.get(prevSel.title)
      prevMarker.setIcon(
        makeStickerIcon(prevSel.title, prevSel.pris, prevSel.betyg, zoomLevel.value, false)
      )
    }

    // Highlight current selection
    if (sel && markerMap.has(sel.title)) {
      const marker = markerMap.get(sel.title)
      marker.setIcon(
        makeStickerIcon(sel.title, sel.pris, sel.betyg, zoomLevel.value, true)
      )
      map.panTo({ lat: sel.lat, lng: sel.lng })
      map.setZoom(14)

      // Set larger icon for selected marker
      marker.setAnimation(google.maps.Animation.BOUNCE)
      setTimeout(() => marker.setAnimation(null), 1400)
    }
  }
 )
 
 function makeStickerIcon(title, pris, betyg, zoomLevel, isSelected = false) {
   const baseWidth = 70
   const baseHeight = 40

   // Normal zoom scaling
   let scale = Math.max(0.5, Math.min(2.5, zoomLevel / 12))

   // If selected, enlarge a bit more
   if (isSelected) {
     scale *= 1.8   // Try 1.2–1.6 for how big you want it
   }
   
//   const scale = Math.max(0.5, Math.min(2.5, zoomLevel / 12))
   const boxWidth = baseWidth * scale
   const boxHeight = baseHeight * scale
   const pinHeight = 10 * scale
   const totalHeight = boxHeight + pinHeight

   // Add glow filter if selected
   const glowFilter = isSelected
		    ? `<filter id="glow">
         <feGaussianBlur stdDeviation="${2 * scale}" result="coloredBlur"/>
         <feMerge>
           <feMergeNode in="coloredBlur"/>
           <feMergeNode in="SourceGraphic"/>
         </feMerge>
       </filter>`: '';
   
   const glowStyle = isSelected ? 'filter="url(#glow)"' : '';
   
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
     scaledSize: { width: boxWidth, height: totalHeight },
     anchor: { x: boxWidth / 2, y: totalHeight },
   }
 }

 const mapOptions = {
   scrollwheel: true,
   gestureHandling: 'greedy',
   zoomControl: true,
 }
</script>

<template>
  <GMapMap
    ref="mapRef"
    :center="selected || { lat: 57.6911, lng: 11.9255 }"
    :zoom="zoomLevel"
    :options="mapOptions"
    style="width: 100%; height: 500px">
    <GMapMarker
      v-for="(m, i) in markers"
      :key="i"
      :position="{ lat: m.lat, lng: m.lng }"
      :icon="makeStickerIcon(m.title, m.pris, m.betyg, zoomLevel, selected && selected.title === m.titl)"
    />
  </GMapMap>
</template>
