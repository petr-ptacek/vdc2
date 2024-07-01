export type NavHorizontalItem<T = any> = {
	id: string | number;
	label?: string;
	data?: T;
}

export type NavHorizontalProps<T = any> = {
	modelValue?: NavHorizontalItem<T> | null;
	items: NavHorizontalItem<T>[]
};

export type NavHorizontalEmits<T = any> = {
	"update:modelValue": [NavHorizontalItem<T>];
};
