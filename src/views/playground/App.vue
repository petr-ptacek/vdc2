<script setup lang="ts">
import WResizeableContainer from "@/components/containers/Resizeable/WResizeableContainer.vue";
</script>

<template>
	<div class="h-screen bg-brown-semi justify-center flex items-center">
		<div class="w-[600px] h-full">
			<WResizeableContainer class="h-full bg-red" behaviour="default">
				<div class="h-full">
					<div class="p-4">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci autem distinctio dolorem doloremque
						ducimus esse facilis inventore nesciunt nulla quod. Beatae ipsa maiores molestias obcaecati officia quia
						quos unde voluptatem.
					</div>
				</div>
			</WResizeableContainer>
		</div>
	</div>
</template>
