import { defineStore } from "pinia";

export const useSearchStore = defineStore("searchStore", {
	state() {
		const searchResultsContainer = {
			opened: false
		};

		return {
			searchResultsContainer
		};
	},
	actions: {
		toggleSearchResultsContainer(open?: boolean) {
			this.searchResultsContainer.opened = open ?? !this.searchResultsContainer.opened;
		}
	}
});
