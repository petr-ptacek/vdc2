export type MenuHorizontalItem<T = any> = {
	id: string | number;
	label?: string;
	data?: T;
}

export type MenuHorizontalProps<T = any> = {
	modelValue?: MenuHorizontalItem<T> | null;
	items: MenuHorizontalItem<T>[]
};

export type MenuHorizontalEmits<T = any> = {
	"update:modelValue": [MenuHorizontalItem<T>];
};
