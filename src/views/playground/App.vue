<script setup lang="ts">
import { type MultiselectConfig, WMultiselect, WMultiselectTags } from "@/components";
import { ref, shallowRef }                                        from "vue";

const options = ref([
	{ value: "batman", label: "Batman" },
	{ value: "robin", label: "Robin" },
	{ value: "joker", label: "Joker" }
]);
const value = ref([]);

const config = shallowRef<MultiselectConfig>({
	placeholder: "Select Tags ...",
	mode: "tags",
	valueProp: "value",
	closeOnSelect: false,
	createOption: true,
	searchable: true,
	options: options.value
});

function createHandler(option: any) {
	debugger
	// options.value.push(option);
}

</script>

<template>
	<div class="h-screen bg-brown-semi justify-center flex items-center">
		<!--		<pre class="">-->
		<!--			{{ value }}-->
		<!--		</pre>-->

		<div class="w-[600px]">
			<WMultiselectTags
				v-model="value"
			>

			</WMultiselectTags>
		</div>
	</div>
</template>
