import "@/styles/main.pcss";
import "leaflet/dist/leaflet.css";
import { createPinia } from "pinia";
import { createApp }   from "vue";
import App             from "./App.vue";

import { router }  from "./router";
import { tooltip } from "@/directives";

createApp(App)
	.use(router)
	.use(createPinia())
	.directive("tooltip", tooltip)
	.mount("#app");
