<script setup lang="ts">
import { FullscreenContainer } from "@/components/FullscreenContainer";
import { NavHorizontal }       from "@/components/NavHorizontal";
import { ref }                 from "vue";

const _opened = ref(false);
</script>

<template>
	<FullscreenContainer
		opened @close="() =>_opened = false"
	>
		<template #title>
			{{ selectedInsert.name }}
		</template>

		<div class="flex justify-center items-center h-full">
			<NavHorizontal items="" />
		</div>
	</FullscreenContainer>
</template>
