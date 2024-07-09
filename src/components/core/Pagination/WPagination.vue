<script setup lang="ts" generic="TItem = any">
import { WIcon }                                  from "@/components";
import { computed, ref }                          from "vue";
import type { WPaginationEmit, WPaginationProps } from "./types";

const props = withDefaults(
	defineProps<WPaginationProps<TItem>>(),
	{
		modelValue: undefined,
		items: () => []
	}
);
const emit = defineEmits<WPaginationEmit<TItem>>();

const _totalPagesCount = computed(() => {
	return props.totalPages ?? props.items.length;
});

const _currentPage = ref(props.value ?? 0);
const _currentPageModelValue = computed({
	get() {
		return typeof props.modelValue === "undefined" ?
					 _currentPage.value :
					 props.modelValue;
	},
	set(v: number) {
		if ( typeof props.modelValue === "undefined" ) {
			_currentPage.value = v;
		} else {
			emit("update:modelValue", v);
		}
	}
});

const _items = computed(
	() => {
		return Array.from(
			{ length: _totalPagesCount.value },
			(_, index) => ({
				id: window.crypto.randomUUID(),
				page: index + 1,
				isActive: index + 1 === _currentPageModelValue.value,
				ctx: props.items[index] ?? undefined
			})
		);
	}
);

const _visibleItems = computed(() => {
	return _items.value.length <= 3 ?
				 _items.value :
				 _items.value.slice(
					 Math.max(_currentPageModelValue.value - 2, 0),
					 Math.min(_currentPageModelValue.value + 1, _totalPagesCount.value)
				 );
});

const _visibleFirstItem = computed(() => {
	return !_visibleItems.value.some(i => i.page === 1);
});

const _visibleLastItem = computed(() => {
	return !_visibleItems.value.some(i => i.page === _totalPagesCount.value);
});

const _disabledArrowPrevious = computed(() => {
	return _currentPageModelValue.value - 1 < 1;
});

const _visibleArrowPrevious = computed(() => {
	return _items.value.length > 1;
});

const _disabledArrowNext = computed(() => {
	return _currentPageModelValue.value + 1 > _totalPagesCount.value;
});

const _visibleArrowNext = computed(() => {
	return _items.value.length > 1;
});

function goTo(nth: number) {
	_currentPageModelValue.value = nth;
	emit("navigate", { page: nth, data: props.items?.[nth] });
}
</script>

<template>
	<div class="list-view-pagination">
		<ul class="pagination">
			<li
				v-show="_visibleArrowPrevious"
				data-type="previous"
				class="pagination__item"
				:class="{ 'is-disabled': _disabledArrowPrevious }"
				@click="goTo(_currentPageModelValue - 1)"
			>
				<WIcon name="chevron-left" />
			</li>

			<!--FIRST-->
			<li
				v-show="_visibleFirstItem"
				data-type="nth"
				class="pagination__item"
				@click="goTo(1)"
			>
				<slot name="itemFirst" :page="1">
					<div>
						{{ 1 }}
					</div>
				</slot>
			</li>

			<li
				v-if="_visibleFirstItem"
				data-type="dots" class="pagination__item">
				<WIcon class="" name="three-dots" />
			</li>

			<li
				v-for="item in _visibleItems"
				:key="item.id"
				data-type="nth"
				class="pagination__item"
				:class="{ 'is-active': item.isActive }"
				@click="goTo(item.page)"
			>
				<slot
					name="item"
					:isActive="item.isActive"
					:item="item.ctx"
					:page="item.page"
				>
					<div>
						{{ item.page }}
					</div>
				</slot>
			</li>


			<li
				v-if="_visibleLastItem"
				data-type="dots" class="pagination__item">
				<WIcon class="" name="three-dots" />
			</li>

			<!--LAST-->
			<li
				v-show="_visibleLastItem"
				data-type="nth"
				class="pagination__item"
				@click="goTo(_totalPagesCount)"
			>
				<slot name="itemLast" :page="_totalPagesCount">
					<div>
						{{ _totalPagesCount }}
					</div>
				</slot>
			</li>

			<li
				v-show="_visibleArrowNext"
				data-type="next"
				class="pagination__item"
				:class="{ 'is-disabled': _disabledArrowNext }"
				@click="goTo(_currentPageModelValue + 1)"
			>
				<WIcon name="chevron-right" />
			</li>
		</ul>
	</div>
</template>
