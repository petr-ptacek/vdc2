<script setup lang="ts">
import { WIcon }                                                                                             from "@/components";
import {
	WLoader
}                                                                                                            from "@/components/core/Loader";
import {
	useLoaderCounter,
	type UseLoaderCounterReturn,
	useVModelDebounced
}                                                                                                            from "@/composables";
import {
	getAspectRatioRect
}                                                                                                            from "@/utils";
import {
	useResizeObserver
}                                                                                                            from "@vueuse/core";
import {
	debounce
}                                                                                                            from "lodash-es";
import { computed, markRaw, nextTick, onUnmounted, reactive, type StyleValue, type UnwrapNestedRefs, watch } from "vue";
import {
	CanvasController
}                                                                                                            from "./CanvasController";
import type {
	WPagesStepperEmit,
	WPagesStepperExpose,
	WPagesStepperProps
}                                                                                                            from "./types";

type State = {
	rootEl: HTMLDivElement | null;
	loader: UnwrapNestedRefs<UseLoaderCounterReturn>;
	mainEl: HTMLDivElement | null;
	canvasEditable: boolean;
	canvasEditButtonActive: boolean;
	canvasController: CanvasController | null;
	canvasWrapperEl: HTMLDivElement | null;
	imgMeta: {
		error: boolean;
		img: null | HTMLImageElement;
		style: StyleValue;
		width: number;
		height: number;
	}
}

const props = defineProps<WPagesStepperProps>();
const emit = defineEmits<WPagesStepperEmit>();

const state: State = reactive({
	rootEl: null,
	mainEl: null,
	canvasEditButtonActive: false,
	canvasEditable: computed(() => {
		return props.editable && state.canvasEditButtonActive;
	}),
	canvasWrapperEl: null,
	canvasController: null,
	loader: useLoaderCounter(),
	imgMeta: {
		error: false,
		img: null,
		style: computed(() => {
			return {
				width: `${ state.imgMeta.width }px`,
				height: `${ state.imgMeta.height }px`
			};
		}),
		width: 0,
		height: 0
	}
});

const { modelValue: _modelValue } = useVModelDebounced(
	() => props.modelValue,
	"modelValue",
	emit,
	{ debounceTimeout: 1000 }
);

watch(
	() => props.imgSrc,
	async (src) => {
		if ( src ) {
			state.loader.show();

			state.canvasController?.hide();
			state.canvasController?.destroy();
			state.mainEl?.scroll({ top: 0 });

			state.imgMeta.error = false;
			state.imgMeta.img = await fetchImage(src);
			state.imgMeta.error = !state.imgMeta.img;

			if ( state.imgMeta.img ) {
				const { width, height } = compImageSize(state.imgMeta.img);

				if ( props.polygonsEnabled && state.canvasWrapperEl ) {
					await nextTick();
					state.canvasController?.destroy();
					state.canvasController = createCanvas(width, height);
				}
			}

			state.loader.hide();
		}
	},
	{ immediate: true }
);

watch(() => [props.polygonsEnabled, state.canvasWrapperEl], async () => {
	await nextTick();

	if ( !props.polygonsEnabled ) {
		state.canvasEditButtonActive = false;
		state.canvasController?.destroy();
		state.canvasController = null;
	}

	if ( props.polygonsEnabled && state.canvasWrapperEl ) {
		state.canvasEditButtonActive = true;
		state.canvasController = createCanvas();
	}
});

const onResizeHandler = debounce(() => {
	if ( state.imgMeta.img ) {
		const { width, height } = compImageSize(state.imgMeta.img);
		state.canvasController?.fitStageInto({ width, height });
	}
}, 300);

onUnmounted(() => {
	onResizeHandler.cancel();
});

useResizeObserver(
	() => state.rootEl,
	(entries, _observer) => {
		onResizeHandler();
	},
	{ box: "border-box" }
);

defineExpose<WPagesStepperExpose>({
	loaderShow: () => {
		state.loader.show();
	},
	loaderHide: () => {
		state.loader.hide();
	}
});

function compImageSize(img: HTMLImageElement): { width: number; height: number; } {
	const wrapperWidth = state.mainEl?.clientWidth ?? 0;

	const { width, height } = getAspectRatioRect({
		base: "width",
		origWidth: img.naturalWidth,
		origHeight: img.naturalHeight,
		width: wrapperWidth
	});

	state.imgMeta.height = height;
	state.imgMeta.width = width;

	return {
		width,
		height
	};
}

