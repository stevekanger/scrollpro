// src/utils/createListeners.ts
/**
* Creates the event listeners.
*
* @param events - The listener events
*
* @typeParam EventsData - A map of the event keys and that events emit data
*/
function createListeners(events) {
	function on(event, listener) {
		events[event].add(listener);
	}
	function off(event, listener) {
		events[event].delete(listener);
	}
	function fire(event, data) {
		events[event].forEach((listener) => listener(data));
	}
	return {
		on,
		off,
		fire
	};
}
// src/utils/createStore.ts
/**
* Creates a data store
*
* @param initialState - An object with the initial store state
*/
function createStore(initialState) {
	let state = initialState;
	/**
	* Gets the store value
	*/
	function get() {
		return state;
	}
	/**
	* Sets the entire store
	*
	* @param action - Either a partial of the store or a function that returns a partial of the store
	*/
	function set(action) {
		const partial = typeof action === "function" ? action(state) : action;
		state = {
			...state,
			...partial
		};
	}
	/**
	* Sets a single store value
	*
	* @param key - The store key to set
	* @param val - The store value to set
	*/
	function setVal(key, val) {
		state[key] = val;
	}
	return {
		get,
		set,
		setVal
	};
}
// src/scroll/createScroll.ts
function createScroll() {
	const scrollStore = createStore({
		x: 0,
		y: 0,
		deltaX: 0,
		deltaY: 0,
		limitX: 0,
		limitY: 0,
		progressX: 0,
		progressY: 0
	});
	const listeners = createListeners({ update: /* @__PURE__ */ new Set() });
	function set(action) {
		scrollStore.set(action);
		listeners.fire("update", scrollStore.get());
	}
	function setVal(key, val) {
		scrollStore.setVal(key, val);
		listeners.fire("update", scrollStore.get());
	}
	return {
		set,
		setVal,
		get: scrollStore.get,
		on: listeners.on,
		off: listeners.off,
		fire: listeners.fire
	};
}
// src/observer/createObserver.ts
function createObserver(el) {}
export { createObserver, createScroll };
