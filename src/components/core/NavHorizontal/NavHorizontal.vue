<script setup lang="ts" generic="TItem">
import { WIcon }                                                            from "@/components/core";
import type { NavHorizontalItem, WNavHorizontalEmits, WNavHorizontalProps } from "./types";

defineProps<WNavHorizontalProps<TItem>>();
const emit = defineEmits<WNavHorizontalEmits<TItem>>();

function itemClickHandler(item: NavHorizontalItem<TItem>) {
	emit("update:modelValue", item);
}

defineSlots<{
	default: (props: { item: NavHorizontalItem<TItem> }) => void;
}>();
</script>

<template>
	<nav class="nav-horizontal">
		<ul class="items">
			<li
				v-for="item in items"
				:key="item.id"
				class="item"
				:class="{
					'is-active': item.id === modelValue?.id
				}"
				@click="itemClickHandler(item)"
			>
				<slot :item="item">
					{{ item.label }}
				</slot>

				<div class="item-splitter">
					<WIcon name="chevron-right" :size="['2.6rem']" />
				</div>
			</li>
		</ul>
	</nav>
</template>
