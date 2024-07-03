export type WDrawerContainerDir =
	"top-to-bottom" |
	"left-to-right" |
	"right-to-left" |
	"bottom-to-top";

export type WDrawerContainerProps = {
	opened?: boolean;
	dir?: WDrawerContainerDir;
	size?: string | number;
	disableOpenButton?: boolean;
	disableResizerLine?: boolean;
}

export type WDrawerContainerEmits = {
	"update:opened": [boolean]
}
