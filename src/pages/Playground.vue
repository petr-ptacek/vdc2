<script setup lang="ts">
import DrawerContainer from "@/components/DrawerContainer/DrawerContainer.vue";
</script>

<template>
	<div class="h-screen bg-brown-semi flex justify-center items-center">
		<div class="w-3/4 border h-3/4 bg-yellow relative">
			<DrawerContainer class="absolute right-0 top-0" data-side="right">
			</DrawerContainer>

			<DrawerContainer class="absolute left-0-0 top-0">
			</DrawerContainer>
		</div>
	</div>
</template>
