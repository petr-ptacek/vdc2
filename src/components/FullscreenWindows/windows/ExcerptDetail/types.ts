import type { NavHorizontalItem } from "@/components/NavHorizontal";
import type { Component }         from "vue";

export type NavItemData = {
	component: Component;
}

export type TabItem = NavHorizontalItem<NavItemData>;
