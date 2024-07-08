<script setup lang="ts">
import { computed, nextTick, ref }                                      from "vue";
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
		canClear: false,
		closeOnSelect: false,
		createOption: true,
		searchable: true,
		options: options.value,
		appendToBody: true,
		attrs: {
			autocomplete: "off"
		},
		...props.config,
		onSelect(value: any, option: any, instance: any) {
			instance?.updatePopper?.();
			props.config?.onSelect?.(value, option, instance);
		},
		onOpen(instance: any) {
			nextTick(() => {
				instance?.$el.querySelector("input.multiselect-tags-search")?.focus();
			});

			props.config?.onOpen?.(instance);
		}
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
