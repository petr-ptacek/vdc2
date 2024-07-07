<script setup lang="ts">
import type { WTooltipProps } from "./types";

defineProps<WTooltipProps>();

defineSlots<{
	default: () => void;
}>();
</script>

<template>
	<teleport to="body">
		<div class="tooltip" :data-tooltip-id="identifier">
			<slot />
		</div>
	</teleport>
</template>
