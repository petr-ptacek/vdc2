<script setup lang="ts">
import { WCardPage, WPagesStepper } from "@/components";
</script>

<template>
	<div class="h-screen bg-brown-semi justify-center flex items-center">
		<div class="w-[1600px] h-full">

			<div style="width: 300px; height: 600px;">
				<WCardPage
					:nth="1"
					img-src="https://vdc.olc.cz/media/saved_pages/dd871e73-50fa-4e6c-9dfb-f11300c34de3/4bb9d779-435e-11dd-b505-00145e5790ea_koGygSo.jpg" />
			</div>

			<!--			<WPagesStepper-->
			<!--				hide-add-btn-->
			<!--				:max="0"-->
			<!--				:min="0"-->
			<!--				:model-value="0"-->
			<!--				img-alt="Page ..."-->
			<!--				img-src="https://vdc.olc.cz/media/saved_pages/dd871e73-50fa-4e6c-9dfb-f11300c34de3/4bb9d779-435e-11dd-b505-00145e5790ea_koGygSo.jpg"-->
			<!--			/>-->
		</div>
	</div>
</template>
