<script setup lang="ts">
import { DrawerContainer }     from "@/components";
import AppHeader               from "@/components/AppHeader.vue";
import ComplexDatePicker       from "@/components/ComplexDatePicker/ComplexDatePicker.vue";
import { FullscreenContainer } from "@/components/FullscreenContainer";
import LeafletMapContainer     from "@/components/LeafletMapContainer/LeafletMapContainer.vue";
import { useAppStore }         from "@/store";

const appStore = useAppStore();
</script>

<template>
	<div class="h-screen w-full flex flex-col">
		<AppHeader class="flex-shrink-0 flex-grow-0" />
		<main class="flex-1 bg-yellow overflow-hidden relative">
			<DrawerContainer
				class="absolute z-10 top-0 left-0 bottom-0 bg-white"
				dir="left-to-right"
				v-model:opened="appStore.drawerForms.opened"
			>
				<div class="h-full overflow-auto">
					<div class="space-y-2 py-2 px-4">
						<AppAccordion>
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
						</AppAccordion>

						<AppAccordion>
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
						</AppAccordion>

						<AppAccordion>
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
						</AppAccordion>

						<AppAccordion>
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
						</AppAccordion>
					</div>
				</div>
			</DrawerContainer>

			<LeafletMapContainer class="w-full h-full absolute z-0" />

			<DrawerContainer
				class="absolute z-10 top-0 right-0 bottom-0 bg-white"
				dir="right-to-left"
			>
				<div class="py-2 px-4 h-full overflow-auto">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores libero magnam numquam optio, repellat
						 repudiandae.</p>
				</div>
			</DrawerContainer>
		</main>

		<teleport to="body">
			<FullscreenContainer
				v-model:opened="appStore.modalWindowHowToUseAI.opened"
			>
				<template #title>
					<div class="flex items-center gap-4">
						<div>
							Jak používat AI
						</div>

						<AppIcon name="ai-network" size="xl" />
					</div>
				</template>

				<div class="h-full py-4">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At iste quaerat quis. Cumque delectus dolorum ea
						 enim in necessitatibus, quaerat quia! Amet architecto blanditiis deleniti dolor doloremque eius expedita,
						 fugit ipsam magni minus provident quam quas reprehenderit totam ut, velit veniam? Autem ex explicabo magnam
						 maxime minus ratione, vitae voluptatum!</p>
				</div>
			</FullscreenContainer>
		</teleport>
	</div>
</template>
