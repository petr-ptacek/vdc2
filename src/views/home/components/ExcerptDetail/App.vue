<script setup lang="ts">
import { WFullscreenContainer, WNavHorizontal } from "@/components";
import { useExcerptDetailStore } from "@/store";
import { createTabs }            from "@/views/home/components/ExcerptDetail/helpers";
import type { TabItem }          from "@/views/home/components/ExcerptDetail/types";
import { storeToRefs }           from "pinia";
import { shallowRef }                           from "vue";

const excerptDetailStore = useExcerptDetailStore();
const { opened, excerpt } = storeToRefs(excerptDetailStore);

const tabItems = shallowRef<TabItem[]>(createTabs());
const currentTab = shallowRef<TabItem>(tabItems.value[0]!);
</script>

<template>
	<WFullscreenContainer
		v-if="opened"
		:opened="opened"
		@close="opened = false"
	>
		<template #title>
			{{ excerpt!.name }}
		</template>

		<div class="flex flex-col h-full">
			<div class="">
				<WNavHorizontal
					:items="tabItems"
					v-model="currentTab"
				/>
			</div>

			<!--Content-->
			<div class="pt-4 flex-1">
				<component
					v-if="currentTab.data"
					:is="currentTab.data.component"
				/>
			</div>
		</div>
	</WFullscreenContainer>
</template>
