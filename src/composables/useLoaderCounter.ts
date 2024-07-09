import { useCounter }            from "@vueuse/core";
import type { ComputedRef, Ref } from "vue";
import { computed, readonly }    from "vue";

export type UseLoaderCounterReturn = {
	show: () => void;
	hide: () => void;
	visible: ComputedRef<boolean>;
	counter: Readonly<Ref<number>>
}

export function useLoaderCounter(): UseLoaderCounterReturn {
	const counter = useCounter(0, { min: 0 });
	const visible = computed(() => {
		return counter.count.value > 0;
	});

	function show() {
		counter.inc(1);
	}

	function hide() {
		const delta = (counter.count.value - 1) < 0 ? 0 : 1;
		counter.dec(delta);
	}

	return {
		counter: readonly(counter.count),
		visible,
		show,
		hide
	};
}
