<script setup lang="ts">

import type { DropdownMenuItem, DropdownMenuProps } from "@/components/DropdownMenu/types";
import { onClickOutside, useCurrentElement }        from "@vueuse/core";
import { ref }                                      from "vue";

withDefaults(
	defineProps<DropdownMenuProps>(),
	{
		items: () => []
	}
);

const rootEl = useCurrentElement();
const button = ref<HTMLElement | null>(null);
const list = ref<HTMLElement | null>(null);
const _opened = ref(true);

onClickOutside(rootEl, () => {
	_opened.value = false;
});

function toggleOpen(open: boolean = !_opened.value): void {
	_opened.value = open;
}

function clickHandler() {
	toggleOpen();
}

function itemClickHandler(item: DropdownMenuItem) {
	if ( item.onClick?.() === false ) {
		return;
	}

	_opened.value = false;
}

defineSlots<{
	button: (props: { clickHandler: () => void; }) => void;
	listItem: (props: { item: DropdownMenuItem }) => void;
}>();
</script>

<template>
	<div
		class="dropdown-menu"
		:class="{ 'is-open': _opened }"
	>
		<div
			class="dropdown-menu-button-wrapper"
			ref="button"
		>
			<slot name="button" :clickHandler="clickHandler">
				<button class="btn btn--tertiary" @click="clickHandler()">
					<AppIcon name="bars-4" size="regular" />
				</button>
			</slot>
		</div>

		<div class="dropdown-menu-list" ref="list">
			<div
				v-for="(item, idx) in items"
				:key="idx"
				class="dropdown-menu-list-item"
				@click="itemClickHandler(item)"
			>
				<slot
					:item
					name="listItem"
				>
					{{ item.label }}
				</slot>
			</div>
		</div>
	</div>
</template>
