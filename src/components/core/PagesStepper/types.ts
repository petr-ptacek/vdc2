import type Konva from "konva";

export type OnChangeCtx = {
	data: CanvasRectConfigSerialized[];
}

export type CanvasRectConfigSerialized = Required<Pick<Konva.RectConfig,
	"height" |
	"width" |
	"x" |
	"y" |
	"scaleX" |
	"scaleY"
>>

export type CanvasInitOptions = {
	data: CanvasRectConfigSerialized[];
}

export type WPagesStepperProps = {
	modelValue: number;
	min: number;
	max: number;
	imgSrc: string | null;
	imgAlt: string | null;
	polygons?: CanvasRectConfigSerialized[];
	polygonsEnabled?: boolean;
	polygonConfig?: import("./CanvasController.ts").Options["rectConfig"];
	editable?: boolean;
	messageVisible?: boolean;
	message?: string;
	disabledPrevBtn?: boolean;
	disabledNextBtn?: boolean;
	hideAddBtn?: boolean;
	hideToolbar?: boolean;
}

export type WPagesStepperEmit = {
	goPrev: [];
	goNext: [];
	add: [];
	"update:modelValue": [number];
	"update:polygons": [CanvasRectConfigSerialized[]];
}

export type WPagesStepperExpose = {
	loaderShow: () => void;
	loaderHide: () => void;
}
