<script setup lang="ts">
import HeaderBase       from "@/components/AppHeader/HeaderBase.vue";
import { AppIcon }      from "@/components/AppIcon";
import { DropdownMenu } from "@/components/DropdownMenu";
import { FormSearch }   from "@/components/FormSearch";

import { useAppStore } from "@/store";

const appStore = useAppStore();

function openDrawerForms() {
	appStore.toggleDrawerForms(true);
}
</script>

<template>
	<HeaderBase disable-arrow-back>
		<div class="flex flex-col flex-shrink w-full">
			<div class="flex">
				<div class="flex-1">
					<FormSearch class="w-full" />
				</div>

				<div class="ml-5">
					<DropdownMenu :items="[{ label: 'item-1' }, { label: 'item-2' }, { label: 'item-2'}]">
						<template #button="{ clickHandler }">
							<button class="btn btn--tertiary btn--circle" @click="clickHandler()">
								<AppIcon name="bars-3" size="regular" />
							</button>
						</template>
					</DropdownMenu>
				</div>
			</div>

			<div>
				<div
					class="text-[11px] flex w-fit items-center p-0.5 pb-0 italic text-brown-dark hover:text-brown-hover cursor-pointer"
					@click="openDrawerForms()"
				>
					<div>Jednotlivé parametry vyhledávání můžeš zadat do formuláře</div>
					<div>
						<AppIcon name="cursor-arrow-rays" :size="['1.8rem']" />
					</div>
				</div>
			</div>
		</div>
	</HeaderBase>
</template>
