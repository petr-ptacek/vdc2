<script setup lang="ts">
import {
	ComplexDatePicker,
	WAccordion,
	WDrawerContainer,
	WLeafletMap, WMultiselectTags
}                         from "@/components";
import { useAppStore }    from "@/store";
import TheAIHelp          from "./components/AIHelp.vue";
import { DrawerExcerpts } from "./components/DrawerExcerpts";
import TheExcerptDetail   from "./components/ExcerptDetail/App.vue";
import TheSearchResults
													from "./components/SearchResults/SearchResults.vue";
import TheHeader          from "./components/TheHeader.vue";

const appStore = useAppStore();
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<TheHeader />
		<TheSearchResults />

		<main class="flex-1 bg-yellow overflow-hidden relative">
			<WDrawerContainer
				class="absolute z-10 top-0 left-0 bottom-0 bg-white"
				dir="left-to-right"
				v-model:opened="appStore.drawerForms.opened"
			>
				<div class="h-full">
					<div class="flex h-full flex-col">
						<div class="flex-1 overflow-auto">
							<div class="py-4 px-4 space-y-2">
								<WAccordion>
									<template #title>
										<div class="font-bold">Obecné</div>
									</template>

									<div class="p-1.5">
										<div class="flex flex-col gap-1.5">
											<div>
												<label for="multiselect-tags-autor" class="uppercase text-[1.2rem]">
													<span class="">Autor</span>
												</label>
												<WMultiselectTags
													:config="{
												id: 'multiselect-tags-autor',
												placeholder: 'Autor'
											}"
												/>
											</div>

											<div>
												<label for="multiselect-tags-travelogue" class="uppercase text-[1.2rem]">
													<span class="">Cestopis</span>
												</label>

												<WMultiselectTags
													:config="{
												id: 'multiselect-tags-travelogue',
												placeholder: 'Cestopis'
											}"
												/>
											</div>

											<div>
												<label for="multiselect-tags-area" class="uppercase text-[1.2rem]">
													<span class="">Oblast</span>
												</label>

												<WMultiselectTags
													:config="{
												id: 'multiselect-tags-area',
												placeholder: 'Oblast'
											}"
												/>
											</div>

											<div>
												<label for="multiselect-tags-thema" class="uppercase text-[1.2rem]">
													<span class="">Téma</span>
												</label>

												<WMultiselectTags
													:config="{
												id: 'multiselect-tags-thema',
												placeholder: 'Téma'
											}"
												/>
											</div>

											<div>
												<label for="multiselect-tags-transport" class="uppercase text-[1.2rem]">
													<span class="">Doprava</span>
												</label>

												<WMultiselectTags
													:config="{
												id: 'multiselect-tags-transport',
												placeholder: 'Doprava'
											}"
												/>
											</div>
										</div>
									</div>
								</WAccordion>

								<WAccordion>
									<template #title>
										<div class="font-bold">Datum cesty</div>
									</template>

									<div class="p-1.5">
										<div class="flex flex-col gap-1.5">
											<div class="flex flex-col gap-1.5">
												<div class="text-gray uppercase">Od</div>
												<ComplexDatePicker />
											</div>

											<div class="flex flex-col gap-1.5">
												<div class="text-gray uppercase">Do</div>
												<ComplexDatePicker />
											</div>
										</div>
									</div>
								</WAccordion>

								<WAccordion>
									<template #title>
										<div class="font-bold">Datum sepsání</div>
									</template>

									<div class="p-1.5">
										<div class="flex flex-col gap-1.5">
											<div class="flex flex-col gap-1.5">
												<div class="text-gray uppercase">Od</div>
												<ComplexDatePicker />
											</div>

											<div class="flex flex-col gap-1.5">
												<div class="text-gray uppercase">Do</div>
												<ComplexDatePicker />
											</div>
										</div>
									</div>
								</WAccordion>

								<WAccordion>
									<template #title>
										<div class="font-bold">Datum vydání</div>
									</template>

									<div class="p-1.5">
										<div class="flex flex-col gap-1.5">
											<div class="flex flex-col gap-1.5">
												<div class="text-gray uppercase">Od</div>
												<ComplexDatePicker />
											</div>

											<div class="flex flex-col gap-1.5">
												<div class="text-gray uppercase">Do</div>
												<ComplexDatePicker />
											</div>
										</div>
									</div>
								</WAccordion>
							</div>
						</div>

						<div class="justify-self-end py-4 flex justify-center">
							<button class="btn btn--tertiary">Hledat</button>
						</div>
					</div>
				</div>
			</WDrawerContainer>


			<WLeafletMap
				class="w-full h-full absolute z-0"
				:center="[35.917973, 14.409943]"
				:zoom="5"
			/>

			<DrawerExcerpts class="absolute top-0 right-0 bottom-0" />
		</main>

		<teleport to="body">
			<TheAIHelp />
			<TheExcerptDetail />
		</teleport>
	</div>
</template>
