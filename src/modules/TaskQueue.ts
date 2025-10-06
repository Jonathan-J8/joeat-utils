export type Task = (() => void) | (() => Promise<unknown>);

export default class TaskQueue {
	#queue: Task[] = [];
	#isPlaying = false;

	get isPlaying() {
		return this.#isPlaying;
	}
	get size() {
		return this.#queue.length;
	}

	#run = async () => {
		/**
		 * Run all tasks in the queue sequentially.
		 * This ensures tasks run only once even if run() is called repeatedly.
		 */
		if (this.#isPlaying) return;
		this.#isPlaying = true;

		while (this.#queue.length > 0) {
			if (!this.#isPlaying) break; // Check abort flag before each task

			const task = this.#queue.shift(); // Remove the first task from the queue
			if (!task) continue;
			try {
				// await Promise.resolve(task());
				await task();
			} catch (error) {
				console.error('Timeline error:', error);
			}
		}

		this.#isPlaying = false;
	};

	add = (...task: Task[]) => {
		this.#queue.push(...task);
	};

	play = async () => {
		this.#isPlaying = false;
		await this.#run();
	};

	stop = () => {
		this.#isPlaying = false;
	};

	clear = () => {
		this.stop();
		this.#queue = [];
	};
}
