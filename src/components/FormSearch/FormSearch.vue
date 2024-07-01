<script setup lang="ts">
import { AppIcon }                     from "@/components/AppIcon";
import { useAppStore, useSearchStore } from "@/store";
import { ref }                         from "vue";
import InputSearchbar                  from "../InputSearchBar/InputSearchbar.vue";

const searchStore = useSearchStore();
const appStore = useAppStore();

const { toggleModalWindowHowToUseAI } = appStore;
const { toggleSearchResultsContainer } = searchStore;

const searchValue = ref("");

function openModalHowToUseAI() {
	toggleModalWindowHowToUseAI(true);
}
</script>

<template>
	<form class="flex items-center gap-4" @submit.prevent="toggleSearchResultsContainer(true)">
		<InputSearchbar
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
