<script setup lang="ts">
import { emitter } from "@/views/UseEmitterDemo/emitter";
import { ref }     from "vue";

const props = defineProps<{
	id: number;
}>();

const _message = ref("");

emitter.on("message", msg => {
	_message.value = msg;
});

function deleteHandler() {
	emitter.emit("delete", props.id);
}
</script>

<template>
	<div class="flex justify-between items-center gap-4 p-2 bg-tertiary rounded-xl text-primary">
		<div>
			{{ _message }}
		</div>

		<div>
			<slot />
		</div>

		<button class="btn btn--secondary" @click="deleteHandler">DELETE</button>
	</div>
</template>
