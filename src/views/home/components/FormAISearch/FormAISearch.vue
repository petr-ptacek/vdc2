<script setup lang="ts">
import { WIcon, WInputSearch, WTooltip } from "@/components";
import { useAppStore, useSearchStore }   from "@/store";
import { ref }                           from "vue";

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
			placeholder="Zeptej se naší AI"
		/>


		<button
			v-tooltip="{ id: 'how-to-use-ai', dir: 'bottom' }"
			type="button"
			class="btn btn--tertiary btn--ico-only"
			@click="openModalHowToUseAI()"
		>
			<WIcon name="question-mark-circle" size="regular" />
		</button>

		<WTooltip identifier="how-to-use-ai">
			<div class="tooltip-content">Jak používat AI</div>
		</WTooltip>

		<button
			type="submit"
			class="btn btn--tertiary flex items-center gap-4"
		>
			<span>Zpracuj</span>
		</button>
	</form>
</template>
