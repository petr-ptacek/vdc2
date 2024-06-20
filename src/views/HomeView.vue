<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
	<div class="h-screen w-full flex flex-col">
		<AppHeader class="flex-shrink-0 flex-grow-0" />
		<div class="flex-1 bg-yellow">
			<main class="container mx-auto">
			</main>
		</div>
		<AppFooter />
	</div>
</template>
