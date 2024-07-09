import type { StyleValue } from "vue";

export type WResizerContainerProps = {
	widthRatios?: [number, number];
	minWidth?: number;
	contentBased?: boolean;
};

export type WResizerContainerEmit = {
	resize: [[number, number]]
}

export type Point = {
	x: number;
	y: number;
}

export type State = {
	minWidth: number;
	container: {
		el: HTMLDivElement | null;
	}
	widthRatios: [number, number]
	resizer: {
		position: Point,
		mouse: Point,
		style: StyleValue,
		dragging: boolean;
	},
	sections: {
		left: {
			style: StyleValue;
		},
		right: {
			style: StyleValue;
		}
	},
};
