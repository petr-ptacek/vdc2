import type { WMultiselectProps }       from "@/components";
import { LISTENERS }                    from "@/components/formFields/Multiselect/config";
import { reactivePick }                 from "@vueuse/core";
import type { VueMultiselectListeners } from "./types";

export function useVueMultiselectListeners(props: WMultiselectProps): VueMultiselectListeners {
	return reactivePick(
		props.config ?? {},
		...Object.values(LISTENERS)
	);
}
