<script setup lang="ts">
import type { WDrawerContainerEmits, WDrawerContainerProps } from "./types";
import { computed, ref, type StyleValue }                    from "vue";

const props = withDefaults(
	defineProps<WDrawerContainerProps>(),
	{
		dir: "left-to-right",
		opened: undefined,
		size: "20vw",
		disableOpenButton: false
	}
);

const emit = defineEmits<WDrawerContainerEmits>();

const _opened = ref(false);
const openedModalValue = computed({
	get() {
		return typeof props.opened === "undefined" ?
					 _opened.value :
					 props.opened;
	},
	set(value: boolean) {
		if ( typeof props.opened === "undefined" ) {
			_opened.value = value;
		} else {
			emit("update:opened", value);
		}
	}
});

const styleDef = computed<StyleValue>(() => {
	const styleObj: StyleValue = {};

	styleObj["--content-size"] = openedModalValue.value ?
															 (typeof props.size === "number" ? `${ props.size }px` : props.size) :
															 "0px";

	if ( props.disableResizerLine ) {
		styleObj["--resizer-size"] = "0px";
	}

	return styleObj;
});

defineSlots<{
	default: (props: { close: () => void; }) => void;
}>();

function toggleOpened(value: boolean = !openedModalValue.value) {
	openedModalValue.value = value;
}

function close() {
	toggleOpened(false);
}
</script>

<template>
	<div
		class="drawer-container"
		:data-side="dir"
		:style="styleDef"
		:class="{
			'is-open': openedModalValue,
		}"
	>
		<div class="drawer-container-content">
			<slot :close />
		</div>

		<div class="drawer-resizer">
			<div class="drawer-resizer-inner">
				<div class="drawer-resizer-buttons" v-if="!disableOpenButton">
					<button
						class="drawer-resizer-button"
						@click="toggleOpened()"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="block">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
