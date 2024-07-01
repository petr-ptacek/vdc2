import type { LatLngTuple, Map, PointExpression } from "leaflet";

export type LeafletMapApi = Map;

export type LeafletMapReadyEvent = {
	api: LeafletMapApi;
};


export type LeafletMapProps = {
	center?: PointExpression;
	zoom?: number;
}

export type LeafletMapEmits = {
	ready: [LeafletMapReadyEvent];
	"update:lMapApi": [LeafletMapApi];
}
