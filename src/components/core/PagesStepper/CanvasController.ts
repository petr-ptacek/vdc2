import Konva from "konva";
import type {
	CanvasInitOptions,
	CanvasRectConfigSerialized,
	OnChangeCtx
}            from "./types";

export type Options = {
	container: HTMLDivElement;
	onChange?: (ctx: OnChangeCtx) => void;
	editable?: boolean;
	data?: CanvasRectConfigSerialized[];
	width?: number;
	height?: number;
	rectConfig?: Partial<Konva.RectConfig>;
}

function toPercentageValue(base: number, value: number): number {
	return value / Math.max(base / 100, 1);
}

function toRealValue(base: number, percentageValue: number): number {
	return (percentageValue / 100) * base;
}

export class CanvasController {

	stage: Konva.Stage;
	layer: Konva.Layer;
	transformer: Konva.Transformer;
	createdRect: Konva.Rect | null;
	selectedRect: Konva.Rect | null;
	rectangles: Konva.Rect[];
	ctxMenuEl: HTMLDivElement;
	editable: boolean;

	readonly options: Options;

	readonly SCENE_HEIGHT: number;
	readonly SCENE_WIDTH: number;

	readonly #_onStageMousemove: (e: Konva.KonvaEventObject<MouseEvent>) => void;
	readonly #_onStageMouseup: (e: Konva.KonvaEventObject<MouseEvent>) => void;
	readonly #_onStageMousedown: (e: Konva.KonvaEventObject<MouseEvent>) => void;
	readonly #_hideCtxMenu: () => void;

	constructor(options: Options) {
		this.options = options;
		this.stage = new Konva.Stage({
			container: options.container,
			width: options.width ?? options.container.offsetWidth,
			height: options.height ?? options.container.offsetHeight
		});

		this.editable = options.editable ?? false;

		this.SCENE_WIDTH = this.stage.width();
		this.SCENE_HEIGHT = this.stage.height();

		this.layer = new Konva.Layer();

		this.transformer = new Konva.Transformer({
			visible: false,
			rotateEnabled: false
		});

		this.ctxMenuEl = this.#createCtxMenu();

		this.createdRect = null;
		this.selectedRect = null;
		this.rectangles = [];

		// Handlers
		this.#_onStageMousedown = this.#onStageMousedown.bind(this);
		this.#_onStageMousemove = this.#onStageMousemove.bind(this);
		this.#_onStageMouseup = this.#onStageMouseup.bind(this);
		this.#_hideCtxMenu = this.#hideCtxMenu.bind(this);

		this.stage.add(this.layer);
		this.layer.add(this.transformer);

		this.init({
			data: options.data ?? []
		});
	}

