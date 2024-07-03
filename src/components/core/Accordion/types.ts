import type { CSSClassValue } from "@/types";

export type WAccordionProps = {
	opened?: boolean;
	title?: string;
	headerClickable?: boolean;

	headerClass?: CSSClassValue;
	bodyClass?: CSSClassValue;
}

export type WAccordionEmits = {
	"update:opened": [boolean];
}
