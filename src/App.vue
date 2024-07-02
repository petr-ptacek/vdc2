<script setup lang="ts">

import { useAppStore } from "@/store";

const appStore = useAppStore();
</script>

<template>
	<div class="h-screen">
		<AppLoader
			:visible="appStore.loaderVisibility"
			:z-index="1001"
		/>
		<router-view />
	</div>
</template>
