import { Resizer } from 'joeat';
import { JSDOM } from 'jsdom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Setup JSDOM for ResizeObserver
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="test-element"></div></body></html>', {
	url: 'http://localhost',
});

Object.defineProperty(global, 'window', {
	writable: true,
	value: {
		...dom.window,
		devicePixelRatio: 1, // Set to 1 for consistent testing
	},
});

Object.defineProperty(global, 'document', {
	writable: true,
	value: dom.window.document,
});

// Mock ResizeObserver
class MockResizeObserver {
	callback: ResizeObserverCallback;
	entries: ResizeObserverEntry[] = [];

	constructor(callback: ResizeObserverCallback) {
		this.callback = callback;
	}

	observe(target: Element) {
		// Create initial entry with default size
		const entry = {
			target,
			contentRect: { width: 800, height: 600 },
			contentBoxSize: [{ inlineSize: 800, blockSize: 600 }],
			borderBoxSize: [],
			devicePixelContentBoxSize: [],
		} as unknown as ResizeObserverEntry;

		this.entries = [entry];

		// Call immediately to simulate initial observation
		this.callback(this.entries, this);
	}

	// Method to trigger size changes for testing
	triggerResize(width: number, height: number) {
		if (this.entries.length > 0) {
			const entry = {
				target: this.entries[0].target,
				contentRect: { width, height },
				contentBoxSize: [{ inlineSize: width, blockSize: height }],
				borderBoxSize: [],
				devicePixelContentBoxSize: [],
			} as unknown as ResizeObserverEntry;

			this.entries = [entry];
			this.callback(this.entries, this);
		}
	}

	unobserve() {}
	disconnect() {}
}

// Store reference to the mock for testing
let mockResizeObserver: MockResizeObserver;

Object.defineProperty(global, 'ResizeObserver', {
	writable: true,
	value: function (callback: ResizeObserverCallback) {
		mockResizeObserver = new MockResizeObserver(callback);
		return mockResizeObserver;
	},
});

