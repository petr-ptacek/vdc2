<script setup lang="ts">
import { WIcon, type WIconProps } from "@/components";

defineProps<{
	active: boolean;
	sortIcon: WIconProps["name"];
}>();
</script>

<template>
	<button
		class="btn btn--circle"
		:class="[!active ? 'btn--secondary' : 'btn--success']"
	>
		<WIcon :name="sortIcon" :size="'md'" />
	</button>
</template>
