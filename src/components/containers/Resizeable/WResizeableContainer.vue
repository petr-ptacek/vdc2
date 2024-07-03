<script setup lang="ts">
import { useDebounceFn, useElementSize, useResizeObserver }                                              from "@vueuse/core";
import { computed, ref, watch }                                                                          from "vue";
import type { RatioValue, SectionID, StatusValue, WResizeableContainerEmits, WResizeableContainerProps } from "./types";
import { getPositionRelativeTo, getValueFromPercentage, toPercentageValue }                              from "./utils";

defineSlots<{
	contentLeft(): void;
	contentRight(): void;
}>();

const props = withDefaults(
	defineProps<WResizeableContainerProps>(),
	{
		status: undefined,
		lockedSection: "right",
		behaviour: "default",
		disableButtons: false,
		ratioPercentage: undefined
	}
);

const emit = defineEmits<WResizeableContainerEmits>();

const sectionLeftElement = ref<HTMLElement | null>(null);
const sectionRightElement = ref<HTMLElement | null>(null);

const configurableSectionID = computed<SectionID>(() => {
	return props.lockedSection === "left" ? "right" : "left";
});
const configurableSectionWidth = ref(0);
const configurableSectionElement = computed<HTMLElement | null>(() => {
	return props.lockedSection === "left" ?
				 sectionRightElement.value :
				 sectionLeftElement.value;
});

const containerElement = ref<HTMLElement | null>(null);
const containerElementSize = useElementSize(containerElement);

const splitterElement = ref<HTMLElement | null>(null);
const splitterElementSize = useElementSize(splitterElement);
const splitterInnerElement = ref<HTMLElement | null>(null);

const splitterMouseOffset = ref({
	x: 0, y: 0
});

const mousedownPosition = ref({
	x: 0, y: 0
});

/*RATIO*/

const _ratioValue = ref<RatioValue>([50, 50]);
const _ratioModelValue = computed<RatioValue>({
	get() {
		return typeof props.ratioPercentage === "undefined" ?
					 _ratioValue.value :
					 props.ratioPercentage;
	},
	set(value) {
		if ( typeof props.ratioPercentage === "undefined" ) {
			_ratioValue.value = value;
		} else {
			emit("update:ratioPercentage", value);
		}
	}
});

/*STATE*/

const _statusValue = ref<StatusValue>("default");
const _statusModelValue = computed<StatusValue>({
	get() {
		return typeof props.status === "undefined" ?
					 _statusValue.value :
					 props.status;
	},
	set(value: StatusValue) {
		if ( typeof props.status === "undefined" ) {
			_statusValue.value = value;
		} else {
			emit("update:status", value);
		}

		emit("changeState", value);
	}
});

const isResizing = ref(false);
const isCollapsed = computed(() => {
	return _statusValue.value === "collapsed";
});
const isExpanded = computed(() => {
	return _statusValue.value === "expanded";
});

const onWindowMousemoveDebounced = useDebounceFn(onWindowMousemove, 0);

useResizeObserver(containerElement, () => {
	const w = props.lockedSection === "left" ?
						_ratioModelValue.value[1] :
						_ratioModelValue.value[0];

	if ( w !== configurableSectionWidth.value ) {
		setSectionWidth(
			getValueFromPercentage(
				containerElementSize.width.value,
				w
			)
		);
	}
});

watch(() => _ratioModelValue.value, () => {
	if ( containerElementSize.width.value === 0 ) return;

	const w = getValueFromPercentage(
		containerElementSize.width.value,
		getRatioNthValue(configurableSectionID.value)
	);

	if ( w !== configurableSectionWidth.value ) {
		setSectionWidth(w);
	}
});

function setRatioNthValue(sectionID: SectionID, value: number) {
	const t = [..._ratioModelValue.value] as RatioValue;
	t[sectionID === "left" ? 0 : 1] = value;
	_ratioModelValue.value = t;
}

function getRatioNthValue(sectionID: SectionID) {
	return _ratioModelValue.value[sectionID === "left" ? 0 : 1];
}

