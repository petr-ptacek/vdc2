import HomeView                                                from "@/pages/Home.vue";
import Playground                                              from "@/pages/Playground.vue";
import Styleguide                                              from "@/pages/Styleguide.vue";
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: "home",
			path: "",
			component: HomeView
		}
	]
});

if ( import.meta.env.MODE === "development" ) {
	([
		{
			name: "styleguide",
			path: "/styleguide",
			component: Styleguide
		},
		{
			name: "playground",
			path: "/playground",
			component: Playground
		}
	] satisfies RouteRecordRaw[])
		.forEach((route) => {
			router.addRoute(route);
		});
}

export { router };
