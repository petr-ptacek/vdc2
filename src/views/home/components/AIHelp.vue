<script setup lang="ts">
import { WFullscreenContainer, WIcon } from "@/components";
import { useAppStore }                 from "@/store";

const appStore = useAppStore();
</script>

<template>
	<WFullscreenContainer
		v-model:opened="appStore.windowHowToUseAI.opened"
	>
		<template #title>
			<div class="flex items-center gap-4">
				<div>
					Jak používat AI
				</div>

				<WIcon name="ai-brain" size="xl" />
			</div>
		</template>

		<div class="h-full py-4">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At iste quaerat quis. Cumque delectus dolorum ea
				 enim in necessitatibus, quaerat quia! Amet architecto blanditiis deleniti dolor doloremque eius expedita,
				 fugit ipsam magni minus provident quam quas reprehenderit totam ut, velit veniam? Autem ex explicabo magnam
				 maxime minus ratione, vitae voluptatum!</p>
		</div>
	</WFullscreenContainer>
</template>

