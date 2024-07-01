import { onUnmounted } from "vue";

type EventKey = string;
type HandlerFn<TArgs extends any[], TResult = any> = (...args: TArgs) => TResult;
type HandlersList<TArgs extends any[]> = Array<HandlerFn<TArgs>>;

export type EventsMap = Record<EventKey, any[]>;

export function useEmitter<Events extends EventsMap>() {
	const _eventsMap = new Map<keyof Events, HandlersList<[...any[]]>>();

	function on<TKey extends keyof Events>(key: TKey, handler: HandlerFn<Events[TKey]>) {
		const listeners = _eventsMap.get(key) ?? [];

		listeners.push(handler);
		_eventsMap.set(key, [...new Set(listeners)]);

		const unsubscribe = () => {
			off(key, handler);
		};

		onUnmounted(() => {
			console.log(`unmounted`);
			unsubscribe();
		});

		return unsubscribe;
	}

	function off<TKey extends keyof Events>(key: TKey, handler?: HandlerFn<Events[TKey]>) {
		if ( typeof handler === "undefined" ) {
			_eventsMap.delete(key);
			return;
		}

		const listeners = (_eventsMap.get(key) ?? []).filter(_handler => _handler !== handler);

		if ( listeners.length === 0 ) {
			_eventsMap.delete(key);
		} else {
			_eventsMap.set(key, listeners);
		}
	}

	function emit<TKey extends keyof Events>(key: TKey, ...args: Events[TKey]) {
		(_eventsMap.get(key) ?? []).forEach(handler => {
			handler(...args);
		});
	}

	function clearAll() {
		[..._eventsMap.keys()].forEach(key => off(key));
	}

	return {
		clearAll,
		on,
		off,
		emit
	};
}
