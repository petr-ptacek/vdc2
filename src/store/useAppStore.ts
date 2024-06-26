import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
	state: () => {
		const drawerForms = {
			opened: false
		};

		const modalWindowHowToUseAI = {
			opened: false
		};

		return {
			drawerForms,
			modalWindowHowToUseAI
		};
	},
	actions: {
		toggleDrawerForms(open?: boolean) {
			this.drawerForms.opened = open ?? !this.drawerForms.opened;
		},
		toggleModalWindowHowToUseAI(open?: boolean) {
			this.modalWindowHowToUseAI.opened = open ?? !this.modalWindowHowToUseAI.opened;
		}
	}
});
