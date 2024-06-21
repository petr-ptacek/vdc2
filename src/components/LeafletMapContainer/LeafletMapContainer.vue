<script setup lang="ts">
import type { LMapApi, LMapReadyEvent }                  from "./types";
import { LMap, LTileLayer, LControlLayers, LLayerGroup } from "@vue-leaflet/vue-leaflet";
import type { Map as MapClass }                          from "leaflet";
import { ref, shallowRef }                               from "vue";

const emit = defineEmits<{
	ready: [LMapReadyEvent];
	"update:lMapApi": [LMapApi];
}>();

const zoom = ref(6);
const center = ref<[number, number]>([50.087811, 14.420460]);
const lMapRef = ref<InstanceType<typeof LMap> | null>(null);
const mapApi = shallowRef<MapClass | null>(null);

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
				url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
				layer-type="base"
				name="Google Map"
			/>

			<l-tile-layer
				url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
				layer-type="base"
				attribution="Google Maps Satellite"
				name="Google Maps Satellite"
			/>

			<slot />

			<LControlLayers />
		</LMap>
	</div>
</template>
