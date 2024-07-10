<script setup lang="ts">
import { WIcon }                              from "@/components";
import type { WCardPageEmit, WCardPageProps } from "@/components/core/CardPage/types";
import { WLoader }                            from "@/components/core/Loader";
import { useIntersectionObserver }            from "@vueuse/core";
import { ref }                                from "vue";

const props = defineProps<WCardPageProps>();

const target = ref<HTMLDivElement | null>(null);
const emit = defineEmits<WCardPageEmit>();
const imageFetching = ref(false);

useIntersectionObserver(
	target,
	([{ isIntersecting }], observer) => {
		if ( isIntersecting ) {
			fetchImage();
			observer.disconnect();
		}
	},
	props.intersectionObserverOptions
);

function fetchImage() {
	const img = new Image();
	img.onload = () => imageFetching.value = false;
	img.onerror = () => imageFetching.value = false;
	imageFetching.value = true;
	img.src = props.imgSrc;
	if ( img.complete ) imageFetching.value = false;
}

function toggleSelected() {
	emit("select", !props.selected);
}

function clickHandler(e: MouseEvent) {
	if ( e.composedPath().some(el => (el as HTMLElement).nodeName === "BUTTON") ) {
		return;
	}

	emit("click", e);
}
</script>

<template>
	<div class="card-page" ref="target">
		<div class="card-page__content" @click="clickHandler">
			<WLoader class="card-page__loader" :visible="imageFetching" />

			<img
				class="card-page__img"
				:src="imgSrc"
				loading="lazy"
				:alt="imgLabel"
			>

			<!--			<div class="card-page__action-top-right">-->
			<!--				<button-->
			<!--					class="btn btn&#45;&#45;ico-only"-->
			<!--					@click="toggleSelected"-->
			<!--				>-->
			<!--					<svgo-icon-check-circle-->
			<!--						key="selected"-->
			<!--						v-if="selected" filled class="ico ico&#45;&#45;4"-->
			<!--					/>-->
			<!--					<svgo-icon-add-circle-->
			<!--						key="notSelected"-->
			<!--						v-else filled class="ico ico&#45;&#45;4"-->
			<!--					/>-->
			<!--				</button>-->
			<!--			</div>-->

			<div class="card-page__action-center">
				<WIcon name="eye-circle" size="2xl" />
			</div>
			<div class="card-page__nth">{{ nth }}</div>
		</div>
	</div>
</template>
