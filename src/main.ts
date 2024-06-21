import "@/assets/styles/main.pcss";
import "leaflet/dist/leaflet.css";
import AppAccordion  from "@/components/AppAccordion/AppAccordion.vue";
import AppSheet      from "@/components/AppSheet.vue";
import { createApp } from "vue";
import App           from "./App.vue";
import AppIcon       from "./components/AppIcon/AppIcon.vue";

import { router } from "./router";

createApp(App)
	.component("AppIcon", AppIcon)
	.component("AppSheet", AppSheet)
	.component("AppAccordion", AppAccordion)
	.use(router)
	.mount("#app");