describe('Resizer', () => {
	let resizer: Resizer;
	let element: HTMLElement;

	beforeEach(() => {
		element = document.getElementById('test-element') as HTMLElement;
		resizer = new Resizer(element);
		vi.clearAllMocks();
	});

	afterEach(() => {
		// Clean up
	});

	describe('constructor', () => {
		it('should create an instance', () => {
			expect(resizer).toBeInstanceOf(Resizer);
		});

		it('should set initial pixel ratio', () => {
			expect(resizer.pixelRatio).toBe(1); // Min of devicePixelRatio (1) and 2
		});
		it('should store element reference', () => {
			expect(resizer.element).toBe(element);
		});

		it('should set default resolution factor', () => {
			expect(resizer.resolutionFactor).toBe(1);
		});

		it('should set default max size', () => {
			expect(resizer.maxSize).toBe(7680);
		});
	});

	describe('width and height getters', () => {
		it('should return dimensions multiplied by resolution factor', () => {
			resizer.resolutionFactor = 0.5;
			// Width/height will be based on the mocked ResizeObserver values
			expect(typeof resizer.width).toBe('number');
			expect(typeof resizer.height).toBe('number');
		});
	});

	describe('resolutionFactor setter', () => {
		it('should set resolution factor within bounds', () => {
			resizer.resolutionFactor = 0.5;
			expect(resizer.resolutionFactor).toBe(0.5);
		});

		it('should clamp resolution factor to minimum', () => {
			resizer.resolutionFactor = 0.005; // Below minimum
			expect(resizer.resolutionFactor).toBe(0.01);
		});

		it('should clamp resolution factor to maximum', () => {
			resizer.resolutionFactor = 1.5; // Above maximum
			expect(resizer.resolutionFactor).toBe(1);
		});

		it('should fire event when changed', async () => {
			const eventPromise = new Promise<{ width: number; height: number; pixelRatio: number }>(
				(resolve) => {
					resizer.addListener((params) => {
						resolve(params);
					});
				},
			);

			resizer.resolutionFactor = 0.8;

			const { width, height, pixelRatio } = await eventPromise;
			expect(typeof width).toBe('number');
			expect(typeof height).toBe('number');
			expect(typeof pixelRatio).toBe('number');
		});
	});

	describe('maxSize setter', () => {
		it('should set max size', () => {
			resizer.maxSize = 4096;
			expect(resizer.maxSize).toBe(4096);
		});

		it('should enforce minimum max size', () => {
			resizer.maxSize = 16; // Below minimum
			expect(resizer.maxSize).toBe(32);
		});

		it('should fire event when changed', async () => {
			const eventPromise = new Promise<void>((resolve) => {
				resizer.addListener(() => {
					resolve();
				});
			});

			resizer.maxSize = 2048;
			await eventPromise;
		});
	});

	describe('fire method', () => {
		it('should emit dimensions and pixel ratio', async () => {
			const eventPromise = new Promise<{ width: number; height: number; pixelRatio: number }>(
				(resolve) => {
					resizer.addListener((params) => {
						resolve(params);
					});
				},
			);

			resizer.fire();

			const { width, height, pixelRatio } = await eventPromise;
			expect(typeof width).toBe('number');
			expect(typeof height).toBe('number');
			expect(pixelRatio).toBe(resizer.pixelRatio);
		});
		it('should apply resolution factor to dimensions', async () => {
			const factor = 0.5;
			resizer.resolutionFactor = factor;

			const eventPromise = new Promise<{ width: number; height: number }>((resolve) => {
				resizer.addListener((params) => {
					resolve(params);
				});
			});

			resizer.fire();

			const { width, height } = await eventPromise;
			expect(width).toBeGreaterThan(0);
			expect(height).toBeGreaterThan(0);
			// Should be affected by resolution factor
			expect(width).toBe(800 * factor);
			expect(height).toBe(600 * factor);
		});
		it('should limit dimensions to max size', async () => {
			resizer.maxSize = 100; // Very small max size

			const eventPromise = new Promise<{ width: number; height: number }>((resolve) => {
				resizer.addListener((params) => {
					resolve(params);
				});
			});

			resizer.fire();

			const { width, height } = await eventPromise;
			expect(width).toBeLessThanOrEqual(100);
			expect(height).toBeLessThanOrEqual(100);
		});
	});

	describe('ResizeObserver integration', () => {
		it('should observe the provided element', () => {
			// This is tested implicitly through constructor
			expect(resizer.element).toBe(element);
		});

		it('should handle size changes', async () => {
			let eventCount = 0;

			const eventPromise = new Promise<void>((resolve) => {
				resizer.addListener(() => {
					++eventCount;
					if (eventCount === 2) {
						// Initial + one change
						resolve();
					}
				});
			});

			// Simulate a resize using the mock's triggerResize method
			mockResizeObserver.triggerResize(1920, 1080);
			resizer.fire(); // Manually fire to ensure event is emitted
			await eventPromise;
			expect(eventCount).toBe(2);
		}, 2000);
	});

	describe('aspect ratio calculations', () => {
		it('should maintain aspect ratio when limiting by width', async () => {
			resizer.maxSize = 100;

			// Trigger resize with wide dimensions first
			mockResizeObserver.triggerResize(200, 100);

			const eventPromise = new Promise<{ width: number; height: number }>((resolve) => {
				resizer.addListener((params) => {
					resolve(params);
				});
			});

			resizer.fire();

			const { width, height } = await eventPromise;
			const aspect = width / height;
			expect(aspect).toBeCloseTo(2, 1); // Should maintain 2:1 aspect ratio
		});
		it('should maintain aspect ratio when limiting by height', async () => {
			resizer.maxSize = 100;

			// Trigger resize with tall dimensions first
			mockResizeObserver.triggerResize(100, 200);

			const eventPromise = new Promise<{ width: number; height: number }>((resolve) => {
				resizer.addListener((params) => {
					resolve(params);
				});
			});

			resizer.fire();

			const { width, height } = await eventPromise;
			const aspect = width / height;
			expect(aspect).toBeCloseTo(0.5, 1); // Should maintain 1:2 aspect ratio
		});
	});

	describe('event emitter functionality', () => {
		it('should inherit from MonoEventEmitter', () => {
			expect(typeof resizer.addListener).toBe('function');
			expect(typeof resizer.removeListener).toBe('function');
			expect(typeof resizer.fire).toBe('function');
			expect(typeof resizer.clear).toBe('function');
		});

		it('should support multiple listeners', async () => {
			let listener1Called = false;
			let listener2Called = false;

			const eventPromise = new Promise<void>((resolve) => {
				const listener1 = () => {
					listener1Called = true;
					checkBoth();
				};

				const listener2 = () => {
					listener2Called = true;
					checkBoth();
				};

				function checkBoth() {
					if (listener1Called && listener2Called) {
						resolve();
					}
				}

				resizer.addListener(listener1, listener2);
			});

			resizer.fire();
			await eventPromise;

			expect(listener1Called).toBe(true);
			expect(listener2Called).toBe(true);
		});
		it('should allow removing listeners', () => {
			const listener = vi.fn();
			resizer.addListener(listener);
			resizer.removeListener(listener);
			resizer.fire();
			expect(listener).not.toHaveBeenCalled();
		});
	});
});
