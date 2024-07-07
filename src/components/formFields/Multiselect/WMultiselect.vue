<script setup lang="ts">
import { WIcon }                                                                               from "@/components";
import VueMultiselect
																																															 from "@vueform/multiselect";
import { computed }                                                                            from "vue";
import type { VueMultiselectProps, VueMultiselectSlots, WMultiselectEmits, WMultiselectProps } from "./types";

const props = defineProps<WMultiselectProps>();
const emit = defineEmits<WMultiselectEmits>();
defineSlots<VueMultiselectSlots>();

const _modelValue = defineModel<any>();

const config = computed<VueMultiselectProps>(() => {
	return {
		value: props.value,
		...props.config
	};
});

const handlers = {
	"change": (value: any, instance: object): object | void => {
		emit("change", value, instance);
	},
	"select": (value: any, option: any, instance: object): object | void => {
		emit("select", value, option, instance);
	},
	"deselect": (value: any, option: any, instance: object): object | void => {
		emit("deselect", value, option, instance);
	},
	"search-change": (query: string, instance: object): object | void => {
		emit("search-change", query, instance);
	},
	"tag": (option: any, instance: object): object | void => {
		emit("tag", option, instance);
	},
	"option": (option: any, instance: object): object | void => {
		emit("option", option, instance);
	},
	"create": (option: any, instance: object): object | void => {
		emit("create", option, instance);
	},
	"paste": (e: Event, instance: object): object | void => {
		emit("paste", e, instance);
	},
	"keydown": (e: Event, instance: object): object | void => {
		emit("keydown", e, instance);
	},
	"keyup": (e: Event, instance: object): object | void => {
		emit("keyup", e, instance);
	},
	"open": (instance: object): object | void => {
		emit("open", instance);
	},
	"close": (instance: object): object | void => {
		emit("close", instance);
	},
	"clear": (instance: object): object | void => {
		emit("clear", instance);
	},
	"max": (instance: object): object | void => {
		emit("max", instance);
	}
};
</script>

<template>
	<VueMultiselect
		v-model="_modelValue"
		class="multiselect"
		v-bind="config"
		v-on="handlers"
	>
		<template #caret="{ handleCaretClick, isOpen}">
			<WIcon
				name="chevron-down"
				size="md"
				class="text-secondary z-10 mr-4 pointer-events-none transition-transform"
				:class="{ 'rotate-180 pointer-events-auto': isOpen }"
				@click="handleCaretClick"
			/>
		</template>

		<template #clear="{ clear }">
			<WIcon
				name="x-mark"
				class="z-10 text-secondary"
				size="sm"
				@click="clear"
			/>
		</template>
	</VueMultiselect>
</template>
