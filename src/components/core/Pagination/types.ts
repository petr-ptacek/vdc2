export type WPaginationProps<TItem = any> = {
	value?: number;
	modelValue?: number;
	totalPages?: number;
	items?: TItem[];
};

export type WPaginationEmit<TItem = any> = {
	"update:modelValue": [number];
	"navigate": [{ page: number, data: TItem }];
}
