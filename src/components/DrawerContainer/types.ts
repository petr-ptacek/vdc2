export type DrawerContainerDir = "top-to-bottom" | "left-to-right" | "right-to-left" | "bottom-to-top";

export type DrawerContainerProps = {
	opened?: boolean;
	dir?: DrawerContainerDir;
	size?: string | number;
}

export type DrawerContainerEmits = {
	"update:opened": [boolean]
}
