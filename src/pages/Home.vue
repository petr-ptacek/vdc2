<script setup lang="ts">
import AppFooter               from "@/components/AppFooter.vue";
import AppHeader               from "@/components/AppHeader.vue";
import ComplexDatePicker       from "@/components/ComplexDatePicker/ComplexDatePicker.vue";
import LeafletMapContainer     from "@/components/LeafletMapContainer/LeafletMapContainer.vue";
import { ResizeableContainer } from "@/components/ResizeableContainer";
import { ref }                 from "vue";

const accordionsStates = ref(Array.from({ length: 6 }, () => true));
const cities = ref([
	{
		title: "London",
		url: "https://t4.ftcdn.net/jpg/02/57/75/51/360_F_257755130_JgTlcqTFxabsIKgIYLAhOFEFYmNgwyJ6.jpg"
	},
	{
		title: "Paris",
		url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIJmZVzi5O87m-FGSTtr_l3ZilQFIuS5lslg&s"
	},
	{
		title: "Roma",
		url: "https://www.barcelo.com/guia-turismo/wp-content/uploads/2020/01/coliseo-romano.jpg"
	}
]);
</script>

<template>
	<div class="h-screen w-full flex flex-col">
		<AppHeader class="flex-shrink-0 flex-grow-0" />
		<main class="flex-1 bg-yellow overflow-hidden">
			<ResizeableContainer class="bg-brown-light" :ratio-percentage="[18,82]" behaviour="collapse-only">
				<template #contentLeft>
					<div class="h-full overflow-auto">
						<div class="space-y-2 py-2 px-1">
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
				</template>
				<template #contentRight>
					<ResizeableContainer behaviour="expand-only" locked-section="left" :ratio-percentage="[82,18]">
						<template #contentLeft>
							<div class="bg-brown h-full w-full">
								<LeafletMapContainer />
							</div>
						</template>

						<template #contentRight>
							<div class="p-2 overflow-auto">
								<ul class="space-y-2">
									<li v-for="city in cities" :key="city.title">
										<div class="flex flex-col gap-2 rounded bg-brown-input p-1.5">
											<div class="font-bold">{{ city.title }}</div>

											<div>
												<img :src="city.url" :alt="city.title" class="object-cover aspect-auto">
											</div>
										</div>
									</li>
								</ul>
							</div>
						</template>
					</ResizeableContainer>

				</template>
			</ResizeableContainer>
		</main>
		<AppFooter />
	</div>
</template>
