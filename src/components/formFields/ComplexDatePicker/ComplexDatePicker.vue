<template>
	<div class="complex-date-picker">
		<label class="form-field flex items-center">
			<select :disabled="disabled" v-model="instance.type">
				<option
					:value="option.id" v-text="option.description"
					v-for="option in typeOptions"></option>
			</select>
			<button
				:disabled="disabled"
				class="ml-1"
				@click="reset"
				title="Vyčistit">
				<span>&cross;</span>
			</button>
		</label>

		<label class="form-field flex mt-1" v-if="instance?.type === 'century'">
			<select :disabled="disabled" v-model="instance.part" class="">
				<option
					:value="option.id" v-text="option.description"
					v-for="option in partOptions"></option>
			</select>
			<select :disabled="disabled" v-model="instance.century" class="ml-1 mr-2">
				<option
					:value="option.id" v-text="option.description"
					v-for="option in centuryOptions"></option>
			</select>
		</label>
		<label class="form-field flex mt-1" v-if="instance?.type === 'year'">
			<select :disabled="disabled" v-model="instance.part" class="mr-1 ">
				<option
					:value="option.id" v-text="option.description"
					v-for="option in partOptions"></option>
			</select>
			<input
				v-model="instance.year"
				:min="yearBounds.min"
				:max="yearBounds.max"
				class="mr-2"
				type="number"
				:disabled="disabled" />
		</label>
		<label class="form-field flex mt-1" v-if="instance?.type === 'date'">
			<input
				v-model="instance.date"
				type="date"
				class="mr-2"
				:disabled="disabled" />
		</label>
		<div class="form-field mt-1" v-if="showApproximatelyCheckbox">
			<input :id="randomId" type="checkbox" :disabled="disabled" v-model="instance.approximately">
			<label :for="randomId" class="label-checkbox">Odhad</label>
		</div>
		<div class="text-warning" v-for="error in errors" v-text="error"></div>

	</div>
</template>


<script>
import baseInput from "./baseInput.js";

export default {
	name: "ComplexDatePicker",
	mixins: [baseInput],
	props: {
		modelValue: {
			type: Object
		}
	},
	emits: ["update:modelValue"],
	data() {
		return {
			instance: this.modelValue || { "type": "date" },
			randomId: Math.floor(Math.random() * Date.now()).toString(36)
		};
	},
	computed: {
		showApproximatelyCheckbox() {
			return ["century", "year"].includes(this.instance.type);
		},
		typeOptions() {
			return [
				{ "id": "date", "description": "Datum" },
				{ "id": "year", "description": "Rok" },
				{ "id": "century", "description": "Století" }
			];
		},
		partOptions() {
			let options = [
				"", "1/4", "2/4", "3/4", "4/4", "1/3", "2/3", "3/3", "1/2", "2/2"
			];
			return options.map((o) => {
				return { "id": o, "description": o };
			});
		},
		yearBounds() {
			let todayYear = new Date().getFullYear();
			return {
				min: 1400,
				max: todayYear
			};
		},
		centuryOptions() {
			let options = [];
			// let maxCentury = Math.ceil(new Date().getFullYear() / 100);
			let maxCentury = 20;
			for ( let i = 15; i <= maxCentury; i++ ) {
				options.push({
					"id": i, "description": `${ i }. století`
				});
			}
			return options;
		}

	},
	methods: {
		reset() {
			this.instance = {
				"type": "date"
			};
		}
	},
	watch: {
		instance: {
			deep: true,
			handler(v) {
				this.$emit("update:modelValue", v);
			}
		},
		modelValue: {
			deep: true,
			handler(v) {
				this.instance = v || { "type": "date" };
			}
		}
	}
};
</script>
