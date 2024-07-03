<script setup lang="ts">
import { WDrawerContainer } from "@/components";
import { useSearchStore }   from "@/store";

const searchStore = useSearchStore();
</script>

<template>
	<WDrawerContainer
		class="search-results-container bg-white relative z-10 flex-shrink-0"
		size="100px"
		dir="top-to-bottom"
		:disable-resizer-line="!searchStore.searchResultsContainer.opened"
		v-model:opened="searchStore.searchResultsContainer.opened"
	>
		<div class="h-full flex justify-center items-center">
			Vysledky vyhledavani ...
		</div>
	</WDrawerContainer>
</template>
