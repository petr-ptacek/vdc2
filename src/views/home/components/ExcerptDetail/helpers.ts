import ExcerptInfo      from "@/views/home/components/ExcerptDetail/tabs/ExcerptInfo.vue";
import KrameriusInfo    from "@/views/home/components/ExcerptDetail/tabs/KrameriusInfo.vue";
import type { TabItem } from "@/views/home/components/ExcerptDetail/types";

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
		}
	];
}
