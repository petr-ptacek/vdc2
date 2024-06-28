import type { Map } from "leaflet";

export type LMapApi = Map;

export type LMapReadyEvent = {
	api: LMapApi;
};
