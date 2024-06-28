<script setup lang="ts">
import { insertsList }                  from "@/data/inserts";
import { eventBus }                     from "@/eventBus/eventBus";
import { LMap, LMarker, LTileLayer }    from "@vue-leaflet/vue-leaflet";
import type { Map as MapClass }         from "leaflet";
import { ref, shallowRef }              from "vue";
import type { LMapApi, LMapReadyEvent } from "./types";

const emit = defineEmits<{
	ready: [LMapReadyEvent];
	"update:lMapApi": [LMapApi];
}>();

const zoom = ref(8);
const center = ref<[number, number]>([49.593777, 17.250879]);
const lMapRef = ref<InstanceType<typeof LMap> | null>(null);
const mapApi = shallowRef<MapClass | null>(null);

eventBus.on("target", (latLng: any) => {
	mapApi.value?.setView(latLng, mapApi.value?.getZoom(), { animate: true });
});

defineExpose<{
	lMapRef: typeof lMapRef;
}>({
	lMapRef: lMapRef
});

function readyHandler(api: MapClass) {
	console.assert(
		lMapRef.value?.leafletObject === api,
		``
	);
	mapApi.value = api;
	emit("ready", { api: mapApi.value });
	emit("update:lMapApi", mapApi.value);
}
</script>


<template>
	<div class="w-full h-full">
		<LMap
			ref="lMapRef"
			v-model:zoom="zoom"
			:max-zoom="15"
			:min-zoom="2"
			:use-global-leaflet="false"
			:center
			:options="{
				dragging: true,
				zoomDelta: 1,
				scrollWheelZoom: true,
				wheelDebounceTime: 40
			}"
			@ready="readyHandler"
		>
			<l-tile-layer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				layer-type="base"
				name="OpenStreetMap"
			/>

			<LMarker v-for="item in insertsList" :key="item.id" :lat-lng="item.latLng as [number, number]" />
			<slot />
		</LMap>
	</div>
</template>
