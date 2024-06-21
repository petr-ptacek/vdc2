import { iconSizesMap }       from "@/components/AppIcon/config";
import type { AppIconNames }  from "@/components/AppIcon/iconNames";
import type { CSSClassValue } from "@/types";

export type { AppIconNames };

export type AppIconSizes =
	keyof typeof iconSizesMap |
	[string, string] |
	[string] |
	{ width: string, height: string };

export type AppIconProps = {
	name: AppIconNames;
	size?: AppIconSizes;
	svgClass?: CSSClassValue;
}
