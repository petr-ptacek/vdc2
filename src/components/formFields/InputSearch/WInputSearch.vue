<script setup lang="ts">
import { WIcon }                                     from "@/components/core";
import { computed, ref }                             from "vue";
import type { WInputSearchEmits, WInputSearchProps } from "./types";

const props = withDefaults(
	defineProps<WInputSearchProps>(),
	{
		prependIcon: "search",
		clearIcon: "x-mark"
	}
);
const emit = defineEmits<WInputSearchEmits>();

const _value = ref("");

const _modelValue = computed({
	get() {
		return typeof props.modelValue === "undefined" ?
					 _value.value :
					 props.modelValue;
	},
	set(value: string) {
		if ( typeof props.modelValue === "undefined" ) {
			_value.value = value;
		} else {
			emit("update:modelValue", value);
		}
	}
});

const btnClearVisible = computed(() => {
	return !!_modelValue.value.length;
});

function clear() {
	_modelValue.value = "";
}

</script>

<template>
	<div
		class="form-field form-field--searchbar"
		:data-visible-clear-btn="btnClearVisible"
	>
		<input
			type="text"
			v-model="_modelValue"
			:placeholder
		>
		<WIcon
			:name="prependIcon"
			size="xl"
			class="absolute top-1/2 left-3 -translate-y-1/2 text-secondary"
		/>
		<button
			class="button-clear absolute top-1/2 right-2 -translate-y-1/2 text-secondary hover:text-primary"
			@click="clear()"
		>
			<WIcon :name="clearIcon" size="xl" />
		</button>
	</div>
</template>
