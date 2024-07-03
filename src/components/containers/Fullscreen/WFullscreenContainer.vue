<script setup lang="ts">
import { WIcon }                                                     from "@/components";
import { computed, ref }                                             from "vue";
import type { WFullscreenContainerEmits, WFullscreenContainerProps } from "./types";

const props = withDefaults(
	defineProps<WFullscreenContainerProps>(),
	{
		opened: undefined
	}
);

const emit = defineEmits<WFullscreenContainerEmits>();

const _opened = ref(false);
const _openedModelValue = computed({
	get() {
		return typeof props.opened === "undefined" ? _opened.value : props.opened;
	},
	set(value: boolean) {
		if ( typeof props.opened === "undefined" ) {
			_opened.value = value;
		} else {
			emit("update:opened", value);
		}
	}
});

function close() {
	_openedModelValue.value = false;
	emit("close");
}

defineSlots<{
	title: () => string;
	default: (props: { opened: boolean }) => void;
}>();
</script>

<template>
	<div
		class="fullscreen-container"
		:class="{
			'is-open': _openedModelValue
		}"
	>
		<div class="fullscreen-container-content">
			<header class="fullscreen-container-header">
				<div class="flex items-center justify-between">
					<div class="fullscreen-container-title">
						<slot name="title" />
					</div>

					<button @click="close()">
						<WIcon name="x-mark" class="hover:text-brown-hover" :size="['4rem']" />
					</button>
				</div>
			</header>

			<main
				class="fullscreen-container-body"
				:class="contentClass"
			>
				<!-- here preloader -->
				<slot :opened="_openedModelValue" />
			</main>
		</div>
	</div>
</template>
