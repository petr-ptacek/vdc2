<script setup lang="ts" generic="TItem">
import type { MenuHorizontalEmits, MenuHorizontalItem, MenuHorizontalProps } from "@/components/MenuHorizontal/types";

defineProps<MenuHorizontalProps<TItem>>();
const emit = defineEmits<MenuHorizontalEmits<TItem>>();


function itemClickHandler(item: MenuHorizontalItem<TItem>) {
	emit("update:modelValue", item);
}
</script>

<template>
	<nav class="menu-horizontal">
		<ul class="menu-items">
			<li
				v-for="item in items"
				:key="item.id"
				class="menu-item"
				:class="{
					'is-active': item.id === modelValue?.id
				}"
				@click="itemClickHandler(item)"
			>
				<slot :item="item">
					{{ item.label }}
				</slot>

				<div class="menu-item-splitter">
					<AppIcon name="chevron-right" :size="['2.6rem']" />
				</div>
			</li>
		</ul>
	</nav>
</template>
