export type DropdownMenuItem = {
	label: string;
	onClick?: () => false | void;
}

export type DropdownMenuProps = {
	items?: DropdownMenuItem[];
};

