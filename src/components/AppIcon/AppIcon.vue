<script setup lang="ts">
import { iconComponentsMap, iconSizesMap } from "./config";
import type { AppIconProps }               from "./types";
import { computed, type StyleValue }       from "vue";

const props = withDefaults(
	defineProps<AppIconProps>(),
	{ size: "regular" }
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

	const { width, height } = iconSizesMap[props.size];

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
