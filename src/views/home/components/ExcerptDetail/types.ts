import type { NavHorizontalItem } from "@/components";
import type { Component }         from "vue";

export type NavItemData = {
	component: Component;
}

export type TabItem = NavHorizontalItem<NavItemData>;
