<script setup>

 import { ref, onMounted } from "vue";

 const markers = ref([]);
 const selected = ref(null);

 onMounted(async () => {
   const response = await fetch("/markers.json");
   markers.value = await response.json();
 });

 const mapOptions = {
   scrollwheel: true,   // enable mouse wheel zoom
   gestureHandling: "greedy", // allows zoom + pan with mouse/finger
   zoomControl: true,   // show zoom buttons
 };
 
</script>

<template>
  <p class="text-gm1 text-red-400">gmap</p>
  <div class="text-center max-w-[70%] mx-auto py-10">
    <GMapMap
      :center="{ lat: 57.789, lng: 11.9746 }"
      :zoom="12"
      :options="mapOptions"
      style="width: 75%; height: 500px">
      <GMapMarker
	v-for="(m, i) in markers"
	:key="i"
	:position="{ lat: m.lat, lng: m.lng }"
	:clickable="true"
	@click="selected = m"/>
      <GMapInfoWindow
	v-if="selected"
	:position="{ lat: selected.lat, lng: selected.lng }"
	@closeclick="selected = null">
	<p class="text-gm3">{{ selected.title }}</p>
      </GMapInfoWindow>
    </GMapMap>
  </div>
</template>