function onSplitterMousedown(e: MouseEvent) {
	if (
		isCollapsed.value ||
		isExpanded.value ||
		e.button !== 0 ||
		e.composedPath().some(
			e => e instanceof HTMLButtonElement
		)
	) return;

	isResizing.value = true;
	mousedownPosition.value = {
		x: e.clientX,
		y: e.clientY
	};
	splitterMouseOffset.value = getPositionRelativeTo(e, splitterElement.value!);

	window.addEventListener("mousemove", onWindowMousemoveDebounced);
	window.addEventListener("mouseup", onWindowMouseup);
}

function setSectionWidth(width: number) {
	let w = width;

	if ( width < 0 ) w = 0;
	else if ( width > containerElementSize.width.value - splitterElementSize.width.value ) {
		w = containerElementSize.width.value - splitterElementSize.width.value;
	}

	configurableSectionElement.value?.style.setProperty(
		"flex-basis", `${ w }px`
	);
	configurableSectionWidth.value = w;

	setRatioNthValue(
		configurableSectionID.value,
		toPercentageValue(
			containerElementSize.width.value,
			w
		)
	);
}

function onWindowMousemove(e: MouseEvent) {
	if ( !isResizing.value ) return;

	const { x } = getPositionRelativeTo(e, containerElement.value!);
	let w = configurableSectionWidth.value;

	switch ( configurableSectionID.value ) {
		case "left":
			w = x;
			w -= splitterMouseOffset.value.x;
			break;
		case "right":
			w = containerElementSize.width.value - x;
			w -= splitterElementSize.width.value;
			w += splitterMouseOffset.value.x;
			break;
	}

	if ( w !== configurableSectionWidth.value ) {
		setSectionWidth(w);
	}
}

function onWindowMouseup(_e: MouseEvent) {
	isResizing.value = false;
	splitterMouseOffset.value = { x: 0, y: 0 };
	mousedownPosition.value = { x: 0, y: 0 };
	window.removeEventListener("mousemove", onWindowMousemoveDebounced, { capture: true });
	window.removeEventListener("mouseup", onWindowMouseup);
}

function toggleCollapse(collapse = !isCollapsed.value) {
	if ( collapse ) {
		_statusModelValue.value = "collapsed";
	} else {
		_statusModelValue.value = "default";
	}
}

function toggleExpand(expand = !isExpanded.value) {
	if ( expand ) {
		_statusModelValue.value = "expanded";
	} else {
		_statusModelValue.value = "default";
	}
}
</script>

<template>
	<div
		class="resizeable-container"
		:data-section-locked="lockedSection"
		:data-section-configurable="configurableSectionID"
		:data-behaviour="behaviour"
		ref="containerElement"
		:class="{
			'is-resizing': isResizing,
			'is-collapsed': isCollapsed,
			'is-expanded': isExpanded
		}"
	>
		<div
			data-section-id="left"
			class="resizeable-container__section"
			ref="sectionLeftElement"
		>
			<slot name="contentLeft" />
		</div>

		<div
			class="splitter"
			ref="splitterElement"
		>
			<div
				class="splitter__inner"
				ref="splitterInnerElement"
				@mousedown="onSplitterMousedown"
			>
				<div class="splitter-buttons">
					<button
						class="splitter-button"
						data-action="collapse"
						@click="toggleCollapse()"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
							<path
								fill-rule="evenodd"
								d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
								clip-rule="evenodd" />
						</svg>
					</button>

					<button
						class="splitter-button"
						data-action="expand"
						@click="toggleExpand()"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-full w-full">
							<path
								fill-rule="evenodd"
								d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
								clip-rule="evenodd" />
						</svg>
					</button>
				</div>
			</div>
		</div>

		<div
			data-section-id="right"
			class="resizeable-container__section"
			ref="sectionRightElement"
		>
			<slot name="contentRight" />
		</div>
	</div>
</template>

