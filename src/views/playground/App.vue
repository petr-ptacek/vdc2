<script setup lang="ts">
import { WDrawerContainer } from "@/components";
</script>

<template>
	<div class="h-screen bg-brown-semi flex justify-center items-center">


		<div class="relative w-3/4 h-3/4 bg-yellow">
			<WDrawerContainer disable-resizer-line class="bg-primary z-20 absolute left-0 top-0" dir="top-to-bottom">
				<div class="h-full"></div>
			</WDrawerContainer>

			<WDrawerContainer
				disable-resizer-line
				class="bg-tertiary text-white z-10 absolute left-0 top-0 bottom-0"
				dir="left-to-right">
				<div class="h-full">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dolor minima necessitatibus nisi quos
					repellendus.
				</div>
			</WDrawerContainer>

			<WDrawerContainer
				disable-resizer-line
				class="bg-secondary z-10 absolute right-0 top-0 bottom-0"
				dir="right-to-left">
				<div class="h-full"></div>
			</WDrawerContainer>
		</div>

		<!--		<FullscreenContainer v-model:opened="opened">-->
		<!--			<template #title>-->
		<!--				<div>Hello world</div>-->
		<!--			</template>-->

		<!--			<div class="h-full flex justify-center items-center">-->
		<!--				<p>-->
		<!--					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam cumque eos ipsam magnam odio, optio quae-->
		<!--					quam totam? Beatae est, libero minus nam porro praesentium velit voluptatum? Beatae, explicabo,-->
		<!--					veritatis.-->
		<!--				</p>-->
		<!--			</div>-->
		<!--		</FullscreenContainer>-->
	</div>
</template>
