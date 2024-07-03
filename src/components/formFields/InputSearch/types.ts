import type { WIconProps } from "src/components/core/Icon";

export type WInputSearchProps = {
	modelValue?: string;
	prependIcon?: WIconProps["name"];
	clearIcon?: WIconProps["name"];
	placeholder?: string;
};

export type WInputSearchEmits = {
	"update:modelValue": [string];
};
