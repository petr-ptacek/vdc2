import type { Map, PointExpression } from "leaflet";

export type LeafletApi = Map;

export type LeafletMapReadyEvent = {
	api: LeafletApi;
};


export type WLeafletMapProps = {
	center?: PointExpression;
	zoom?: number;
}

export type WLeafletMapEmits = {
	ready: [LeafletMapReadyEvent];
	"update:lMapApi": [LeafletApi];
}
