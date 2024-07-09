import type { MaybeRefOrGetter, WritableComputedRef }             from "vue";
import type { UseValueDebouncedOptions, UseValueDebouncedReturn } from "./useValueDebounced";
import { useValueDebounced }                                      from "./useValueDebounced";

export interface UseVModelDebouncedOptions<T = any> extends UseValueDebouncedOptions {
	emitUpdate?: boolean;
	emitInput?: boolean;
	onSetValue?: (value: T) => void;
}

export type UseVModelDebouncedReturn<T = any> = {
	modelValue: WritableComputedRef<T>;
	cancel: UseValueDebouncedReturn["cancel"];
};

export function useVModelDebounced<
	TValue,
	TEmits extends (event: any, ...args: any[]) => void = (event: any, ...args: any[]) => void>
(
	value: MaybeRefOrGetter<TValue>,
	key: string,
	emit: TEmits,
	options?: UseVModelDebouncedOptions
): UseVModelDebouncedReturn<TValue> {
	const {
		debounceTimeout = 350,
		emitInput = true,
		emitUpdate = true,
		onSetValue
	} = options ?? {};

	const valueDebounced = useValueDebounced(
		value,
		(v: TValue) => {
			emitUpdate && emit(`update:${ key }`, v);
			emitInput && emit("input", v);
			onSetValue?.(v);
		},
		{
			debounceTimeout
		}
	);

	return {
		modelValue: valueDebounced.value,
		cancel: valueDebounced.cancel
	};
}
