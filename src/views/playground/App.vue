<script setup lang="ts">
import { WMultiselect }     from "@/components";
import { ref, watchEffect } from "vue";

const value = ref("a");


</script>

<template>
	<div class="h-screen bg-brown-semi flex justify-center items-center">
		<WMultiselect
			v-model="value"
			:config="{
				searchable:true,
				canClear: true,
				options: ['a', 'b', 'c', 'd']
			}"
			class="w-[400px]"
		>

		</WMultiselect>

		<!--		<div class="relative w-3/4 h-3/4 bg-yellow">-->
		<!--			<WDrawerContainer disable-resizer-line class="bg-primary z-20 absolute left-0 top-0" dir="top-to-bottom">-->
		<!--				<div class="h-full"></div>-->
		<!--			</WDrawerContainer>-->

		<!--			<WDrawerContainer-->
		<!--				disable-resizer-line-->
		<!--				class="bg-tertiary text-white z-10 absolute left-0 top-0 bottom-0"-->
		<!--				dir="left-to-right">-->
		<!--				<div class="h-full">-->
		<!--					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dolor minima necessitatibus nisi quos-->
		<!--					repellendus.-->
		<!--				</div>-->
		<!--			</WDrawerContainer>-->

		<!--			<WDrawerContainer-->
		<!--				disable-resizer-line-->
		<!--				class="bg-secondary z-10 absolute right-0 top-0 bottom-0"-->
		<!--				dir="right-to-left">-->
		<!--				<div class="h-full"></div>-->
		<!--			</WDrawerContainer>-->
		<!--		</div>-->
	</div>
</template>
