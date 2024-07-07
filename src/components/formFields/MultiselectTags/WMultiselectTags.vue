<script setup lang="ts">
import { computed, ref }                                                from "vue";
import { type MultiselectConfig, WMultiselect, type WMultiselectProps } from "../Multiselect";

const props = defineProps<WMultiselectProps>();

const options = ref([
	{ value: "batman", label: "Batman" },
	{ value: "robin", label: "Robin" },
	{ value: "joker", label: "Joker" }
]);

const _modelValue = defineModel("modelValue");
const _config = computed<MultiselectConfig>(() => {
	return {
		placeholder: "Select Tags ...",
		mode: "tags",
		valueProp: "value",
		closeOnSelect: false,
		createOption: true,
		searchable: true,
		options: options.value,
		appendToBody: true,
		...props.config
	};
});
</script>

<template>
	<WMultiselect
		v-model="_modelValue"
		:config="_config"
		:value
	/>
</template>
