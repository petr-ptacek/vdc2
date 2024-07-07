import { reactiveOmit }                                                                            from "@vueuse/core";
import { LISTENERS }                                                                               from "./config";
import type { MultiselectConfig, VueMultiselectListeners, VueMultiselectProps, WMultiselectProps } from "./types";

export function useVueMultiselectProps(props: WMultiselectProps): VueMultiselectProps {
	const p = reactiveOmit<MultiselectConfig, keyof VueMultiselectListeners>(
		props.config ?? {},
		...Object.values(LISTENERS)
	);

	return {
		value: props.value,
		...p
	};

}
