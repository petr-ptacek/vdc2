<script setup lang="ts">
import { AppIcon }                                       from "@/components/AppIcon";
import type { InputSearchbarEmits, InputSearchbarProps } from "@/components/InputSearchBar/types";
import { computed, ref, useModel }                       from "vue";

const props = defineProps<InputSearchbarProps>();
const emit = defineEmits<InputSearchbarEmits>();


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
		<input type="text" v-model="_modelValue" placeholder="Zadej parametry pro hledání cestopisů ...">
		<AppIcon name="ai-network" size="xl" class="absolute top-1/2 left-3 -translate-y-1/2 text-secondary" />
		<button
			class="button-clear absolute top-1/2 right-2 -translate-y-1/2 text-secondary hover:text-primary"
			@click="clear()"
		>
			<AppIcon name="x-mark" size="xl" />
		</button>
	</div>
</template>
