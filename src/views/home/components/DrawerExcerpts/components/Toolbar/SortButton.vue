<script setup lang="ts">
import { WIcon, type WIconProps, WTooltip } from "@/components";

defineProps<{
	active: boolean;
	sortIcon: WIconProps["name"];
}>();
</script>

<template>
	<button
		v-tooltip="{ id: 'sort-button', dir: 'left' }"
		class="btn btn--circle"
		:class="[!active ? 'btn--secondary' : 'btn--success']"
	>
		<WIcon :name="sortIcon" :size="'md'" />

		<WTooltip identifier="sort-button">
			<div>Setřídit</div>
		</WTooltip>
	</button>
</template>
