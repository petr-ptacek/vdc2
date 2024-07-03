<script setup lang="ts">
import { WIcon, WInputSearch }         from "@/components";
import { useAppStore, useSearchStore } from "@/store";
import { ref }                         from "vue";

const searchStore = useSearchStore();
const appStore = useAppStore();

const { toggleWindowHowToUseAI } = appStore;
const { toggleSearchResultsContainer } = searchStore;

const searchValue = ref("");

function openModalHowToUseAI() {
	toggleWindowHowToUseAI(true);
}
</script>

<template>
	<form
		class="flex items-center gap-4"
		@submit.prevent="toggleSearchResultsContainer(true)"
	>
		<WInputSearch
			v-model="searchValue"
			class="flex-1"
			prepend-icon="ai-search"
			placeholder="Zadej parametry pro hledání cestopisů ..."
		/>

		<div class="tooltip tooltip--bottom">
			<button
				type="button"
				class="btn btn--tertiary btn--ico-only"
				@click="openModalHowToUseAI()"
			>
				<WIcon name="question-mark-circle" size="regular" />
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