<style lang="postcss">
.resizeable-container {
	/*--section-left-width: 400px;*/
	/*--section-right-width: auto;*/

	--splitter-buttons-offset-top: 50%;

	--splitter-width: 0.5rem;
	--splitter-active-width: var(--splitter-width);

	--splitter-color: #d1d5db;
	--splitter-active-color: #9ca3af;

	--splittter-offset: calc(-1 * (var(--splitter-active-width) - var(--splitter-width)) / 2);

	--button-size: 3.4rem;
	--button-color: white;
	--button-active-color: white;
	--button-bg: white;
	--button-active-bg: var(--splitter-active-color);

	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	flex-flow: row nowrap;

	& > .resizeable-container__section {
		flex: 1 1 auto;
		overflow: hidden;
		z-index: 1;
		position: relative;
	}

	&[data-section-configurable="left"] {
		& > .resizeable-container__section[data-section-id="left"] {
			flex: 0 0 auto;
		}
	}

	&[data-section-configurable="right"] {
		& > .resizeable-container__section[data-section-id="right"] {
			flex: 0 0 auto;
		}
	}


	& > .splitter {
		flex: 0 0 var(--splitter-width);
		position: relative;
		z-index: 2;
		overflow: visible;
		background-color: var(--splitter-color);

		.splitter__inner {
			cursor: col-resize;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			display: flex;
			flex-direction: column;
			background-color: inherit;
			align-items: center;
			transition: flex-basis 0.2s;

			.splitter-buttons {
				color: #4b5563;
				background-color: transparent;
				border-radius: 50%;
				overflow: hidden;
				position: absolute;
				top: var(--splitter-buttons-offset-top);
				height: calc((var(--button-size) * 2) + (var(--splitter-width) * 1));
				width: calc((var(--button-size) * 2) + (var(--splitter-width) * 1));
				transform: translateY(-50%);
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				justify-content: center;
				opacity: 0;
				transition: opacity 0.3s;

				.splitter-button, .splitter-button svg {
					width: 100%;
					height: 100%;
				}

				.splitter-button {
					background-color: var(--button-bg);
				}

				.splitter-button:hover {
					background-color: var(--button-active-bg);
					color: var(--button-active-color);
				}
			}
		}
	}

	&[data-behaviour="collapse-only"] {
		& > .splitter {
			.splitter__inner {
				.splitter-buttons {
					z-index: -1;
					gap: var(--splitter-width);

					.splitter-button[data-action="expand"] {
						opacity: 0;
						pointer-events: none;
					}
				}
			}
		}
	}

	&[data-behaviour="expand-only"] {
		& > .splitter {
			.splitter__inner {
				.splitter-buttons {
					z-index: -1;
					gap: var(--splitter-width);

					.splitter-button[data-action="collapse"] {
						opacity: 0;
						pointer-events: none;
					}
				}
			}
		}
	}

	&.is-resizing > .splitter > .splitter__inner,
	.splitter__inner:hover {
		width: var(--splitter-active-width);
		background-color: var(--splitter-active-color);
		left: var(--splittter-offset);

		.splitter-buttons {
			opacity: 1;
		}
	}

	&.is-resizing {
		user-select: none;
	}

	&.is-collapsed,
	&.is-expanded {
		& > .splitter {
			.splitter__inner {
				cursor: default;
			}

			.splitter-buttons {
				gap: var(--splitter-width);
				z-index: -1;
				transform: translateY(-50%) rotate(180deg);
			}
		}
	}

	&.is-collapsed {
		& > .resizeable-container__section[data-section-id="left"] {
			flex-grow: 0;
			flex-shrink: 0;
			flex-basis: 0 !important;
		}

		& > .resizeable-container__section[data-section-id="right"] {
			flex-basis: 100%;
			flex-grow: 1;
			flex-shrink: 1 !important;
		}
	}

	&.is-expanded {
		& > .resizeable-container__section[data-section-id="left"] {
			flex-basis: 100%;
			flex-grow: 1;
			flex-shrink: 1 !important;
		}

		& > .resizeable-container__section[data-section-id="right"] {
			flex-grow: 0;
			flex-shrink: 0;
			flex-basis: 0 !important;
		}
	}
}
</style>
