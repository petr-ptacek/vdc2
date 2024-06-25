<script setup lang="ts">
import { ref } from "vue";

const _opened = ref(false);

function toggleOpened(collapsed: boolean = !_opened.value) {
	_opened.value = collapsed;
}
</script>

<template>
	<div
		class="drawer-container"
		:class="{
			'drawer-container--is-open': _opened,
		}"
	>
		<div class="drawer-container-content">
			<slot />
		</div>

		<div class="drawer-resizer">
			<div class="drawer-resizer-inner">
				<div class="drawer-resizer-buttons">
					<button
						class="drawer-resizer-button"
						@click="toggleOpened()"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="block">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
