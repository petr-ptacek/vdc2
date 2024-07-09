<script setup lang="ts">
import {
	WFullscreenContainer,
	WMultiselect,
	WNavHorizontal,
	WPagesStepper,
	WPagination,
	WResizerContainer
}                                from "@/components";
import { useExcerptDetailStore } from "@/store";
import {
	createTabs
}                                from "@/views/home/components/ExcerptDetail/helpers";
import type {
	TabItem
}                                from "@/views/home/components/ExcerptDetail/types";
import { storeToRefs }           from "pinia";
import { shallowRef }            from "vue";

const excerptDetailStore = useExcerptDetailStore();
const { opened, excerpt } = storeToRefs(excerptDetailStore);

const tabItems = shallowRef<TabItem[]>(createTabs());
const currentTab = shallowRef<TabItem>(tabItems.value[0]!);
</script>

<template>
	<WFullscreenContainer
		class="excerptDetail"
		v-if="opened"
		:opened="opened"
		@close="opened = false"
		style="--header-padding-x: 3rem; --body-padding-x: 0; --body-padding-y: 0;"
	>
		<template #title>
			<div>Název Úryvku</div>
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

					<div class="flex-1 flex flex-col pt-5">
						<div class="flex-1">
							<component
								v-if="currentTab.data"
								:is="currentTab.data.component"
							/>
						</div>

						<div class="flex justify-center pb-6">
							<WPagination :total-pages="40" :value="3" />
						</div>
					</div>
				</div>
			</template>

			<template #right>
				<div class="h-full w-full flex flex-col">
					<div>
						<WMultiselect
							style="--ms-border-width:0px; --ms-py: 1.8rem;"
							:config="{
								placeholder: 'Cestopisy daného úryvku',
								options: Array.from({length:4}, (_,i)=> `Cestopis ${i}`)
							}"
						/>
					</div>
					<div class="flex-1">
						<WPagesStepper
							hide-add-btn
							:max="104"
							:min="0"
							:model-value="0"
							img-alt="Page ..."
							img-src="https://vdc.olc.cz/media/saved_pages/dd871e73-50fa-4e6c-9dfb-f11300c34de3/4bb9d779-435e-11dd-b505-00145e5790ea_koGygSo.jpg"
						/>
					</div>

				</div>
			</template>

		</WResizerContainer>
	</WFullscreenContainer>
</template>
