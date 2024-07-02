import ExcerptInfo      from "@/components/FullscreenWindows/windows/ExcerptDetail/tabs/ExcerptInfo.vue";
import KrameriusInfo    from "@/components/FullscreenWindows/windows/ExcerptDetail/tabs/KrameriusInfo.vue";
import type { TabItem } from "@/components/FullscreenWindows/windows/ExcerptDetail/types";

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
