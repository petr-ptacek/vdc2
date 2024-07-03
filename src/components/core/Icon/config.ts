import { type AsyncComponentLoader, type Component, defineAsyncComponent as f } from "vue";
import type { IconNames }                                                       from "./iconNames";

function parseKeyPath(path: string): IconNames {
	const sep = "/";
	const basePath = `${ sep }${ ["src", "assets", "img", "icons"].join(sep) }${ sep }`;
	const regExp = new RegExp(`^${ basePath }(.+)\\.svg$`);
	const [, iconName = null] = regExp.exec(path) ?? [];

	return iconName as IconNames;
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
) as Record<IconNames, AsyncComponentLoader>;

export const ICON_SIZES = {
	sm: { width: "2rem", height: "2rem" },
	md: { width: "2.2rem", height: "2.2rem" },
	regular: { width: "2.4rem", height: "2.4rem" },
	xl: { width: "2.6rem", height: "2.6rem" },
	"2xl": { width: "2.8rem", height: "2.8rem" }
} as const;
