<script setup lang="ts">

import { WLoader }     from "@/components";
import { useAppStore } from "@/store";

const appStore = useAppStore();
</script>

<template>
	<div class="h-screen">
		<router-view />

		<teleport to="body">
			<WLoader
				:visible="appStore.loaderVisibility"
				:z-index="1001"
			/>
		</teleport>
	</div>
</template>
