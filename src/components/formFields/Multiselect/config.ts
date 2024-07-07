import type { VueMultiselectListeners } from "./types";

export const LISTENERS: Record<keyof VueMultiselectListeners, keyof VueMultiselectListeners> = {
	onClose: "onClose",
	onKeyup: "onKeyup",
	onChange: "onChange",
	// onCreate: "onCreate",
	onClear: "onClear",
	onDeselect: "onDeselect",
	onKeydown: "onKeydown",
	onMax: "onMax",
	onOpen: "onOpen",
	onPaste: "onPaste",
	onSearchChange: "onSearchChange",
	onSelect: "onSelect"
};
