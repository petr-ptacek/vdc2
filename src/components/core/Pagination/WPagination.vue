<script setup lang="ts">
import { WIcon }                                  from "@/components";
import type { WPaginationEmit, WPaginationProps } from "./types";
import { computed }                               from "vue";

const props = defineProps<WPaginationProps>();
const emit = defineEmits<WPaginationEmit>();

const currentPage = computed({
	get() {
		return props.modelValue;
	},
	set(v: number) {
		emit("update:modelValue", v);
	}
});

const items = computed(
	() => {
		return Array.from(
			{ length: props.totalPages },
			(_, index) => ({
				page: index + 1,
				isActive: index + 1 === currentPage.value
			})
		);
	}
);

const visibleItems = computed(() => {
	return items.value.length <= 3 ?
				 items.value :
				 items.value.slice(
					 Math.max(currentPage.value - 2, 0),
					 Math.min(currentPage.value + 1, props.totalPages)
				 );
});

const visibleFirstItem = computed(() => {
	return !visibleItems.value.some(i => i.page === 1);
});

const visibleLastItem = computed(() => {
	return !visibleItems.value.some(i => i.page === props.totalPages);
});

const disabledArrowPrevious = computed(() => {
	return currentPage.value - 1 < 1;
});

const visibleArrowPrevious = computed(() => {
	return items.value.length > 1;
});

const disabledArrowNext = computed(() => {
	return currentPage.value + 1 > props.totalPages;
});

const visibleArrowNext = computed(() => {
	return items.value.length > 1;
});

function goTo(nth: number) {
	currentPage.value = nth;
}
</script>

<template>
	<div class="list-view-pagination">
		<ul class="pagination">
			<li
				v-show="visibleArrowPrevious"
				data-type="previous"
				class="pagination__item"
				:class="{ 'is-disabled': disabledArrowPrevious }"
				@click="goTo(modelValue - 1)"
			>
				<WIcon class="page-link" name="chevron-left" />
			</li>

			<!--FIRST-->
			<li
				v-show="visibleFirstItem"
				data-type="nth"
				class="pagination__item"
				@click="goTo(1)"
			>
        <span class="page-link">
          {{ 1 }}
        </span>
			</li>

			<li
				v-if="visibleFirstItem"
				data-type="dots" class="pagination__item">
				<WIcon class="" name="three-dots" />
			</li>

			<li
				v-for="i in visibleItems"
				:key="i.page"
				data-type="nth"
				class="pagination__item"
				:class="{ 'is-active': i.isActive }"
				@click="goTo(i.page)"
			>
        <span>
          {{ i.page }}
        </span>
			</li>


			<li
				v-if="visibleLastItem"
				data-type="dots" class="pagination__item">
				<WIcon class="" name="three-dots" />
			</li>

			<!--LAST-->
			<li
				v-show="visibleLastItem"
				data-type="nth"
				class="pagination__item"
				@click="goTo(totalPages)"
			>
        <span class="page-link">
          {{ totalPages }}
        </span>
			</li>

			<li
				v-show="visibleArrowNext"
				data-type="next"
				class="pagination__item"
				:class="{ 'is-disabled': disabledArrowNext }"
				@click="goTo(modelValue + 1)"
			>
				<WIcon class="page-link" name="chevron-right" />
			</li>
		</ul>
	</div>
</template>
