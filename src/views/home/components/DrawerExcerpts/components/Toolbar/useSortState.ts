import type { WIconProps }                from "@/components";
import { computed, readonly, ref, watch } from "vue";

export type SortDirection = "asc" | "desc" | "none";

export type UseSortStateReturn = ReturnType<typeof useSortState>;
export type UseSortStateOptions = {
	dir?: SortDirection;
	onChange?: (dir: SortDirection) => void | false;
}

const _direction: Record<number, SortDirection> = {
	0: "none",
	1: "asc",
	2: "desc"
} as const;

function _resolveIcon(dir: SortDirection): WIconProps["name"] {
	switch ( dir ) {
		case "asc":
			return "bars-arrow-up";
		case "desc":
			return "bars-arrow-down";
		case "none":
			return "chevron-up-down";
	}
}

export function useSortState(options?: UseSortStateOptions) {
	const _idx = ref(0);
	const _nextIdx = computed(() => {
		return _idx.value + 1 > 2 ? 0 : _idx.value + 1;
	});
	const nexDirection = computed(() => {
		return _direction[_nextIdx.value];
	});
	const direction = ref<SortDirection>(options?.dir ?? "none");
	const sortIcon = ref<WIconProps["name"]>(_resolveIcon(direction.value));
	const sortActive = computed(() => {
		return ["asc", "desc"].includes(direction.value);
	});

	watch(() => direction.value, () => {
		sortIcon.value = _resolveIcon(direction.value);
	});

	function _incrementIdx() {
		_idx.value = _idx.value + 1 > 2 ? 0 : _idx.value + 1;
		return _idx.value;
	}

	// function _decrementIdx() {
	// 	_idx = _idx - 1 < 0 ? 2 : _idx - 1;
	// 	return _idx;
	// }

	function change(dir: SortDirection) {
		if ( options?.onChange?.(dir) !== false ) {
			direction.value = dir;
		}
	}

	function toggle() {
		change(_direction[_incrementIdx()]);
	}

	return {
		change,
		toggle,
		sortActive,
		nexDirection,
		direction: readonly(direction),
		sortIcon: readonly(sortIcon)
	};
}
