<script setup lang="ts">
import DrawerContainer from "@/components/DrawerContainer/DrawerContainer.vue";
import { ref }         from "vue";

const drawerLeft = ref(false);
const drawerRight = ref(false);

function openBothHandler() {
	drawerLeft.value = !drawerLeft.value;
	drawerRight.value = !drawerRight.value;
}
</script>

<template>
	<div class="h-screen bg-brown-semi flex justify-center items-center">
		<div class="w-3/4 border h-3/4 bg-yellow relative">
			<DrawerContainer
				v-model:opened="drawerLeft"
				class="absolute right-0 top-0"
				dir="right"
			>
			</DrawerContainer>

			<div class="flex justify-center w-full">
				<button @click="openBothHandler">Open Both</button>
			</div>

			<DrawerContainer
				v-model:opened="drawerRight"
				dir="left"
				class="absolute left-0-0 top-0"
			>
			</DrawerContainer>
		</div>
	</div>
</template>
