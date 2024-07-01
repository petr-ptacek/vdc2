export type Maybe<T> = T | undefined;
export type Nullable<T> = T | null;

export type Identifier = string | number;

export type CSSClassValue =
	string |
	Record<string, boolean> |
	null |
	undefined |
	CSSClassValue[];
