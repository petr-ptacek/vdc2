import "@/assets/styles/main.pcss";
import "leaflet/dist/leaflet.css";

import { router } from "./router";

import { createApp } from "vue";
import App           from "./App.vue";

createApp(App)
	.use(router)
	.mount("#app");
