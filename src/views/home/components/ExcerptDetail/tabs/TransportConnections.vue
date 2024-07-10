<script setup lang="ts">
import { WAccordion, WIcon } from "@/components";
</script>

<template>
	<div class="flex gap-4 flex-col">
		<WAccordion _opened title="Způsob dopravy" header-clickable>
			<div class="flex gap-[10rem]">
				<div class="flex justify-center flex-col">
					<div class="italic text-[10px] justify-self-start">
						Geolokace
					</div>
					<div>
						Albánie
					</div>
				</div>

				<div class=" flex-1 flex flex-col">
					<div class="italic text-[10px]">
						Doprava
					</div>

					<div class="space-y-1.5">
						<div class="px-2 py-1 text-center rounded-xl" style="background-color: #26c08e;">kůň</div>
						<div class="px-2 py-1 text-center rounded-xl" style="background-color: #26c08e;">osel</div>
						<div class="px-2 py-1 text-center rounded-xl" style="background-color: cadetblue">vlak</div>
						<div class="px-2 py-1 text-center rounded-xl" style="background-color: cadetblue;">letadlo</div>
						<div class="px-2 py-1 text-center rounded-xl" style="background-color: cadetblue">parnik</div>
						<div class="px-2 py-1 text-center rounded-xl" style="background-color: brown">pěšky</div>
					</div>
				</div>
			</div>
		</WAccordion>

		<WAccordion _opened title="Vazby mezi úryvky" header-clickable>
			<div class="flex flex-col w-full items-center gap-1.5">
				<div class="w-full flex">
					<div class="flex-1 text-center">
						<a href="#">Skočidjevojka (= Skočiđevojka), bod</a>
					</div>
					<div class="px-12">
						<WIcon name="arrow-right" />
					</div>
					<div class="flex-1 text-center"><a href="#">Albanie</a></div>
				</div>

				<div class="w-full flex">
					<div class="flex-1 text-center"><a href="#">Manastýr Stanjevići, bod</a></div>
					<div class="px-12">
						<WIcon name="arrow-right" />
					</div>
					<div class="flex-1 text-center"><a href="#">Albanie</a></div>
				</div>
			</div>
		</WAccordion>
	</div>
</template>
