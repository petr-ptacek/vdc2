import { type Directive, type DirectiveBinding } from "vue";

type TooltipDir = "top" | "right" | "bottom" | "left";

type TooltipMetaCtx = {
	binding: DirectiveBinding<BindingValue>;
	tooltipEl: HTMLElement;
	el: HTMLElement;
}

type BindingValue = {
	id: string;
	dir: TooltipDir;
	offset?: number;
}

type CalculatePositionParams = {
	el: HTMLElement;
	tooltip: HTMLElement;
	dir: TooltipDir;
	offset: number;
}

const ctxMap = new Map<HTMLElement, TooltipMetaCtx>;

function mouseEnterHandler(e: MouseEvent) {
	const ctx = ctxMap.get(e.target as HTMLElement);
	if ( !ctx ) return;

	const {
		tooltipEl,
		binding
	} = ctx;

	const el = e.target as HTMLElement;
	const dir = binding.value.dir ?? "top";
	const offset = binding.value.offset ?? 12;

	const pos = getTooltipPosition({
		el,
		tooltip: tooltipEl,
		dir,
		offset
	});

	tooltipEl.style.top = pos.top;
	tooltipEl.style.left = pos.left;
	tooltipEl.classList.add("is-active", classListByDir[dir]);
}

function mouseLeaveHandler(e: MouseEvent) {
	const ctx = ctxMap.get(e.target as HTMLElement);
	if ( !ctx ) return;

	const { tooltipEl } = ctx;
	tooltipEl.classList.remove("is-active");
}

function getTooltipEl(id: string) {
	const tooltipSelector = ".tooltip[data-tooltip-id=" + "\"" + `${ id }` + "\"]";
	return document.querySelector<HTMLElement>(
		tooltipSelector
	);
}

function getTooltipPosition({ tooltip, el, dir, offset }: CalculatePositionParams) {
	const tooltipRect = tooltip.getBoundingClientRect();
	const elRect = el.getBoundingClientRect();

	let top = elRect.top;
	let left = elRect.left;

	switch ( dir ) {
		case "top":
			top = elRect.top;
			top -= tooltipRect.height + offset;

			left = elRect.left;
			left -= ((tooltipRect.width - elRect.width) / 2);
			break;

		case "right":
			top = elRect.top;
			top -= ((tooltipRect.height - elRect.height) / 2);

			left = elRect.left;
			left += elRect.width + offset;
			break;

		case "bottom":
			top = elRect.bottom;
			top += offset;

			left = elRect.left;
			left -= ((tooltipRect.width - elRect.width) / 2);
			break;
		case "left":
			top = elRect.top;
			top -= ((tooltipRect.height - elRect.height) / 2);

			left = elRect.left;
			left -= tooltipRect.width + offset;
			break;
	}

	return {
		top: `${ top }px`,
		left: `${ left }px`
	};
}

const classListByDir = {
	"top": "tooltip--bottom",
	"right": "tooltip--left",
	"bottom": "tooltip--top",
	"left": "tooltip--right"
} as const;

export const tooltip: Directive<HTMLElement, BindingValue> = {
	mounted: (el, binding: DirectiveBinding<BindingValue>, _vnode, prevVNode) => {
		const tooltipEl = getTooltipEl(binding.value.id);
		if ( !tooltipEl ) return;

		ctxMap.set(el, {
			binding,
			el,
			tooltipEl
		});

		el.addEventListener("mouseenter", mouseEnterHandler);
		el.addEventListener("mouseleave", mouseLeaveHandler);
	},
	beforeUnmount: (el, binding) => {
		el.removeEventListener("mouseenter", mouseEnterHandler);
		el.removeEventListener("mouseleave", mouseLeaveHandler);

		const ctx = ctxMap.get(el);
		if ( !ctx ) return;

		ctx.tooltipEl.classList.remove("is-active");
		ctxMap.delete(el);
	}
};
