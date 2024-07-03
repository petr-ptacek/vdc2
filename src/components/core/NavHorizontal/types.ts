export type NavHorizontalItem<T = any> = {
	id: string | number;
	label?: string;
	data?: T;
}

export type WNavHorizontalProps<T = any> = {
	modelValue?: NavHorizontalItem<T> | null;
	items: NavHorizontalItem<T>[]
};

export type WNavHorizontalEmits<T = any> = {
	"update:modelValue": [NavHorizontalItem<T>];
};
