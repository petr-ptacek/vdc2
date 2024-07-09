<script setup lang="ts">
import { WFullscreenContainer, WNavHorizontal, WResizerContainer } from "@/components";
import { useExcerptDetailStore }                                   from "@/store";
import { createTabs }                                              from "@/views/home/components/ExcerptDetail/helpers";
import type { TabItem }                                            from "@/views/home/components/ExcerptDetail/types";
import { storeToRefs }                                             from "pinia";
import { shallowRef }                                              from "vue";

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
		style="--header-padding-x: 3rem; --header-padding-y: 1.5rem; --body-padding-x: 0; --body-padding-y: 0;"
	>
		<template #title>
			<div>Název Cestopisu</div>
		</template>

		<!--Content-->
		<WResizerContainer>

			<template #left>
				<div class="px-12 h-full w-full  flex flex-col overflow-x-auto">
					<WNavHorizontal
						:items="tabItems"
						v-model="currentTab"
					>
						<template #default="{ item }">
							<div class="text-nowrap whitespace-nowrap">
								{{ item.label }}
							</div>
						</template>
					</WNavHorizontal>

					<div class="flex-1 flex flex-col">
						<div class="flex-1">
							<component
								v-if="currentTab.data"
								:is="currentTab.data.component"
							/>
						</div>
						<div class="">
							<!--Pagination-->
						</div>
					</div>
				</div>
			</template>

			<template #right>
				<div class="h-full w-full">
					Page Detail here
				</div>
			</template>

		</WResizerContainer>
	</WFullscreenContainer>
</template>
