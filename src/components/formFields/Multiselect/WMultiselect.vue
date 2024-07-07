<script setup lang="ts">
import { WIcon }                                       from "@/components";
import VueMultiselect                                  from "@vueform/multiselect";
import type { VueMultiselectSlots, WMultiselectProps } from "./types";
import { useVueMultiselectListeners }                  from "./useVueMultiselectListeners";
import { useVueMultiselectProps }                      from "./useVueMultiselectProps";

const props = defineProps<WMultiselectProps>();
defineSlots<VueMultiselectSlots>();

const _modelValue = defineModel<any>();
const _multiselectProps = useVueMultiselectProps(props);
const _multiselectListeners = useVueMultiselectListeners(props);
</script>

<template>
	<VueMultiselect
		v-model="_modelValue"
		class="multiselect"
		v-bind="_multiselectProps"
		v-on="_multiselectListeners"
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
