import type { AppIconProps } from "@/components/AppIcon";

export type InputSearchbarProps = {
	modelValue?: string;
	prependIcon?: AppIconProps["name"];
	clearIcon?: AppIconProps["name"];
	placeholder?: string;
};

export type InputSearchbarEmits = {
	"update:modelValue": [string];
};
