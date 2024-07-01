<script setup lang="ts">
import { MenuHorizontal, type MenuHorizontalItem } from "@/components/MenuHorizontal";
import { ref }                                     from "vue";

const selectedItem = ref<MenuHorizontalItem | null>(null);

const items = ref<MenuHorizontalItem[]>([
	{
		id: "Item1",
		label: "Item 1"
	},
	{
		id: "Item2",
		label: "Item 2"
	},
	{
		id: "Item3",
		label: "Item 3"
	}
]);

</script>

<template>
	<div class="h-screen bg-brown-semi flex justify-center items-center">
		<div class="w-3/4">
			<MenuHorizontal :items v-model="selectedItem"/>
		</div>


		<!--		<ul class="space-y-2">-->
		<!--			<li v-for="i in 10" :key="i"></li>-->
		<!--		</ul>-->


		<!--		<div class="relative w-3/4 h-3/4 bg-yellow">-->
		<!--			<DrawerContainer disable-resizer-line class="bg-primary z-20 absolute left-0 top-0" dir="top-to-bottom">-->
		<!--				<div class="h-full"></div>-->
		<!--			</DrawerContainer>-->

		<!--			<DrawerContainer disable-resizer-line class="bg-tertiary text-white z-10 absolute left-0 top-0 bottom-0" dir="left-to-right">-->
		<!--				<div class="h-full">-->
		<!--					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dolor minima necessitatibus nisi quos repellendus.-->
		<!--				</div>-->
		<!--			</DrawerContainer>-->

		<!--			<DrawerContainer disable-resizer-line class="bg-secondary z-10 absolute right-0 top-0 bottom-0" dir="right-to-left">-->
		<!--				<div class="h-full"></div>-->
		<!--			</DrawerContainer>-->
		<!--		</div>-->

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
