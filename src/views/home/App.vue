<script setup lang="ts">
import {
	ComplexDatePicker,
	WAccordion,
	WDrawerContainer,
	WLeafletMap
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
				<div class="h-full overflow-auto">
					<div class="space-y-2 py-2 px-4">
						<WAccordion>
							<template #title>
								<div class="font-bold">Obecné</div>
							</template>

							<div class="p-1.5">
								<div class="flex flex-col gap-1.5">
									<div>
										<div class="text-gray uppercase text-sm">Autor</div>

										<label class="form-field">
											<input type="email" name="email" autocomplete="off" />
										</label>
									</div>

									<div>
										<div class="text-gray uppercase text-sm">Cestopis</div>

										<label class="form-field">
											<input type="email" name="email" autocomplete="off" />
										</label>
									</div>

									<div>
										<div class="text-gray uppercase text-sm">Oblast</div>

										<label class="form-field">
											<input type="email" name="email" autocomplete="off" />
										</label>
									</div>

									<div>
										<div class="text-gray uppercase text-sm">Téma</div>

										<label class="form-field">
											<input type="email" name="email" autocomplete="off" />
										</label>
									</div>

									<div>
										<div class="text-gray uppercase text-sm">Doprava</div>

										<label class="form-field">
											<input type="email" name="email" autocomplete="off" />
										</label>
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
