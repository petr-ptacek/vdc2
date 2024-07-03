<script setup lang="ts">
import { computed, type StyleValue }     from "vue";
import { iconComponentsMap, ICON_SIZES } from "./config";
import type { WIconProps }               from "./types";

const props = withDefaults(
	defineProps<WIconProps>(),
	{ size: "md" }
);

const iconComponent = computed(() => {
	return iconComponentsMap[props.name];
});

const size = computed<StyleValue>(() => {
	if ( Array.isArray(props.size) ) {
		/**
		 * size = [1], [1, 1]
		 * size = [1,2], [1, 2, 1, 2]
		 */
		const [width, height] = [...props.size, ...props.size];

		return {
			width,
			height
		};
	}

	if (
		typeof props.size === "object" &&
		"width" in props.size &&
		"height" in props.size
	) {
		return {
			width: props.size.width,
			height: props.size.height
		};
	}

	const { width, height } = ICON_SIZES[props.size];

	return {
		width,
		height
	};
});

</script>

<template>
	<div :style="size">
		<component
			:is="iconComponent"
			class="w-full h-full"
			:class="svgClass"
		/>
	</div>
</template>
