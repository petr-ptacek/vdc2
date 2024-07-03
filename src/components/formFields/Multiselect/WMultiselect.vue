<script setup lang="ts" generic="TModelValue = any, TOption = TModelValue">
import type { WMultiselectEmits, WMultiselectProps } from "@/components/formFields/Multiselect/types";
import VueMultiselect                                from "@vueform/multiselect";

const props = withDefaults(
	defineProps<WMultiselectProps<TModelValue, TOption>>(), {
		options: () => []
	}
);

defineEmits<WMultiselectEmits>();
const _modelValue = defineModel<TModelValue>();
</script>

<template>
	<VueMultiselect
		v-model="_modelValue"
		class="multiselect"
		:options
		searchable
		:placeholder="props.placeholder"
		:object="props.object"
		can-clear
		:label="props.label"
		input-type="text"
		:track-by="props.trackBy"
		value-prop="id"
	>

	</VueMultiselect>
</template>
