import type { UseIntersectionObserverOptions } from "@vueuse/core";

export type WCardPageProps = {
	imgSrc: string;
	imgLabel?: string;
	selected: boolean;
	nth: number;
	intersectionObserverOptions?: UseIntersectionObserverOptions;
}

export type WCardPageEmit = {
	select: [boolean];
	click: [MouseEvent];
}
