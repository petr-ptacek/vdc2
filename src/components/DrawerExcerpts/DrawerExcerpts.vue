<script setup lang="ts">
import { DrawerContainer } from "@/components";

</script>

<template>
	<DrawerContainer
		class="bg-white"
		dir="right-to-left"
		size="30vw"
	>
		<div class="h-full overflow-auto">
			<ul class="">
				<li class="border-b border-brown-inputBorder">
					<div class="py-4 px-4 flex flex-col gap-2 bg-white hover:bg-brown-semi text-[1.2rem]">
						<div class="flex gap-2 items-center">
							<div class="font-semibold">Název:</div>
							<div>Syra, Hermupolis</div>
						</div>

						<div class="flex gap-2 items-center">
							<div class="font-semibold">Stav:</div>
							<div>Rozpracovaný</div>
						</div>

						<div class="flex gap-2 flex-col justify-center">
							<div class="font-semibold">Témata:</div>
							<div class="flex gap-2">
								<div class="bg-secondary text-white rounded-xl p-2 font-bold">Vztah Místních Obyvatel K Přírodě A Životnímu Prostředí</div>
								<div class="bg-secondary text-white rounded-xl p-2 font-bold">Trávení volného času</div>
							</div>
						</div>

						<div class="flex gap-2 items-center">
							<div class="font-semibold">Poznámka:</div>
							<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus cumque excepturi hic impedit
									 minus saepe?
							</div>
						</div>
					</div>
				</li>

				<li>
					<div class="py-4 px-4 flex flex-col gap-2 bg-white hover:bg-brown-semi text-[1.2rem]">
						<div class="flex gap-2 items-center">
							<div class="font-semibold">Název:</div>
							<div>Syra, Hermupolis</div>
						</div>

						<div class="flex gap-2 items-center">
							<div class="font-semibold">Stav:</div>
							<div>Rozpracovaný</div>
						</div>

						<div class="flex gap-2 flex-col justify-center">
							<div class="font-semibold">Témata:</div>
							<div class="flex gap-2">
								<div class="bg-secondary text-white rounded-xl p-2 font-bold">Vztah Místních Obyvatel K Přírodě A Životnímu Prostředí</div>
								<div class="bg-secondary text-white rounded-xl p-2 font-bold">Trávení volného času</div>
							</div>
						</div>

						<div class="flex gap-2 items-center">
							<div class="font-semibold">Poznámka:</div>
							<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus cumque excepturi hic impedit
									 minus saepe?
							</div>
						</div>
					</div>
				</li>
			</ul>

		</div>
	</DrawerContainer>
</template>
