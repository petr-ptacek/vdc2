import ExcerptInfo          from "@/views/home/components/ExcerptDetail/tabs/ExcerptInfo.vue";
import KrameriusInfo        from "@/views/home/components/ExcerptDetail/tabs/KrameriusInfo.vue";
import MapInfo              from "@/views/home/components/ExcerptDetail/tabs/MapInfo.vue";
import TransportConnections from "@/views/home/components/ExcerptDetail/tabs/TransportConnections.vue";
import type { TabItem }     from "@/views/home/components/ExcerptDetail/types";

export function createTabs(): TabItem[] {
	return [
		{
			id: "excerpt-info",
			label: "Úryvek",
			data: {
				component: ExcerptInfo
			}
		},
		{
			id: "kramerius-info",
			label: "Kramerius",
			data: {
				component: KrameriusInfo
			}
		},
		{
			id: "map-info",
			label: "Mapa",
			data: {
				component: MapInfo
			}
		},
		{
			id: "transport-connections",
			label: "Způsob dopravy a vazby",
			data: {
				component: TransportConnections
			}
		}
	];
}
