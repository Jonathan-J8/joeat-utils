import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MonoEventEmitter } from '../../src';

describe('MonoEventEmitter', () => {
	let emitter: MonoEventEmitter<[string, number]>;

	beforeEach(() => {
		emitter = new MonoEventEmitter<[string, number]>();
	});

	describe('constructor', () => {
		it('should create an instance', () => {
			expect(emitter).toBeInstanceOf(MonoEventEmitter);
			expect(emitter.size).toBe(0);
		});
	});

	describe('addListener', () => {
		it('should add a single listener', () => {
			const callback = vi.fn();
			emitter.addListener(callback);
			expect(emitter.size).toBe(1);
		});

		it('should add multiple listeners at once', () => {
			const callback1 = vi.fn();
			const callback2 = vi.fn();
			emitter.addListener(callback1, callback2);
			expect(emitter.size).toBe(2);
		});

		it('should not add the same listener twice', () => {
			const callback = vi.fn();
			emitter.addListener(callback);
			emitter.addListener(callback);
			expect(emitter.size).toBe(1);
		});
	});

	describe('removeListener', () => {
		it('should remove a listener', () => {
			const callback = vi.fn();
			emitter.addListener(callback);
			emitter.removeListener(callback);
			expect(emitter.size).toBe(0);
		});

		it('should remove multiple listeners at once', () => {
			const callback1 = vi.fn();
			const callback2 = vi.fn();
			emitter.addListener(callback1, callback2);
			emitter.removeListener(callback1, callback2);
			expect(emitter.size).toBe(0);
		});

		it('should handle removing non-existent listener gracefully', () => {
			const callback = vi.fn();
			expect(() => emitter.removeListener(callback)).not.toThrow();
		});
	});

	describe('fire', () => {
		it('should call all listeners with provided arguments', () => {
			const callback1 = vi.fn();
			const callback2 = vi.fn();
			emitter.addListener(callback1, callback2);

			emitter.fire('test', 42);

			expect(callback1).toHaveBeenCalledWith('test', 42);
			expect(callback2).toHaveBeenCalledWith('test', 42);
		});

		it('should not throw if no listeners are registered', () => {
			expect(() => emitter.fire('test', 42)).not.toThrow();
		});

		it('should handle listener errors gracefully', () => {
			const goodCallback = vi.fn();
			const badCallback = vi.fn(() => {
				throw new Error('Test error');
			});

			emitter.addListener(goodCallback, badCallback);

			expect(() => emitter.fire('test', 42)).toThrow('Test error');
			expect(goodCallback).toHaveBeenCalledWith('test', 42);
		});
	});

	describe('clear', () => {
		it('should remove all listeners', () => {
			const callback1 = vi.fn();
			const callback2 = vi.fn();
			emitter.addListener(callback1, callback2);

			emitter.clear();

			expect(emitter.size).toBe(0);
		});

		it('should not fire any listeners after clearing', () => {
			const callback = vi.fn();
			emitter.addListener(callback);
			emitter.clear();

			emitter.fire('test', 42);

			expect(callback).not.toHaveBeenCalled();
		});
	});

	describe('size', () => {
		it('should return correct number of listeners', () => {
			expect(emitter.size).toBe(0);

			const callback1 = vi.fn();
			emitter.addListener(callback1);
			expect(emitter.size).toBe(1);

			const callback2 = vi.fn();
			emitter.addListener(callback2);
			expect(emitter.size).toBe(2);

			emitter.removeListener(callback1);
			expect(emitter.size).toBe(1);

			emitter.clear();
			expect(emitter.size).toBe(0);
		});
	});
});
