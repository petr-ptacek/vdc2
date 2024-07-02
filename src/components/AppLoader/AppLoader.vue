<script setup lang="ts">
import type { AppLoaderProps }       from "@/components/AppLoader/types";
import { computed, type StyleValue } from "vue";

const props = withDefaults(
	defineProps<AppLoaderProps>(),
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

<style lang="postcss">
/* Utility class to usage in the application, that use vue-loader */
.vue-loader-container {
	position: relative;
}

.vue-loader,
.vue-loader * {
	padding: 0;
	margin: 0;
	box-sizing: inherit;
}

.vue-loader {
	/*CIRCLE 1*/
	--vl-circle1--color: theme("colors.primary");
	--vl-circle1--size: 100px;
	--vl-circle1--stroke-width: 11px;
	--vl-circle1--duration: 2s;

	/*CIRCLE 2*/
	--vl-circle2--color: theme("colors.secondary");
	--vl-circle2--size: 80px;
	--vl-circle2--stroke-width: 11px;
	--vl-circle2--duration: 1.5s;

	position: absolute;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-size: 10px;

	background: rgba(255, 255, 255, 0.3);
	box-shadow: inset 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(2px);
}

.vue-loader--hidden {
	display: none;
}

.vue-loader__message {
	font-size: 2.2em;
	margin-top: 0.5em;
	font-weight: 500;
	font-family: sans-serif;
	display: inline-block;
	-webkit-text-fill-color: transparent;
	-webkit-background-clip: text;
	background-image: linear-gradient(120deg, var(--vl-circle1--color), var(--vl-circle2--color));
}

.vue-loader__circle-1,
.vue-loader__circle-2 {
	border-radius: 50%;
	animation-name: spinner;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}

.vue-loader__circle-1 {
	display: flex;
	align-items: center;
	justify-content: center;
	width: var(--vl-circle1--size);
	height: var(--vl-circle1--size);
	border-left: var(--vl-circle1--stroke-width) solid var(--vl-circle1--color);
	animation-duration: var(--vl-circle1--duration);
}

.vue-loader__circle-2 {
	width: var(--vl-circle2--size);
	height: var(--vl-circle2--size);
	border-right: var(--vl-circle1--stroke-width) solid var(--vl-circle2--color);
	animation-duration: var(--vl-circle2--duration);
}

@keyframes spinner {
	100% {
		transform: rotate(360deg);
	}
}
</style>
