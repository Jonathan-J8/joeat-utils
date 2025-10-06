import { Spring } from 'joeat-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Spring', () => {
	let spring: Spring;

	beforeEach(() => {
		spring = new Spring();
	});

	describe('constructor', () => {
		it('should create instance with default values', () => {
			expect(spring).toBeInstanceOf(Spring);
			expect(spring.value).toBe(0);
			expect(spring.velocity).toBe(0);
			expect(spring.finished).toBe(false);
		});

		it('should accept initial value', () => {
			const initialValue = 10;
			const springWithValue = new Spring(initialValue);
			expect(springWithValue.value).toBe(initialValue);
		});

		it('should accept options', () => {
			const onUpdate = vi.fn();
			const onComplete = vi.fn();
			const springWithOptions = new Spring(5, {
				mass: 0.8,
				tension: 0.3,
				friction: 0.7,
				onUpdate,
				onComplete,
			});
			expect(springWithOptions.value).toBe(5);
		});
	});

	describe('from method', () => {
		it('should set from value and current value', () => {
			const fromValue = 15;
			const result = spring.from(fromValue);
			expect(spring.value).toBe(fromValue);
			expect(result).toBe(spring); // Should return this for chaining
		});
	});

	describe('to method', () => {
		it('should set target value', () => {
			const result = spring.to(100);
			expect(result).toBe(spring); // Should return this for chaining
		});

		it('should return early if already at target and below threshold', () => {
			spring.from(1);
			const result = spring.to(1.05); // Small difference within threshold
			expect(result).toBe(spring);
		});

		it('should accept options override', () => {
			const onUpdate = vi.fn();
			spring.to(50, { mass: 0.3, onUpdate });
			// Testing that options are accepted (implementation detail)
		});

		it('should reset finished state', () => {
			spring.from(0);
			spring.to(100);
			expect(spring.finished).toBe(false);
		});
	});

	describe('update method', () => {
		beforeEach(() => {
			spring.from(0).to(100);
		});

		it('should update value towards target', () => {
			const initialValue = spring.value;
			spring.update(16); // 16ms delta
			expect(spring.value).not.toBe(initialValue);
		});

		it('should call onUpdate callback during animation', () => {
			const onUpdate = vi.fn();
			spring.to(50, { onUpdate });
			spring.update();
			expect(onUpdate).toHaveBeenCalledWith(spring.value);
		});

		it('should not jump to complete immediately', () => {
			const onComplete = vi.fn();
			spring.from(0.99).to(1, { onComplete, threshold: 0.1 });
			spring.update(100);
			expect(onComplete).not.toHaveBeenCalled();
		});

		it('should set finished to true when animation completes', () => {
			spring.from(0.99).to(1, { threshold: 0.1 });
			spring.update();
			expect(spring.finished).toBe(true);
			expect(spring.value).toBe(1);
		});

		it('should not update when already finished', () => {
			spring.from(0.99).to(1, { threshold: 0.1 });
			spring.update();
			const finalValue = spring.value;
			spring.update(0.016);
			expect(spring.value).toBe(finalValue);
		});

		it('should limit delta time to prevent instability', () => {
			spring.from(0).to(100);
			const initialValue = spring.value;
			spring.update();
			expect(Math.abs(spring.value - initialValue)).toBeLessThan(200);
		});

		it('should update velocity correctly', () => {
			spring.from(0).to(100);
			spring.update(16);
			expect(typeof spring.velocity).toBe('number');
		});
	});

	describe('getters', () => {
		it('should return correct value', () => {
			spring.from(42);
			expect(spring.value).toBe(42);
		});

		it('should return velocity', () => {
			expect(typeof spring.velocity).toBe('number');
		});

		it('should return finished state', () => {
			expect(typeof spring.finished).toBe('boolean');
		});
	});

	describe('spring physics', () => {
		it('should eventually reach target value', () => {
			spring.from(0).to(100, { threshold: 0.01 });

			// Run multiple updates to simulate animation
			for (let i = 0; i < 10000 && !spring.finished; i++) {
				spring.update(0.016);
			}

			expect(spring.finished).toBe(true);
			expect(spring.value).toBeCloseTo(100, 1);
		});

		it('should overshoot and settle with low friction', () => {
			spring.from(0).to(100, { friction: 0.1, tension: 0.8 });

			let hasOvershot = false;
			const targetValue = 100;

			for (let i = 0; i < 500 && !spring.finished; i++) {
				spring.update(0.016);
				if (spring.value > targetValue) {
					hasOvershot = true;
				}
			}

			expect(hasOvershot).toBe(true);
		});

		it('should approach target smoothly with high friction', () => {
			spring.from(0).to(100, { friction: 0.9, tension: 0.3 });

			let previousValue = 0;
			let hasDecreased = false;

			for (let i = 0; i < 200 && !spring.finished; i++) {
				spring.update(0.016);
				if (spring.value < previousValue) {
					hasDecreased = true;
				}
				previousValue = spring.value;
			}

			// With high friction, should not overshoot much
			expect(hasDecreased).toBe(false);
		});
	});
});
