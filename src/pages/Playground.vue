<script setup lang="ts">
import { FullscreenContainer } from "@/components/FullscreenContainer";
import { ref }                 from "vue";

const opened = ref(false)
</script>

<template>
	<div class="h-screen bg-brown-semi flex justify-center items-center">
		<button class="btn btn--primary" @click="opened = true">Open</button>

		<FullscreenContainer v-model:opened="opened">
			<template #title>
				<div>Hello world</div>
			</template>

			<div class="h-full flex justify-center items-center">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam cumque eos ipsam magnam odio, optio quae
					quam totam? Beatae est, libero minus nam porro praesentium velit voluptatum? Beatae, explicabo,
					veritatis.
				</p>
			</div>
		</FullscreenContainer>
	</div>
</template>
