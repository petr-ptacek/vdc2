export type DropdownMenuItem = {
	label: string;
	onClick?: () => false | void;
}

export type WDropdownMenuProps = {
	items?: DropdownMenuItem[];
};

