export type WPaginationProps = {
	modelValue: number;
	totalPages: number;
};

export type WPaginationEmit = {
	"update:modelValue": [number];
}