	init(options: CanvasInitOptions) {
		// RECTS
		options.data.forEach(config => {
			const rect = this.#createRect(this.#deserializeRectConfig(config));
			this.layer.add(rect);
			this.rectangles.push(rect);
		});

		this.fitStageInto();

		// CTX MENU
		this.stage.container().append(this.ctxMenuEl);

		// LISTENERS
		if ( this.editable ) {
			this.stage.on("mousedown", this.#_onStageMousedown);
			window.addEventListener("click", this.#_hideCtxMenu);
		}
	}

	makeEditable(editable: boolean) {
		this.editable = editable;
		this.rectangles.forEach(rect => {
			rect.draggable(editable);
		});

		if ( editable ) {
			this.stage.on("mousedown", this.#_onStageMousedown);
			window.addEventListener("click", this.#_hideCtxMenu);
		} else {
			this.selectedRect = null;
			this.transformer.nodes([]);
			this.transformer.visible(false);

			this.stage.off("mousedown", this.#_onStageMousedown);
			window.removeEventListener("click", this.#_hideCtxMenu);
		}
	}

	destroy() {
		this.selectedRect = null;
		this.createdRect = null;

		this.transformer.nodes([]);
		this.transformer.visible(false);

		this.rectangles.forEach(r => r.destroy());
		this.rectangles = [];
		this.stage.draw();

		this.stage.off("mousedown", this.#_onStageMousedown);
		window.removeEventListener("click", this.#_hideCtxMenu);
	}

	hide() {
		this.stage.hide();
	}

	show() {
		this.stage.show();
	}

	serialize(): CanvasRectConfigSerialized[] {
		return this.rectangles.map(this.#serializeRect.bind(this));
	}

	#deserializeRectConfig(config: CanvasRectConfigSerialized): Partial<Konva.RectConfig> {
		const stageWidth = this.stage.width();
		const stageHeight = this.stage.height();

		let x = toRealValue(stageWidth, config.x);
		let y = toRealValue(stageHeight, config.y);
		let width = toRealValue(stageWidth, config.width);
		let height = toRealValue(stageHeight, config.height);
		let scaleX = config.scaleX;
		let scaleY = config.scaleY;

		return {
			x,
			y,
			width,
			height,
			scaleX,
			scaleY
		};
	}

	#serializeRect(rect: Konva.Rect): CanvasRectConfigSerialized {
		const stageWidth = this.stage.width();
		const stageHeight = this.stage.height();

		let x = toPercentageValue(stageWidth, rect.x());
		let y = toPercentageValue(stageHeight, rect.y());
		let width = toPercentageValue(stageWidth, rect.width());
		let height = toPercentageValue(stageHeight, rect.height());
		let scaleX = rect.scaleX();
		let scaleY = rect.scaleY();

		return {
			x,
			y,
			width,
			height,
			scaleY,
			scaleX
		};
	}

	// fitStageIntoParentContainer() {
	//   const container = this.stage.container().parentElement as HTMLDivElement;
	//   this.stage.width(container.offsetWidth);
	//   this.stage.height(container.offsetHeight);
	// }

	fitStageInto(params?: { width: number, height: number }) {
		const container = this.stage.container().parentElement as HTMLDivElement;

		const containerWidth = params?.width ?? container.offsetWidth;
		const containerHeight = params?.height ?? container.offsetHeight;

		const scaleX = containerWidth / this.SCENE_WIDTH;
		const scaleY = containerHeight / this.SCENE_HEIGHT;

		this.stage.width(Math.ceil(this.SCENE_WIDTH * scaleX));
		this.stage.height(Math.ceil(this.SCENE_HEIGHT * scaleY));

		this.stage.scale({ x: scaleX, y: scaleY });
	}

	#onStageMousedown(e: Konva.KonvaEventObject<MouseEvent>) {
		if ( e.target === this.stage ) {
			this.transformer.visible(false);
			this.createdRect = this.#createRect({
				x: this.#getPointerPositionScaled().x,
				y: this.#getPointerPositionScaled().y,
				width: 0,
				height: 0
			});

			this.layer.add(this.createdRect);
			this.createdRect.moveToTop();
			this.stage.on("mousemove", this.#_onStageMousemove);
			this.stage.on("mouseup", this.#_onStageMouseup);
		}
	}

	#onStageMousemove(e: Konva.KonvaEventObject<MouseEvent>) {
		const pointer = this.#getPointerPositionScaled();

		if ( pointer && this.createdRect ) {
			const pos = this.createdRect.position();
			const dx = pointer.x - pos.x;
			const dy = pointer.y - pos.y;

			this.createdRect.width(dx);
			this.createdRect.height(dy);
		}
	}

	#onStageMouseup(e: Konva.KonvaEventObject<MouseEvent>) {
		if ( !this.createdRect ) return;

		this.stage.off("mouseup", this.#_onStageMouseup);
		this.stage.off("mousemove", this.#_onStageMousemove);

		if ( this.createdRect.width() < 0 ) {
			this.createdRect.x(this.createdRect.x() + this.createdRect.width());
			this.createdRect.width(Math.abs(this.createdRect.width()));
		}

		if ( this.createdRect.height() < 0 ) {
			this.createdRect.y(this.createdRect.y() + this.createdRect.height());
			this.createdRect.height(Math.abs(this.createdRect.height()));
		}

		if ( this.createdRect.width() < 3 || this.createdRect.height() < 3 ) {
			this.createdRect.destroy();
		} else {
			this.createdRect.strokeEnabled(false);
			this.rectangles.push(this.createdRect);
			this.#onChange();
		}

		this.createdRect = null;
	}

	#onChange() {
		this.options.onChange?.({ data: this.serialize() });
	}

	#createRect(config: Konva.RectConfig) {
		const rect = new Konva.Rect({
			name: "rect",
			x: config.x,
			y: config.y,
			fill: this.options.rectConfig?.fill ?? "rgba(255,255,1,0.15)",
			scaleX: config.scaleX ?? 1,
			scaleY: config.scaleY ?? 1,
			draggable: config.draggable ?? this.editable,
			width: config.width ?? 0,
			height: config.height ?? 0,
			stroke: this.options.rectConfig?.stroke ?? "rgb(217,78,18)",
			strokeWidth: 1,
			strokeEnabled: false
		});

		rect.on("dragmove", (e: Konva.KonvaEventObject<DragEvent>) => {
			const stageSize = this.stage.size();
			const pos = rect.position();
			const scale = rect.scale() ?? { x: 0, y: 0 };
			const width = (rect.width() * scale.x) + (rect.strokeWidth() * 2);
			const height = (rect.height() * scale.y) + (rect.strokeWidth() * 2);
			const offset = 2;
			// console.log(`stage: ${ stageSize.width } ${ stageSize.height }`);
			// console.log(`y ${ pos.y }, h: ${ height }`);

			if ( pos.x - rect.strokeWidth() < 0 ) {
				rect.x(rect.strokeWidth() + offset);
			}

			if ( pos.y - rect.strokeWidth() < 0 ) {
				rect.y(rect.strokeWidth() + offset);
			}

			// if ( pos.x + width > stageSize.width ) {
			//   rect.x(stageSize.width - width - offset);
			// }
			//
			// if ( pos.y + height > stageSize.height ) {
			//   rect.y(stageSize.height - height - offset);
			// }

			// console.log(`[x,y]: [${ rect.x() }, ${ rect.y() }]`);
			// console.log(`[strokeWidth]: [${ rect.strokeWidth() }]`);
			// console.log(`[w,h]: [${ rect.width() }, ${ rect.height() }]`);
			// console.log(`[sX,sY]: [${ rect.scaleX() }, ${ rect.scaleY() }]`);
		});

		rect.on("dragend", () => {
			if ( !this.editable ) return;
			this.#onChange();
		});

		rect.on("transformend", () => {
			if ( !this.editable ) return;
			this.#onChange();
		});

		rect.on("mouseenter", () => {
			if ( this.createdRect || !this.editable ) return;
			rect.moveToTop();
			rect.strokeEnabled(true);

			if ( this.transformer.nodes().includes(rect) ) {
				this.transformer.moveToTop();
			}
		});

		rect.on("mouseleave", () => {
			if ( this.createdRect || !this.editable ) return;
			rect.strokeEnabled(false);
		});

		rect.on("click", () => {
			if ( !this.editable ) return;
			this.selectedRect = rect;
			const { transformer } = this;

			if ( transformer.nodes().includes(rect) && transformer.visible() ) {
				transformer.visible(false);
				transformer.nodes([]);
			} else {
				transformer.moveToTop();
				transformer.nodes([rect]);
				transformer.visible(true);
			}
		});

		rect.on("contextmenu", (e: Konva.KonvaEventObject<MouseEvent>) => {
			if ( !this.editable ) return;

			e.evt.preventDefault();
			this.selectedRect = rect;
			const pos = this.stage.getPointerPosition();
			pos && this.#showCtxMenu(pos);
		});

		return rect;
	}

	#hideCtxMenu() {
		this.ctxMenuEl.style.display = "none";
	}

	#showCtxMenu(point: Konva.Vector2d) {
		this.ctxMenuEl.style.display = "initial";
		this.ctxMenuEl.style.top = `${ point.y + 4 }px`;
		this.ctxMenuEl.style.left = `${ point.x + 4 }px`;
	}

	#getPointerPositionScaled(): Konva.Vector2d {
		const pos = this.stage.getPointerPosition() ?? { x: 0, y: 0 };
		const scale = this.stage.scale() ?? { x: 1, y: 1 };

		return {
			x: pos.x / scale.x,
			y: pos.y / scale.y
		};
	}

	#createCtxMenu() {
		const root = document.createElement("div");
		root.style.display = "none";
		root.className = "canvas-ctx-menu";

		const buttonDelete = document.createElement("button");
		buttonDelete.innerText = "Smazat";
		root.append(buttonDelete);

		buttonDelete.addEventListener("click", () => {
			if ( this.selectedRect ) {
				this.transformer.nodes([]);
				this.transformer.visible(false);
				this.rectangles = this.rectangles.filter(r => r !== this.selectedRect);
				this.selectedRect.destroy();
				this.selectedRect = null;
				this.#onChange();
			}
		});

		return root;
	}
}
