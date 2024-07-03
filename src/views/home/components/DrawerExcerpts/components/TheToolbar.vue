<script setup lang="ts">
import { WDrawerContainer, WIcon, WMultiselect } from "@/components";
import { ref }                                   from "vue";

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
</script>

<template>
	<div class="flex flex-col gap-4">
		<div class="flex items-center gap-4">
			<WMultiselect
				v-model="selectedUser"
				:options="selectOptions"
				object
				placeholder="Vyhledat dle cestopisu"
			/>

			<div>
				<button class="btn btn--secondary px-4 py-3">
					<WIcon name="chevron-up" size="sm" />
					<WIcon name="chevron-down" size="sm" />
				</button>
			</div>
		</div>

		<div>
			<WDrawerContainer dir="top-to-bottom" size="8rem">
				<div class="flex h-full items-center justify-center gap-4">
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
