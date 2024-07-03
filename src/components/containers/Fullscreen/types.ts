import type { CSSClassValue } from "@/types";

export type WFullscreenContainerProps = {
	opened?: boolean;
	contentClass?: CSSClassValue;
}

export type WFullscreenContainerEmits = {
	close: [];
	"update:opened": [boolean];
}
