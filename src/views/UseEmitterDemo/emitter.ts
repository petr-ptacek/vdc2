import { useEmitter } from "@/composables";

export const emitter = useEmitter<{
	delete: [number],
	message: [string]
}>();

