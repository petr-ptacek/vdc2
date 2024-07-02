import type { CSSClassValue } from "@/types";

export type FullscreenContainerProps = {
	opened?: boolean;
	classContent?: CSSClassValue;
}

export type FullscreenContainerEmits = {
	close: [];
	"update:opened": [boolean];
}
