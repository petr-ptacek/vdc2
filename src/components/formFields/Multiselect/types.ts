export type WMultiselectProps<TModelValue = any, TOption = TModelValue> = {
	modelValue: TModelValue;
	options?: TOption[];
	placeholder?: string;
	object?: boolean;
}

export type WMultiselectEmits<TModelValue = any> = {
	"update:modelValue": [WMultiselectProps<TModelValue>["modelValue"]]
}
