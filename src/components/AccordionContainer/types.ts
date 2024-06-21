export type AccordionContainerProps = {
	opened?: boolean;
	title?: string;
	headerClickable?: boolean;
}

export type AccordionContainerEmits = {
	"update:opened": [boolean];
}
