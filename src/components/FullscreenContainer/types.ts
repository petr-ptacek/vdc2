export type FullscreenContainerProps = {
	opened?: boolean;
}

export type FullscreenContainerEmits = {
	close: [];
	"update:opened": [boolean];
}
