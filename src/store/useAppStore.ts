import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
	state: () => {
		const drawerForms = {
			opened: false
		};

		const windowHowToUseAI = {
			opened: false
		};

		return {
			drawerForms,
			windowHowToUseAI
		};
	},
	actions: {
		toggleDrawerForms(open?: boolean) {
			this.drawerForms.opened = open ?? !this.drawerForms.opened;
		},
		toggleWindowHowToUseAI(open?: boolean) {
			this.windowHowToUseAI.opened = open ?? !this.windowHowToUseAI.opened;
		}
	}
});
