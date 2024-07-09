<script setup lang="ts">
import { WPagination, WResizerContainer } from "@/components";
</script>

<template>
	<div class="h-screen bg-brown-semi justify-center flex items-center">
		<div class="w-[1600px] h-full">
			<WPagination :total-pages="12" :model-value="6" />
			<!--			<WResizerContainer class="h-full">-->
			<!--				<template #left>-->
			<!--					<div class="h-full w-full bg-tertiary flex items-center justify-center">-->
			<!--						<p>-->
			<!--							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est hic necessitatibus odio placeat, ratione-->
			<!--							repellat.-->
			<!--						</p>-->
			<!--					</div>-->
			<!--				</template>-->

			<!--				<template #right>-->
			<!--					<div class="h-full w-full bg-yellow flex items-center justify-center">-->
			<!--						<p>-->
			<!--							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est hic necessitatibus odio placeat, ratione-->
			<!--							repellat.-->
			<!--						</p>-->
			<!--					</div>-->
			<!--				</template>-->
			<!--			</WResizerContainer>-->
		</div>
	</div>
</template>
