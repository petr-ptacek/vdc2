<script setup lang="ts">
import { EXCERPTS_LIST } from "@/data";
import { eventBus }      from "@/eventBus/eventBus";
import { LMap, LMarker, LTileLayer }               from "@vue-leaflet/vue-leaflet";
import type { Map as MapClass }                    from "leaflet";
import { ref, shallowRef }                         from "vue";
import type { WLeafletMapEmits, WLeafletMapProps } from "./types";

defineProps<WLeafletMapProps>();
const emit = defineEmits<WLeafletMapEmits>();

const lMapRef = ref<InstanceType<typeof LMap> | null>(null);
const mapApi = shallowRef<MapClass | null>(null);

eventBus.on("target", (latLng: any) => {
	mapApi.value?.setView(latLng, mapApi.value?.getZoom(), { animate: true });
});

function readyHandler(api: MapClass) {
	console.assert(
		lMapRef.value?.leafletObject === api,
		``
	);
	mapApi.value = api;
	emit("update:lMapApi", mapApi.value);
	emit("ready", { api: mapApi.value });
}
</script>

<template>
	<div class="w-full h-full">
		<LMap
			ref="lMapRef"
			:zoom
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

			<LMarker v-for="item in EXCERPTS_LIST" :key="item.id" :lat-lng="item.latLng" />
			<slot />
		</LMap>
	</div>
</template>
