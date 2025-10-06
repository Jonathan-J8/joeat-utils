/**
 * Mono event emitter
 */

class MonoEventEmitter<T extends unknown[]> {
	#batch: Set<(...args: T) => void>;

	constructor() {
		this.#batch = new Set<(...args: T) => void>();
	}

	get size() {
		return this.#batch.size;
	}

	addListener(...callbacks: ((...args: T) => void)[]) {
		for (let i = 0, len = callbacks.length; i < len; i++) {
			this.#batch.add(callbacks[i]);
		}
	}

	removeListener(...callbacks: ((...args: T) => void)[]) {
		for (let i = 0, len = callbacks.length; i < len; i++) {
			this.#batch.delete(callbacks[i]);
		}
	}

	fire(...args: T) {
		this.#batch.forEach((callback) => {
			callback(...args);
		});
	}

	clear() {
		this.#batch.clear();
	}
}

export default MonoEventEmitter;
