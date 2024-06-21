import type { CSSClassValue } from "@/types";

export type AccordionProps = {
	opened?: boolean;
	title?: string;
	headerClickable?: boolean;

	headerClass?: CSSClassValue;
	bodyClass?: CSSClassValue;
}

export type AccordionEmits = {
	"update:opened": [boolean];
}
