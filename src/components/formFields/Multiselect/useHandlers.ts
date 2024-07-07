export function useHandlers(emit: Function) {
	return {
		"change": (value: any, instance: object): object | void => {
			emit("change", value, instance);
		},
		"select": (value: any, option: any, instance: object): object | void => {
			emit("select", value, option, instance);
		},
		"deselect": (value: any, option: any, instance: object): object | void => {
			emit("deselect", value, option, instance);
		},
		"search-change": (query: string, instance: object): object | void => {
			emit("search-change", query, instance);
		},
		"tag": (option: any, instance: object): object | void => {
			emit("tag", option, instance);
		},
		"option": (option: any, instance: object): object | void => {
			emit("option", option, instance);
		},
		"create": (option: any, instance: object): object | void => {
			emit("create", option, instance);
		},
		"paste": (e: Event, instance: object): object | void => {
			emit("paste", e, instance);
		},
		"keydown": (e: Event, instance: object): object | void => {
			emit("keydown", e, instance);
		},
		"keyup": (e: Event, instance: object): object | void => {
			emit("keyup", e, instance);
		},
		"open": (instance: object): object | void => {
			emit("open", instance);
		},
		"close": (instance: object): object | void => {
			emit("close", instance);
		},
		"clear": (instance: object): object | void => {
			emit("clear", instance);
		},
		"max": (instance: object): object | void => {
			emit("max", instance);
		}
	};
}
