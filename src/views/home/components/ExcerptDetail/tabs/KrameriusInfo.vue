<script setup lang="ts">
import { WCardPage } from "@/components";
</script>

<template>
	<div class="">
		<ul class="">
			<li v-for="i in 10" :key="i">
				<WCardPage
					:nth="i"
					img-src="https://www.ndk.cz/search/api/v5.0/item/uuid:4fc807c0-cc40-11e4-9c07-5ef3fc9bb22f/thumb"
				/>
			</li>
		</ul>

	</div>
</template>

<style scoped lang="postcss">
ul {
	display: grid;
	gap: 15px;
	grid-auto-rows: 300px;
	grid-template-columns: repeat(auto-fill, minmax(200px, 250px));
	place-content: center;
}
</style>
