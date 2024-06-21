import HomeView                           from "@/pages/Home.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: "home",
			path: "",
			component: HomeView
		},
		{
			name: "/styleguide",
			path: "",
			component: HomeView
		}
	]
});

export { router };
