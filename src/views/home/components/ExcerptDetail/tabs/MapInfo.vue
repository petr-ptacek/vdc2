<script setup lang="ts">
import { WLeafletMap } from "@/components";
</script>

<template>
	<div class="w-full h-full">
		<WLeafletMap
			class="w-full h-full z-0"
			:center="[35.917973, 14.409943]"
			:zoom="5"
		/>
	</div>
</template>
