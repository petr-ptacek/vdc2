<script setup lang="ts">
import { WDrawerContainer, WIcon, WMultiselect } from "@/components";
import { reactive, ref }                         from "vue";
import SortButton                                from "./SortButton.vue";
import { useSortState }                          from "./useSortState";

const sortState = reactive(useSortState({ dir: "none" }));

type User = {
	id: string;
	label: string;
}

const selectOptions: User[] = [
	{
		id: "1",
		label: "Cestopis 1"
	},
	{
		id: "2",
		label: "Cestopis 2"
	},
	{
		id: "3",
		label: "Cestopis 3"
	}
];

const selectedUser = ref(null);

const extendedOptionsOpened = ref(false);
</script>

<template>
	<div class="flex flex-col gap-4">
		<div class="flex items-center gap-4">
			<SortButton
				:active="sortState.sortActive"
				:sort-icon="sortState.sortIcon"
				@click="sortState.toggle()"
			/>

			<WMultiselect
				v-model="selectedUser"
				:options="selectOptions"
				object
				placeholder="Vyhledat dle cestopisu"
			/>
		</div>

		<div>
			<div class="h-[0rem] shadow-[0_2px_4px] shadow-primary bg-brown-semi relative">
				<button
					class="transition-transform rounded-full w-fit h-fit absolute text-secondary left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
					:class="{
						'rotate-180': extendedOptionsOpened
					}"
					@click="extendedOptionsOpened = !extendedOptionsOpened"
				>
					<WIcon
						name="chevron-down"
						size="2xl"
					/>
				</button>
			</div>

			<WDrawerContainer
				disable-resizer-line
				disable-open-button
				:opened="extendedOptionsOpened"
				dir="top-to-bottom"
				size="6rem"
			>
				<div class="flex h-full items-end justify-center gap-4">
					<button class="btn btn--secondary btn--circle w-fit h-fit">
						<WIcon name="printer" size="md" />
					</button>
					<button class="btn btn--secondary btn--circle w-fit h-fit">
						<WIcon name="document-arrow-up" size="md" />
					</button>
				</div>
			</WDrawerContainer>
		</div>
	</div>
</template>