function createCanvas(
	width: number = state.imgMeta.width,
	height: number = state.imgMeta.height
): CanvasController {
	return markRaw(new CanvasController({
		container: state.canvasWrapperEl!,
		editable: state.canvasEditable,
		rectConfig: props.polygonConfig,
		width,
		height,
		data: props.polygons ?? [],
		onChange: ({ data }) => {
			emit("update:polygons", data);
		}
	}));
}

function inputInputHandler(event: Event) {
	const element = (event.target as HTMLInputElement);
	const value = element.value;

	if ( !/\d+/.test(value) ) {
		element.value = "";
		return;
	}

	if ( +value < props.min ) {
		_modelValue.value = props.min;
		element.value = props.min.toString();
		return;
	}

	if ( +value > props.max ) {
		_modelValue.value = props.max;
		element.value = props.max.toString();
		return;
	}

	_modelValue.value = +value;
}

function inputFocusHandler(e: Event) {
	const element = (e.target as HTMLInputElement);
	element.select();
}

function inputBlurHandler(e: Event) {
	const element = (e.target as HTMLInputElement);
	const value = element.value;

	if ( !value || !/\d+/.test(value) || +value === 0 ) {
		element.value = props.min.toString();
		_modelValue.value = props.min;
	}
}

function toggleCanvasEditable() {
	state.canvasEditButtonActive = !state.canvasEditButtonActive;
	state.canvasController?.makeEditable(state.canvasEditable);
}

function goPrevHandler() {
	emit("update:modelValue", props.modelValue - 1);
}

function fetchImage(src: string): Promise<HTMLImageElement | null> {
	return new Promise((resolve, _reject) => {
		const img = new Image();

		img.onload = () => {
			resolve(img);
		};

		img.onerror = () => {
			resolve(null);
		};

		img.src = src;

		if ( img.complete ) {
			img.onload = null;
			img.onerror = null;
			resolve(img);
		}
	});
}

function goNextHandler() {
	emit("update:modelValue", props.modelValue + 1);
}

function addHandler() {
	emit("add");
}
</script>

<template>
	<div class="pages-stepper" :ref="(el: any) => state.rootEl = el">
		<div class="pages-stepper__content">
			<div
				v-if="!state.imgMeta.error && messageVisible"
				class="pages-stepper__message"
			>
				<slot name="message" :message="message">
					<span class="bold fs-16">{{ message }}</span>
				</slot>
			</div>

			<div
				v-if="state.imgMeta.error"
				class="pages-stepper__message"
			>
				<span class="bold fs-16">Nedostupný zdroj stránky</span>
			</div>

			<WLoader
				:visible="state.loader.visible"
			/>

			<div
				class="pages-stepper__main"
				:ref="(el: any) => state.mainEl = el"
			>
				<div
					v-if="state.imgMeta.img"
					class="pages-stepper__img-wrapper"
					:style="state.imgMeta.style"
				>
					<div
						v-if="polygonsEnabled"
						data-canvas-wrapper
						:ref="(el: any) => state.canvasWrapperEl = el">
					</div>
					<img
						:key="state.imgMeta.img.src"
						:width="state.imgMeta.width"
						:height="state.imgMeta.height"
						class="pages-stepper__img"
						:src="state.imgMeta.img.src"
						:alt="imgAlt ?? ''"
					>
				</div>
			</div>

			<div class="pages-stepper__toolbar" v-if="!hideToolbar">
				<button
					data-btn-prev
					:disabled="disabledPrevBtn || modelValue - 1 < min"
					class="btn btn--tertiary"
					@click="goPrevHandler"
				>
					<WIcon name="chevron-left" size="xl" />
				</button>

				<div class="wrapper">
					<slot
						v-if="!hideAddBtn"
						name="button-add"
						:click="addHandler"
					>
						<button
							data-btn-add
							class="btn"
						>
							<WIcon name="plus-circle" />
						</button>
					</slot>

					<div>
						<div class="input-wrapper">
							<input
								:value="_modelValue"
								:min="min"
								:max="max"
								type="number"
								@input="inputInputHandler"
								@focus="inputFocusHandler"
								@blur="inputBlurHandler"
							>
							&nbsp;
							<div>/</div>
							&nbsp;
							<div>{{ max }}</div>
						</div>
					</div>

					<button
						v-if="editable"
						data-btn-toggle-canvas
						class="btn"
						@click="toggleCanvasEditable"
						:class="{ 'is-active': state.canvasEditButtonActive }"
					>
						<WIcon name="pencil" />
					</button>
				</div>

				<button
					data-btn-next
					:disabled="disabledNextBtn || modelValue + 1 > max"
					class="btn btn--tertiary"
					@click="goNextHandler"
				>
					<WIcon name="chevron-right" size="xl" />
				</button>
			</div>
		</div>
	</div>
</template>
