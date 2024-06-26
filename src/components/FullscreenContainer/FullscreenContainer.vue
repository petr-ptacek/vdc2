<script setup lang="ts">
import { AppIcon }                                                 from "@/components/AppIcon";
import type { FullscreenContainerEmits, FullscreenContainerProps } from "@/components/FullscreenContainer/types";
import { computed, ref }                                           from "vue";

const props = withDefaults(
	defineProps<FullscreenContainerProps>(),
	{
		opened: undefined
	}
);

const emit = defineEmits<FullscreenContainerEmits>();

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
</script>

<template>
	<div
		class="fullscreen-container"
		:class="{
			'is-open': _openedModelValue
		}"
	>
		<div class="fullscreen-container-content flex flex-col">
			<header class="flex-shrink-0 px-12 py-4 bg-white">
				<div class="flex items-center justify-between">
					<div class="fullscreen-container-title">
						<slot name="title" />
					</div>

					<button @click="close()">
						<AppIcon name="x-mark" class="hover:text-brown-hover" :size="['4rem']" />
					</button>
				</div>
			</header>

			<main class="flex-1 px-12">
				<template v-if="_openedModelValue">
					<slot />
				</template>
			</main>
		</div>
	</div>
</template>
