import type { Excerpt } from "@/types";
import { defineStore }  from "pinia";

type _State = {
	excerptId: string | null;
	excerpt: Excerpt | null;
	opened: boolean;
	fetching: boolean;
}

export const useExcerptDetailStore = defineStore("excerptDetailStore",
	{
		state(): _State {
			return {
				excerptId: null,
				excerpt: null,
				opened: false,
				fetching: false
			};
		},
		actions: {
			async openDetail(excerptId: string) {
				this.excerptId = excerptId;

				if ( !this.excerpt ) {
					this.excerpt = await this.fetchData(excerptId);
				}

				this.opened = !!this.excerpt;
			},
			closeDetail() {
				this.opened = false;
				this.excerpt = null;
			},
			async fetchData(excerptId: string): Promise<Excerpt> {
				// const appStore = useAppStore();
				this.fetching = true;

				this.excerpt = {
					id: excerptId,
					title: "Excerpt Detail"
				};

				this.fetching = false;
				return this.excerpt;
			}
		}
	}
);
