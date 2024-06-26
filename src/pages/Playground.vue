<script setup lang="ts">
import { DrawerContainer }     from "@/components";
import { FullscreenContainer } from "@/components/FullscreenContainer";
import { ref }                 from "vue";

const opened = ref(false)
</script>

<template>
	<div class="h-screen bg-brown-semi flex justify-center items-center">
		<div class="relative w-3/4 h-3/4 bg-yellow">
			<DrawerContainer class="bg-primary z-20 absolute left-0 top-0" dir="top-to-bottom">
				<div class="h-full"></div>
			</DrawerContainer>

			<DrawerContainer class="bg-secondary z-10 absolute left-0 top-0 bottom-0" dir="left-to-right">
				<div class="h-full"></div>
			</DrawerContainer>

			<DrawerContainer class="bg-secondary z-10 absolute right-0 top-0 bottom-0" dir="right-to-left">
				<div class="h-full"></div>
			</DrawerContainer>
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
