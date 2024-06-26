import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
	state: () => {
		const drawerForms = {
			opened: false
		};

		return {
			drawerForms
		};
	},
	actions: {
		toggleDrawerForms(open?: boolean) {
			this.drawerForms.opened = open ?? !this.drawerForms.opened;
		}
	}
});
