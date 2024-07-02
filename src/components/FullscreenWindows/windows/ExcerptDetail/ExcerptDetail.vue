<script setup lang="ts">
import { FullscreenContainer }   from "@/components/FullscreenContainer";
import { createTabs }            from "@/components/FullscreenWindows/windows/ExcerptDetail/helpers";
import type { TabItem }          from "@/components/FullscreenWindows/windows/ExcerptDetail/types";
import { NavHorizontal }         from "@/components/NavHorizontal";
import { useExcerptDetailStore } from "@/store";
import { storeToRefs }           from "pinia";
import { shallowRef }            from "vue";

const excerptDetailStore = useExcerptDetailStore();
const { opened, excerpt } = storeToRefs(excerptDetailStore);

const tabItems = shallowRef<TabItem[]>(createTabs());
const currentTab = shallowRef<TabItem>(tabItems.value[0]!);
</script>

<template>
	<FullscreenContainer
		v-if="opened"
		:opened="opened"
		@close="opened = false"
	>
		<template #title>
			{{ excerpt!.title }}
		</template>

		<div class="flex flex-col h-full">
			<div class="">
				<NavHorizontal
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
	</FullscreenContainer>
</template>
