import { ICON_SIZES }         from "./config";
import type { IconNames }     from "./iconNames";
import type { CSSClassValue } from "@/types";

export type { IconNames };

export type IconSize =
	keyof typeof ICON_SIZES |
	[string, string] |
	[string] |
	{ width: string, height: string };

export type WIconProps = {
	name: IconNames;
	size?: IconSize;
	svgClass?: CSSClassValue;
}
