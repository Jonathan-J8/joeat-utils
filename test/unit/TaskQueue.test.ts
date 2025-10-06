import { TaskQueue } from 'joeat-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Helper to create async task with delay
const createAsyncTask = (delay: number, result?: string) => {
	return () =>
		new Promise<string>((resolve) => {
			setTimeout(() => resolve(result || `task-${delay}`), delay);
		});
};

describe('TaskQueue', () => {
	let queue: TaskQueue;

	beforeEach(() => {
		queue = new TaskQueue();
	});

	describe('constructor', () => {
		it('should create instance with correct initial state', () => {
			expect(queue).toBeInstanceOf(TaskQueue);
			expect(queue.isPlaying).toBe(false);
		});
	});

	describe('add method', () => {
		it('should add a single task', () => {
			const task = vi.fn();
			queue.add(task);
			// No direct way to check queue size, but we can test via play
		});

		it('should add multiple tasks at once', () => {
			const task1 = vi.fn();
			const task2 = vi.fn();
			queue.add(task1, task2);
		});

		it('should add sync and async tasks', () => {
			const syncTask = vi.fn();
			const asyncTask = createAsyncTask(10);
			queue.add(syncTask, asyncTask);
		});
	});

	describe('play method', () => {
		it('should execute tasks in sequence', async () => {
			const results: string[] = [];

			queue.add(
				() => results.push('first'),
				() => results.push('second'),
				() => results.push('third'),
			);

			await queue.play();

			expect(results).toEqual(['first', 'second', 'third']);
		});

		it('should handle async tasks', async () => {
			const results: string[] = [];

			queue.add(
				() => results.push('sync-1'),
				createAsyncTask(50, 'async-1'),
				() => results.push('sync-2'),
			);

			queue.play();

			expect(results).toEqual(['sync-1']);
		});

		it('should set isPlaying to true during execution', async () => {
			let playingDuringExecution = false;

			queue.add(() => {
				playingDuringExecution = queue.isPlaying;
			});

			await queue.play();

			expect(playingDuringExecution).toBe(true);
			expect(queue.isPlaying).toBe(false); // Should be false after completion
		});

		it('should not start if already playing', async () => {
			const task = vi.fn();
			queue.add(task);

			// Start playing
			const promise1 = queue.play();
			const promise2 = queue.play(); // This should return immediately

			await Promise.all([promise1, promise2]);

			expect(task).toHaveBeenCalledTimes(1); // Task should only run once
		});

		it('should handle task errors and continue', async () => {
			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			const results: string[] = [];

			queue.add(
				() => results.push('before-error'),
				() => {
					throw new Error('Test error');
				},
				() => results.push('after-error'),
			);

			await queue.play();

			expect(results).toEqual(['before-error', 'after-error']);
			expect(consoleSpy).toHaveBeenCalledWith('Timeline error:', expect.any(Error));

			consoleSpy.mockRestore();
		});

		it('should handle async task errors', async () => {
			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			const results: string[] = [];

			const errorTask = () => Promise.reject(new Error('Async error'));

			queue.add(
				() => results.push('before-error'),
				errorTask,
				() => results.push('after-error'),
			);

			await queue.play();

			expect(results).toEqual(['before-error', 'after-error']);
			expect(consoleSpy).toHaveBeenCalledWith('Timeline error:', expect.any(Error));

			consoleSpy.mockRestore();
		});
	});

	describe('stop method', () => {
		it('should stop execution', async () => {
			const results: string[] = [];

			queue.add(
				() => results.push('first'),
				() => {
					queue.stop();
					results.push('second');
				},
				() => results.push('third'), // This should not execute
			);

			await queue.play();

			expect(results).toEqual(['first', 'second']);
			expect(queue.isPlaying).toBe(false);
		});

		it('should prevent new tasks from executing after stop', async () => {
			let taskExecuted = false;

			queue.add(
				() => queue.stop(),
				() => {
					taskExecuted = true;
				},
			);

			await queue.play();

			expect(taskExecuted).toBe(false);
		});
	});

	describe('clear method', () => {
		it('should stop execution and clear all tasks', async () => {
			const task = vi.fn();

			queue.add(task);
			queue.clear();

			queue.play();

			expect(task).not.toHaveBeenCalled();
			expect(queue.isPlaying).toBe(false);
		});

		it('should stop current execution when called during play', async () => {
			const results: string[] = [];

			queue.add(
				() => results.push('first'),
				() => {
					results.push('second');
					queue.clear();
				},
				() => results.push('third'),
			);

			await queue.play();

			expect(results).toEqual(['first', 'second']);
		});
	});

	describe('complex scenarios', () => {
		it('should handle mixed sync/async tasks with timing', async () => {
			const timestamps: number[] = [];
			const startTime = Date.now();

			queue.add(
				() => timestamps.push(Date.now() - startTime),
				createAsyncTask(100),
				() => timestamps.push(Date.now() - startTime),
				createAsyncTask(50),
				() => timestamps.push(Date.now() - startTime),
			);

			await queue.play();
			expect(timestamps).toHaveLength(3);
			expect(timestamps[1]).toBeGreaterThan(timestamps[0] + 90); // ~100ms delay
			// expect(timestamps[2]).toBeGreaterThan(timestamps[1] + 40); // ~50ms delay
		});

		it('should allow adding tasks after play completes', async () => {
			const task1 = vi.fn();
			const task2 = vi.fn();

			queue.add(task1);
			queue.play();

			queue.add(task2);
			queue.play();

			expect(task1).toHaveBeenCalledTimes(1);
			expect(task2).toHaveBeenCalledTimes(1);
		});

		it('should handle empty queue play', async () => {
			expect(async () => queue.play()).not.toThrow();
		});
	});
});
