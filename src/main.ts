import "@/assets/styles/main.pcss";
import "leaflet/dist/leaflet.css";
import AppAccordion    from "@/components/AppAccordion/AppAccordion.vue";
import { AppLoader }   from "@/components/AppLoader";
import AppSheet        from "@/components/AppSheet.vue";
import { createApp }   from "vue";
import App             from "./App.vue";
import AppIcon         from "./components/AppIcon/AppIcon.vue";
import { createPinia } from "pinia";

import { router } from "./router";

createApp(App)
	.component("AppIcon", AppIcon)
	.component("AppSheet", AppSheet)
	.component("AppAccordion", AppAccordion)
	.component("AppLoader", AppLoader)
	.use(router)
	.use(createPinia())
	.mount("#app");
