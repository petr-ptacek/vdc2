<script setup lang="ts">
import { AppIcon }                     from "@/components/AppIcon";
import { useAppStore, useSearchStore } from "@/store";
import InputSearchbar                  from "../InputSearchBar/InputSearchbar.vue";

const searchStore = useSearchStore();
const appStore = useAppStore();

const { toggleModalWindowHowToUseAI } = appStore;
const { toggleSearchResultsContainer } = searchStore;

function openModalHowToUseAI() {
	toggleModalWindowHowToUseAI(true);
}
</script>

<template>
	<form class="flex items-center gap-4" @submit.prevent="toggleSearchResultsContainer(true)">
		<InputSearchbar class="flex-1" />

		<div class="tooltip tooltip--bottom">
			<button
				type="button"
				class="btn btn--tertiary rounded-full p-4"
				@click="openModalHowToUseAI()"
			>
				<AppIcon name="question-mark-circle" size="regular" />
			</button>
			<div class="tooltip-content">Jak používat AI</div>
		</div>

		<button
			type="submit"
			class="btn btn--tertiary flex items-center gap-4"
		>
			<span>Hledat</span>
		</button>
	</form>
</template>
