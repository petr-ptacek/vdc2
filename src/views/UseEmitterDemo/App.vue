<script setup lang="ts">
import Box         from "@/views/UseEmitterDemo/Box.vue";
import { emitter } from "@/views/UseEmitterDemo/emitter";
import { ref }     from "vue";

const items = ref(Array.from({ length: 10 }, (_, i) => i));

emitter.on("delete", (idx) => {
	items.value = items.value.filter(item => item !== idx);
});

function messageHandler() {
	emitter.emit("message", Math.floor(Math.random() * 10_000).toString());
}
</script>

<template>
	<div class="w-full h-full flex flex-col gap-4 justify-center items-center">
		<button class="btn btn--secondary" @click="messageHandler">Message</button>
		<ul class="space-y-2">
			<li v-for="i in items" :key="i">
				<Box :id="i">
					{{ i }}
				</Box>
			</li>
		</ul>
	</div>
</template>
