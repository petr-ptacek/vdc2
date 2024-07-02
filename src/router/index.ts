import Playground                                              from "@/pages/_Playground.vue";
import Styleguide                                              from "@/pages/_Styleguide.vue";
import AboutProject                                            from "@/pages/AboutProject.vue";
import Home                                                    from "@/pages/Home.vue";
import TraveloguesList                                         from "@/pages/TraveloguesList.vue";
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: "home",
			path: "",
			component: Home
		},
		{
			name: "about-project",
			path: "/about-project",
			component: AboutProject
		},
		{
			name: "travelogues-list",
			path: "/travelogues-list",
			component: TraveloguesList
		}
	]
});

if ( import.meta.env.MODE === "development" ) {
	([
		{
			name: "_styleguide",
			path: "/_styleguide",
			component: Styleguide
		},
		{
			name: "_playground",
			path: "/_playground",
			component: Playground
		}
	] satisfies RouteRecordRaw[])
		.forEach((route) => {
			router.addRoute(route);
		});
}

export { router };
