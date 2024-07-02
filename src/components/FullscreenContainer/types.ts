import type { CSSClassValue } from "@/types";

export type FullscreenContainerProps = {
	opened?: boolean;
	contentClass?: CSSClassValue;
}

export type FullscreenContainerEmits = {
	close: [];
	"update:opened": [boolean];
}
