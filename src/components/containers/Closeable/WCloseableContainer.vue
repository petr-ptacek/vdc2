<script setup lang="ts">
import type { WCloseableContainerProps } from "./types";

defineProps<WCloseableContainerProps>();
</script>

<template>
	<div
		class="closeable-container"
		:data-is-closed="closed"
	>
		<div class="closeable-container-content">
			<slot />
		</div>
	</div>
</template>
