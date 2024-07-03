<script setup lang="ts">
import type { WLoaderProps }         from "./types";
import { computed, type StyleValue } from "vue";

const props = withDefaults(
	defineProps<WLoaderProps>(),
	{
		disableMessage: false,
		zIndex: 100
	}
);

const styleDeclaration = computed<StyleValue>(() => {
	return {
		zIndex: props.zIndex.toString(10)
	};
});

</script>

<template>
	<div
		class="vue-loader"
		:class="{ 'vue-loader--hidden': !visible }"
		:style="styleDeclaration"
	>
		<!--LOADER-->
		<div class="vue-loader__loader">
			<slot>
				<div class="vue-loader__circle-1">
					<div class="vue-loader__circle-2"></div>
				</div>
			</slot>
		</div>
		<!--MESSAGE-->
		<div v-if="!disableMessage" class="vue-loader__message">
			<slot name="message" :message="message">
				{{ message }}
			</slot>
		</div>
	</div>
</template>
