import { useEmitter }       from "@/composables";
import type { LatLngTuple } from "leaflet";

type _Events = {
	setView: [{ latLng: LatLngTuple; zoom?: number; }];
}

const baseMapEmitter = useEmitter<_Events>();
