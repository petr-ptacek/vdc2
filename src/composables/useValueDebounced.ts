import type { DebouncedFunc }                         from "lodash-es";
import { debounce }                                   from "lodash-es";
import type { MaybeRefOrGetter, WritableComputedRef } from "vue";
import { computed, onUnmounted, toValue }             from "vue";

export type UseValueDebouncedReturn<T = any> = {
	value: WritableComputedRef<T>;
	cancel: DebouncedFunc<any>["cancel"];
};

export type UseValueDebouncedOptions = {
	debounceTimeout?: number;
};

export function useValueDebounced<TValue = any>(
	value: MaybeRefOrGetter<TValue>,
	onSetValue: (value: TValue) => void,
	options?: UseValueDebouncedOptions
): UseValueDebouncedReturn<TValue> {
	const {
		debounceTimeout = 350
	} = options ?? {};

	const setValueDebounced = debounce(
		(v: TValue) => {
			onSetValue(v);
		},
		debounceTimeout
	);

	const _modelValue = computed<TValue>({
		get() {
			return toValue(value);
		},
		set(v: TValue) {
			setValueDebounced(v);
		}
	});

	onUnmounted(() => {
		setValueDebounced.cancel();
	});

	return {
		value: _modelValue,
		cancel: setValueDebounced.cancel
	};
}
