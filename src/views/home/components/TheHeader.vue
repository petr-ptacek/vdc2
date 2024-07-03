<script setup lang="ts">
import { type DropdownMenuItem, WAppHeader, WIcon } from "@/components";
import WDropdownMenu                                from "@/components/core/DropdownMenu/WDropdownMenu.vue";
import { useAppStore }                              from "@/store";
import { useRouter }                                from "vue-router";
import TheFormAISearch                              from "./FormAISearch/FormAISearch.vue";

const appStore = useAppStore();
const router = useRouter();

const dropdownItems: DropdownMenuItem[] = [
	{
		label: "O projektu",
		onClick() {
			router.push({ name: "about-project" });
		}
	},
	{
		label: "Seznam cestopisů",
		onClick() {
			router.push({ name: "travelogues-list" });
		}
	}
];

</script>

<template>
	<WAppHeader disable-arrow-back>
		<div class="flex flex-col flex-shrink w-full">
			<div class="flex">
				<div class="flex-1">
					<TheFormAISearch class="w-full" />
				</div>

				<div class="ml-5">
					<WDropdownMenu :items="dropdownItems">
						<template #button="{ clickHandler }">
							<button class="btn btn--tertiary btn--circle" @click="clickHandler()">
								<WIcon name="bars-3" size="regular" />
							</button>
						</template>
					</WDropdownMenu>
				</div>
			</div>

			<div>
				<div
					class="text-[11px] flex w-fit items-center p-0.5 pb-0 italic text-brown-dark hover:text-brown-hover cursor-pointer"
					@click="appStore.toggleDrawerForms(true)"
				>
					<div>Jednotlivé parametry vyhledávání můžeš zadat do formuláře</div>
					<div>
						<WIcon name="cursor-arrow-rays" :size="['1.8rem']" />
					</div>
				</div>
			</div>
		</div>
	</WAppHeader>
</template>
