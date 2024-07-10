<script setup lang="ts">
import { computed, ref }                         from "vue";
import type { WAccordionEmits, WAccordionProps } from "./types";

const props = withDefaults(
	defineProps<WAccordionProps>(),
	{
		opened: undefined
	}
);

const emit = defineEmits<WAccordionEmits>();

// OPENED STATE INTERNAL VALUE
const _opened = ref(props._opened ?? false);
const _openedModelValue = computed<boolean>({
	get() {
		return typeof props.opened === "undefined" ?
					 _opened.value :
					 props.opened;
	},
	set(value) {
		if ( typeof props.opened === "undefined" ) {
			_opened.value = value;
		} else {
			emit("update:opened", value);
		}
	}
});

function toggleOpen(value = !_openedModelValue.value) {
	_openedModelValue.value = value;
}

function buttonOpenerClickHandler() {
	if ( props.headerClickable ) return;
	toggleOpen();
}

function headerClickHandler() {
	if ( !props.headerClickable ) {
		return;
	}

	toggleOpen();
}
</script>

<template>
	<div
		class="accordion"
		:class="{
			'accordion--is-header-clickable': headerClickable,
			'is-open': _openedModelValue
		}"
	>
		<div
			class="accordion__header"
			:class="headerClass"
			@click="headerClickHandler"
		>
			<div class="accordion__title">
				<slot name="title">
					{{ title }}
				</slot>
			</div>

			<button class="accordion__button-opener" @click="buttonOpenerClickHandler">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
				</svg>
			</button>
		</div>

		<div
			class="accordion__body"
			:class="bodyClass"
		>
			<div>
				<slot />
			</div>
		</div>
	</div>
</template>
