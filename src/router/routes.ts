import HomeView                from "@/views/home/App.vue";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
	{
		name: "home",
		path: "",
		component: HomeView
	},
	{
		name: "about-project",
		path: "/about-project",
		component: () => import("@/views/aboutProject/App.vue")
	},
	{
		name: "travelogues-list",
		path: "/travelogues list",
		component: () => import("@/views/traveloguesList/App.vue")
	}
];

if ( import.meta.env.MODE === "development" ) {
	routes.push(
		{
			name: "_playground",
			path: "/playground",
			component: () => import("@/views/playground/App.vue")
		},
		{
			name: "_styleguide",
			path: "/styleguide",
			component: () => import("@/views/styleguide/App.vue")
		}
	);
}

export { routes };
