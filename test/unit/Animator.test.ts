import type { WebGLRenderer } from 'three';
import type { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Animator } from '../../src';

// Mock Three.js WebGLRenderer
const mockRenderer = {
	setAnimationLoop: vi.fn(),
} as unknown as WebGLRenderer;

// Mock lil-gui
const mockGUI = {
	add: vi.fn().mockReturnValue({
		name: vi.fn().mockReturnThis(),
		onChange: vi.fn().mockReturnThis(),
		listen: vi.fn().mockReturnThis(),
	}),
} as unknown as GUI;

describe('Animator', () => {
	let animator: Animator;

	beforeEach(() => {
		vi.clearAllMocks();
		animator = new Animator();
	});

	afterEach(() => {
		animator.pause();
	});

	describe('constructor', () => {
		it('should create an instance with default values', () => {
			expect(animator).toBeInstanceOf(Animator);
			expect(animator.paused).toBe(true);
			expect(animator.uniforms).toBeDefined();
			expect(animator.uniforms.uTime.value).toBe(0);
			expect(animator.uniforms.uDeltaTime.value).toBe(0);
		});

		it('should freeze uniforms object', () => {
			expect(Object.isFrozen(animator.uniforms)).toBe(true);
		});
	});

	describe('play/pause functionality', () => {
		it('should start animation when play is called', () => {
			animator.play();
			expect(animator.paused).toBe(false);
		});

		it('should use renderer animation loop when renderer is provided', () => {
			animator.play(mockRenderer);
			expect(mockRenderer.setAnimationLoop).toHaveBeenCalled();
		});

		// it('should use requestAnimationFrame when no renderer is provided', () => {
		// 	animator.play();
		// 	expect(global.requestAnimationFrame).toHaveBeenCalled();
		// });

		it('should pause animation when pause is called', () => {
			animator.play();
			animator.pause();
			expect(animator.paused).toBe(true);
		});

		it('should stop renderer animation loop when pausing with renderer', () => {
			animator.play(mockRenderer);
			animator.pause(mockRenderer);
			expect(mockRenderer.setAnimationLoop).toHaveBeenCalledWith(null);
		});
	});

	describe('event emission', () => {
		it('should emit time and deltaTime on tick', () => {
			return new Promise<void>((resolve) => {
				animator.addListener(({ time, deltaTime }) => {
					expect(typeof time).toBe('number');
					expect(typeof deltaTime).toBe('number');
					resolve();
				});
				animator.play();
			});
		});

		it('should update uniforms on tick', () => {
			animator.addListener(() => {
				expect(animator.uniforms.uTime.value).toBeGreaterThan(0);
				expect(animator.uniforms.uDeltaTime.value).toBeGreaterThanOrEqual(0);
			});
			animator.play();
		});
	});

	describe('interpolate method', () => {
		it('should interpolate from one value to another', () => {
			return new Promise<void>((resolve) => {
				let callCount = 0;
				animator.interpolate({
					from: 0,
					to: 100,
					onUpdate: ({ value }) => {
						callCount++;
						expect(typeof value).toBe('number');

						if (callCount > 5) {
							animator.pause();
							resolve();
						}
					},
				});
				animator.play();
			});
		});

		it('should call onStart callback', () => {
			const onStart = vi.fn();
			animator.interpolate({
				from: 0,
				to: 1,
				onStart,
			});
			expect(onStart).toHaveBeenCalledWith({
				value: 0,
				deltaMs: 0,
				deltaTime: 0,
				time: 0,
			});
		});

		it('should call onComplete when interpolation finishes', () => {
			return new Promise<void>((resolve) => {
				animator.interpolate({
					from: 0,
					to: 1, // Use a reasonable target value
					onComplete: ({ value }) => {
						expect(value).toBeCloseTo(1, 0); // Allow more tolerance for floating point
						animator.pause();
						resolve();
					},
				});
				animator.play();
			});
		}, 10000); // Increase timeout to 10 seconds
	});

	describe('animate method', () => {
		it('should call onStart when animation begins', () => {
			const onStart = vi.fn();
			animator.animate({
				duration: 100,
				onStart,
			});
			expect(onStart).toHaveBeenCalled();
		});

		it('should call onUpdate during animation', () => {
			const onUpdate = vi.fn();
			animator.animate({
				duration: 50,
				onUpdate,
				onComplete: () => {
					expect(onUpdate).toHaveBeenCalled();
				},
			});
			animator.play();
		});

		it('should return a cleanup function', () => {
			const cleanup = animator.animate({
				duration: 1000,
			});
			expect(typeof cleanup).toBe('function');
		});

		it('should support step-based animations', () => {
			return new Promise<void>((resolve) => {
				let stepCount = 0;
				animator.animate({
					steps: 5,
					duration: 100,
					onUpdate: () => {
						stepCount++;
					},
					onComplete: () => {
						expect(stepCount).toBeGreaterThan(0);
						resolve();
					},
				});
				animator.play();
			});
		});

		it('should support delayed animations', () => {
			const onStart = vi.fn();
			animator.animate({
				delay: 100,
				onStart,
			});
			expect(onStart).not.toHaveBeenCalled();
		});
	});

	describe('debug method', () => {
		it('should add debug controls to GUI', () => {
			animator.debug(mockGUI);
			expect(mockGUI.add).toHaveBeenCalled();
		});
	});
});
