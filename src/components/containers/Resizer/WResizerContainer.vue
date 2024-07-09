<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, watch }         from "vue";
import type { WResizerContainerEmit, WResizerContainerProps, State } from "./types";

const props = withDefaults(
	defineProps<WResizerContainerProps>(),
	{
		widthRatios: () => [50, 50]
	}
);
const emit = defineEmits<WResizerContainerEmit>();

const state: State = reactive({
	container: {
		el: null
	},
	minWidth: 0,
	widthRatios: props.widthRatios,
	resizer: {
		dragging: false,
		position: {
			x: -100_000,
			y: 0
		},
		mouse: { x: 0, y: 0 },
		style: computed(() => {
			const { x, y } = state.resizer.position;

			return {
				left: `${ x }px`,
				top: `${ y }px`
			};
		})
	},
	sections: {
		left: {
			style: computed(() => {
				return {
					width: `${ state.widthRatios[0] }%`
				};
			})
		},
		right: {
			style: computed(() => {
				return {
					width: `${ state.widthRatios[1] }%`
				};
			})
		}
	}
});

watch(
	() => state.resizer.position.x,
	(x) => {
		const containerWidth = state.container.el?.clientWidth ?? 0;
		const left = x / (containerWidth / 100);

		state.widthRatios = [left, 100 - left];
	}
);

watch(state.widthRatios, (ratios) => {
	emit("resize", ratios);
});

onMounted(() => {
	initResizerPosition();
	window.addEventListener("resize", onWindowResize);
});

onUnmounted(() => {
	window.removeEventListener("resize", onWindowResize);
});

function initResizerPosition() {
	const containerWidth = state.container.el?.clientWidth ?? 0;
	state.resizer.position.x = containerWidth * (state.widthRatios[0] / 100);
}

function onWindowResize() {
	initResizerPosition();
}

function onResizerMousedown(e: MouseEvent) {
	state.resizer.dragging = true;
	state.resizer.mouse.x = e.clientX;

	window.addEventListener("mousemove", onWindowMouseMove);
	window.addEventListener("mouseup", onWindowMouseUp);
}

function onWindowMouseMove(e: MouseEvent) {
	if ( !state.resizer.dragging ) return;

	const diffX = e.clientX - state.resizer.mouse.x;

	if (
		(state.resizer.position.x + diffX >= state.minWidth) &&
		(state.resizer.position.x + diffX <= (state.container.el?.clientWidth ?? 0) - state.minWidth)
	) {
		state.resizer.position.x += diffX;
	}

	state.resizer.mouse.x = e.clientX;
}

function onWindowMouseUp(_e: MouseEvent) {
	state.resizer.dragging = false;
	state.resizer.mouse.x = 0;

	window.removeEventListener("mousemove", onWindowMouseMove);
	window.removeEventListener("mouseup", onWindowMouseUp);
}
</script>

<template>
	<div
		class="resizer-container"
		:ref="(el: any) => state.container.el = el"
	>
		<!--  LEFT  -->
		<div
			class="resizer-container__section"
			:style="state.sections.left.style"
		>
			<div class="resizer-container__section-content">
				<slot name="left" />
			</div>
		</div>

		<!-- RESIZER -->
		<div
			class="resizer-container__resizer"
			:style="state.resizer.style"
		>
			<div class="resizer-container__resizer-content">
				<div
					class="resizer-container__resizer-handler"
					draggable="true"
					@drag.prevent
					@dragstart.prevent
					@dragend.prevent
					@mousedown="onResizerMousedown"
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 88">
						<g filter="url(#a)">
							<rect width="20" height="72" x="8" y="8" fill="#fff" rx="10" />
						</g>
						<path fill="#D9D9D9" d="M13 36h2v16h-2zM17 36h2v16h-2zM21 36h2v16h-2z" />
						<defs>
							<filter
								id="a"
								width="36"
								height="88"
								x="0"
								y="0"
								color-interpolation-filters="sRGB"
								filterUnits="userSpaceOnUse">
								<feFlood flood-opacity="0" result="BackgroundImageFix" />
								<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
								<feOffset />
								<feGaussianBlur stdDeviation="4" />
								<feComposite in2="hardAlpha" operator="out" />
								<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
								<feBlend in2="BackgroundImageFix" result="effect1_dropShadow_540_1143" />
								<feBlend in="SourceGraphic" in2="effect1_dropShadow_540_1143" result="shape" />
							</filter>
						</defs>
					</svg>
				</div>
			</div>
		</div>

		<!--  RIGHT  -->
		<div
			class="resizer-container__section resizer-container__section--right"
			:style="state.sections.right.style"
		>

			<div class="resizer-container__section-content">
				<slot name="right" />
			</div>
		</div>
	</div>
</template>
