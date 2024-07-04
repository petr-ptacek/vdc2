import type { VNode } from "vue";

export type VueMultiselectProps = {
	modelValue?: any;
	value?: any;
	mode?: "single" | "multiple" | "tags";
	options?: any[] | object | Function;
	searchable?: boolean;
	valueProp?: string;
	trackBy?: string | string[];
	label?: string;
	placeholder?: string | null;
	multipleLabel?: any; // Function
	disabled?: boolean;
	max?: number;
	limit?: number;
	loading?: boolean;
	id?: string;
	caret?: boolean;
	maxHeight?: string | number;
	noOptionsText?: string | object;
	noResultsText?: string | object;
	canDeselect?: boolean;
	canClear?: boolean;
	clearOnSearch?: boolean;
	clearOnSelect?: boolean;
	delay?: number;
	filterResults?: boolean;
	minChars?: number;
	resolveOnLoad?: boolean;
	appendNewTag?: boolean;
	appendNewOption?: boolean;
	createTag?: boolean;
	createOption?: boolean;
	addTagOn?: string[];
	addOptionOn?: string[];
	hideSelected?: boolean;
	showOptions?: boolean;
	object?: boolean;
	required?: boolean;
	openDirection?: "top" | "bottom";
	nativeSupport?: boolean;
	classes?: object;
	strict?: boolean;
	closeOnSelect?: boolean;
	closeOnDeselect?: boolean;
	autocomplete?: string;
	groups?: boolean;
	groupLabel?: string;
	groupOptions?: string;
	groupHideEmpty?: boolean;
	groupSelect?: boolean;
	inputType?: string;
	attrs?: object;
	onCreate?: Function;
	searchStart?: boolean;
	reverse?: boolean;
	regex?: string | object;
	rtl?: boolean;
	infinite?: boolean;
	aria?: object;
	clearOnBlur?: boolean;
	locale?: string;
	fallbackLocale?: string;
	searchFilter?: Function;
	allowAbsent?: boolean;
	appendToBody?: boolean;
	closeOnScroll?: boolean;
	breakTags?: boolean;
	appendTo?: string;
}

export type VueMultiselectSlots = {
	placeholder: VNode[];
	afterlist: (props: { options: any[] }) => VNode[];
	beforelist: (props: { options: any[] }) => VNode[];
	multiplelabel: (props: { values: any[] | object }) => VNode[];
	singlelabel: (props: { value: any }) => VNode[];
	option: (props: {
		option: any,
		isSelected: (option: any) => boolean,
		isPointed: (option: any) => boolean,
		search: null | string
	}) => VNode[];
	grouplabel: (props: {
		group: any,
		isSelected: (option: any) => boolean,
		isPointed: (option: any) => boolean
	}) => VNode[];
	tag: (props: { option: any, handleTagRemove: (option: any, e: Event) => void, disabled: boolean, }) => VNode[];
	infinite: VNode[];
	nooptions: VNode[];
	noresults: VNode[];
	// caret: (props: { handleCaretClick: () => void, isOpen: boolean, }) => VNode[];
	// clear: (props: { clear: () => void }) => VNode[];
	spinner: VNode[];
}

export type WMultiselectProps = {
	value?: any;
	modelValue?: any;
	config?: Omit<VueMultiselectProps, "value" | "modelValue">
}

export type WMultiselectEmits = {
	// (eventName: "update:modelValue", value: any): object | void; defineModel() works
	(eventName: "change", value: any, instance: object): object | void;
	(eventName: "select", value: any, option: any, instance: object): object | void;
	(eventName: "deselect", value: any, option: any, instance: object): object | void;
	(eventName: "search-change", query: string, instance: object): object | void;
	(eventName: "tag", option: any, instance: object): object | void;
	(eventName: "option", option: any, instance: object): object | void;
	(eventName: "create", option: any, instance: object): object | void;
	(eventName: "paste", e: Event, instance: object): object | void;
	(eventName: "keydown", e: Event, instance: object): object | void;
	(eventName: "keyup", e: Event, instance: object): object | void;
	(eventName: "open", instance: object): object | void;
	(eventName: "close", instance: object): object | void;
	(eventName: "clear", instance: object): object | void;
	(eventName: "max", instance: object): object | void;
}
