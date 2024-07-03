<script setup lang="ts">
import { WIcon }     from "@/components/core";
import { useRouter } from "vue-router";
import BrandLogoLink from "./WBrandLogoLink.vue";

defineProps<{
	disableArrowBack?: boolean;
}>();

const router = useRouter();
</script>

<template>
	<header class="app-header bg-white border-b-[0.2rem] w-full border-brown-inputBorder">
		<div class="w-full px-20 h-full">
			<div class="flex items-center h-full">
				<button
					v-if="!disableArrowBack"
					class="w-fit h-fit mr-10 text-primary hover:text-brown-hover"
					@click="router.back()"
				>
					<WIcon name="chevron-left" :size="['4rem']" />
				</button>

				<!-- BRAND LOGO -->
				<div class="text-primary mr-10 hover:text-brown-hover">
					<BrandLogoLink />
				</div>
				<slot />
			</div>
		</div>
	</header>
</template>
