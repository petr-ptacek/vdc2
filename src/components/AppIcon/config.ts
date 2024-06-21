import { type AsyncComponentLoader, type Component, defineAsyncComponent as f } from "vue";
import type { AppIconNames }                                                    from "./iconNames";

function parseKeyPath(path: string): AppIconNames {
	const sep = "/";
	const basePath = `${ sep }${ ["src", "assets", "img", "icons"].join(sep) }${ sep }`;
	const regExp = new RegExp(`^${ basePath }(.+)\\.svg$`);
	const [, iconName = null] = regExp.exec(path) ?? [];

	return iconName as AppIconNames;
}

export const iconComponentsMap = Object.fromEntries(
	Object.entries<() => Promise<Component>>(
		import.meta.glob(
			"@/assets/img/icons/**/*.svg",
			{ query: "component" }
		)
	).map(([path, module]) => {
		return [
			parseKeyPath(path),
			f(module)
		];
	})
) as Record<AppIconNames, AsyncComponentLoader>;

export const iconSizesMap = {
	xs: { width: "0.75rem", height: "0.75rem" },
	sm: { width: "1rem", height: "1rem" },
	md: { width: "1.25rem", height: "1.25rem" },
	lg: { width: "1.5rem", height: "1.5rem" },
	xl: { width: "1.75rem", height: "1.75rem" },
	"2xl": { width: "2rem", height: "2rem" },
	"3xl": { width: "2.25rem", height: "2.25rem" },
	"4xl": { width: "2.5rem", height: "2.5rem" },
	"5xl": { width: "2.75rem", height: "2.75rem" },
	big: { width: "3rem", height: "3rem" }
} as const;
