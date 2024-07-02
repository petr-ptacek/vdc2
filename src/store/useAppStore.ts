import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
	state: () => {
		let _loaderCounter = 0;

		const drawerForms = {
			opened: false
		};

		const windowHowToUseAI = {
			opened: false
		};

		return {
			drawerForms,
			windowHowToUseAI,
			_loaderCounter
		};
	},
	getters: {
		loaderVisibility(): boolean {
			return this._loaderCounter > 0;
		}
	},
	actions: {
		showLoader() {
			this._loaderCounter++;
		},
		hideLoader() {
			this._loaderCounter -= this._loaderCounter - 1 < 0 ? 0 : 1;
		},

		toggleDrawerForms(open?: boolean) {
			this.drawerForms.opened = open ?? !this.drawerForms.opened;
		},
		toggleWindowHowToUseAI(open?: boolean) {
			this.windowHowToUseAI.opened = open ?? !this.windowHowToUseAI.opened;
		}
	}
});
