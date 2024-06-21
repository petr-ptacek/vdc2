import type { MaybeRef } from "vue";
import { toValue }       from "vue";

type _Position = { x: number; y: number };

export function getPositionRelativeTo(position: MaybeRef<_Position>, container: MaybeRef<HTMLElement>): _Position {
	const _position = toValue(position);
	const _container = toValue(container);

	const rect = _container.getBoundingClientRect();

	return {
		x: _position.x - rect.x,
		y: _position.y - rect.y
	};
}
