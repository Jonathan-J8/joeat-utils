import { PointerTracker } from 'joeat-utils';
import type * as Three from 'three';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('PointerTracker', () => {
	// Mock Three.js classes
	const mockVector2 = {
		x: 0,
		y: 0,
		set: vi.fn().mockReturnThis(),
		copy: vi.fn().mockReturnThis(),
		subVectors: vi.fn().mockReturnThis(),
		toFixed: vi.fn().mockReturnValue('0.00'),
	} as unknown as Three.Vector2;

	const mockVector3 = {
		x: 0,
		y: 0,
		z: 0,
		set: vi.fn().mockReturnThis(),
		copy: vi.fn().mockReturnThis(),
		toFixed: vi.fn().mockReturnValue('0.00'),
	} as unknown as Three.Vector3;

	const mockPlane = {
		setFromNormalAndCoplanarPoint: vi.fn(),
	} as unknown as Three.Plane;

	const mockRay = {
		intersectPlane: vi.fn(),
	};

	const mockRaycaster = {
		setFromCamera: vi.fn(),
		ray: mockRay,
	} as unknown as Three.Raycaster;

	const mockCamera = {
		getWorldDirection: vi.fn(),
	} as unknown as Three.Camera;

	const mockVector2Class = vi.fn(() => mockVector2) as unknown as typeof Three.Vector2;
	const mockVector3Class = vi.fn(() => mockVector3) as unknown as typeof Three.Vector3;
	const mockPlaneClass = vi.fn(() => mockPlane) as unknown as typeof Three.Plane;
	const mockRaycasterClass = vi.fn(() => mockRaycaster) as unknown as typeof Three.Raycaster;

	let pointerTracker: PointerTracker;
	let mockElement: HTMLElement;

	beforeEach(() => {
		vi.clearAllMocks();

		// Mock DOM elements and methods
		mockElement = {
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			getBoundingClientRect: vi.fn().mockReturnValue({ width: 800, height: 600 }),
		} as unknown as HTMLElement;

		// Mock window and document properties
		Object.defineProperty(window, 'addEventListener', {
			value: vi.fn(),
			configurable: true,
		});
		Object.defineProperty(window, 'removeEventListener', {
			value: vi.fn(),
			configurable: true,
		});
		Object.defineProperty(window, 'innerWidth', { value: 800, configurable: true });
		Object.defineProperty(window, 'innerHeight', { value: 600, configurable: true });
		Object.defineProperty(window, 'scrollX', { value: 0, configurable: true });
		Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
		Object.defineProperty(document.body, 'scrollWidth', { value: 1600, configurable: true });
		Object.defineProperty(document.body, 'scrollHeight', { value: 1200, configurable: true });

		pointerTracker = new PointerTracker({
			Vector2: mockVector2Class,
			Vector3: mockVector3Class,
			Plane: mockPlaneClass,
			Raycaster: mockRaycasterClass,
			camera: mockCamera,
		});
	});

	describe('constructor', () => {
		it('should create instance with correct uniforms structure', () => {
			expect(pointerTracker).toBeInstanceOf(PointerTracker);

			// Check uniform properties exist
			expect(pointerTracker.uniforms.uPointerScroll).toBeDefined();
			expect(pointerTracker.uniforms.uPointerScrollVelocity).toBeDefined();
			expect(pointerTracker.uniforms.uPointerPress).toBeDefined();
			expect(pointerTracker.uniforms.uPointerPosition).toBeDefined();
			expect(pointerTracker.uniforms.uPointerWorldPosition).toBeDefined();
			expect(pointerTracker.uniforms.uPointerPositionVelocity).toBeDefined();
		});

		it('should initialize uniforms with correct types and values', () => {
			const { uniforms } = pointerTracker;

			// Vector2 uniforms should have { value: Vector2 } structure
			expect(uniforms.uPointerScroll.value).toBe(mockVector2);
			expect(uniforms.uPointerScrollVelocity.value).toBe(mockVector2);
			expect(uniforms.uPointerPosition.value).toBe(mockVector2);
			expect(uniforms.uPointerPositionVelocity.value).toBe(mockVector2);

			// Vector3 uniform
			expect(uniforms.uPointerWorldPosition.value).toBe(mockVector3);

			// Number uniform
			expect(uniforms.uPointerPress.value).toBe(0);
		});

		it('should freeze uniforms object', () => {
			expect(Object.isFrozen(pointerTracker.uniforms)).toBe(true);
		});

		it('should create required Three.js objects', () => {
			// Should create Vector2, Vector3, Plane, and Raycaster instances
			expect(mockVector2Class).toHaveBeenCalled();
			expect(mockVector3Class).toHaveBeenCalled();
			expect(mockPlaneClass).toHaveBeenCalled();
			expect(mockRaycasterClass).toHaveBeenCalled();
		});
	});

	describe('event listener methods', () => {
		it('should have onMove method', () => {
			expect(typeof pointerTracker.onMove).toBe('function');
		});

		it('should have onScroll method', () => {
			expect(typeof pointerTracker.onScroll).toBe('function');
		});

		it('should have onPress method', () => {
			expect(typeof pointerTracker.onPress).toBe('function');
		});

		it('should update mouse position when onMove is called', () => {
			const mockEvent = {
				target: mockElement,
				clientX: 400,
				clientY: 300,
				pageX: 400,
				pageY: 300,
			} as unknown as PointerEvent;

			pointerTracker.onMove(mockEvent);

			expect(mockVector2.set).toHaveBeenCalled();
		});

		it('should update scroll values when onScroll is called', () => {
			const mockEvent = {
				type: 'scroll',
			} as Event;

			pointerTracker.onScroll(mockEvent);

			expect(mockVector2.copy).toHaveBeenCalled();
		});

		it('should update mouse press when onPress is called', () => {
			const mockEvent = {
				pointerType: 'mouse',
				pressure: 1,
			} as PointerEvent;

			pointerTracker.onPress(mockEvent);

			expect(pointerTracker.uniforms.uPointerPress.value).toBe(1);
		});
	});

	describe('clear method', () => {
		it('should clear event emitters', () => {
			// Add some listeners first
			const callback = vi.fn();
			const unsubscribe = pointerTracker.addMoveListener(callback);

			// Clear should work without parameters
			expect(() => pointerTracker.clear()).not.toThrow();

			// Cleanup
			unsubscribe();
		});

		it('should clear timeout if exists', () => {
			// Trigger mouse move to create timeout
			const mockEvent = {
				target: mockElement,
				clientX: 400,
				clientY: 300,
				pageX: 400,
				pageY: 300,
			} as unknown as PointerEvent;

			pointerTracker.onMove(mockEvent);

			// Clear should not throw
			expect(() => pointerTracker.clear()).not.toThrow();
		});

		it('should remove UI element if it exists', () => {
			const mockGui = {
				domElement: {
					appendChild: vi.fn(),
				},
			};

			const mockDiv = {
				style: { padding: '' },
				innerHTML: '',
				remove: vi.fn(),
			};

			vi.spyOn(document, 'createElement').mockReturnValue(mockDiv as unknown as HTMLElement);

			pointerTracker.debug(mockGui as unknown as Parameters<typeof pointerTracker.debug>[0]);
			pointerTracker.clear();

			expect(mockDiv.remove).toHaveBeenCalled();
		});
	});

	describe('debug method', () => {
		it('should create and append UI element to gui', () => {
			const mockGui = {
				domElement: {
					appendChild: vi.fn(),
				},
			} as unknown as Parameters<typeof pointerTracker.debug>[0];

			// Mock document.createElement
			const mockDiv = {
				style: { padding: '' },
				innerHTML: '',
			};
			const createElementSpy = vi
				.spyOn(document, 'createElement')
				.mockReturnValue(mockDiv as HTMLElement);

			pointerTracker.debug(mockGui);

			expect(createElementSpy).toHaveBeenCalledWith('div');
			expect(mockGui.domElement.appendChild).toHaveBeenCalledWith(mockDiv);

			createElementSpy.mockRestore();
		});
	});

	describe('event subscription methods', () => {
		it('should allow subscribing to move events', () => {
			const callback = vi.fn();
			const unsubscribe = pointerTracker.addMoveListener(callback);

			expect(typeof unsubscribe).toBe('function');

			// Trigger a move event
			const mockEvent = {
				target: mockElement,
				clientX: 400,
				clientY: 300,
				pageX: 400,
				pageY: 300,
			} as unknown as PointerEvent;

			pointerTracker.onMove(mockEvent);
			expect(callback).toHaveBeenCalled();

			// Unsubscribe should work
			unsubscribe();
		});

		it('should allow subscribing to press events', () => {
			const callback = vi.fn();
			const unsubscribe = pointerTracker.addPressListener(callback);

			expect(typeof unsubscribe).toBe('function');

			// Trigger a press event
			const mockEvent = {
				pointerType: 'mouse',
				pressure: 1,
			} as unknown as PointerEvent;

			pointerTracker.onPress(mockEvent);
			expect(callback).toHaveBeenCalled();

			unsubscribe();
		});

		it('should allow subscribing to scroll events', () => {
			const callback = vi.fn();
			const unsubscribe = pointerTracker.addScrollListener(callback);

			expect(typeof unsubscribe).toBe('function');

			// Trigger a scroll event
			const mockEvent = {
				type: 'scroll',
			} as Event;

			pointerTracker.onScroll(mockEvent);
			expect(callback).toHaveBeenCalled();

			unsubscribe();
		});

		it('should support multiple callbacks for each event type', () => {
			const callback1 = vi.fn();
			const callback2 = vi.fn();

			const unsubscribe1 = pointerTracker.addMoveListener(callback1, callback2);

			// Trigger a move event
			const mockEvent = {
				target: mockElement,
				clientX: 400,
				clientY: 300,
				pageX: 400,
				pageY: 300,
			} as unknown as PointerEvent;

			pointerTracker.onMove(mockEvent);

			expect(callback1).toHaveBeenCalled();
			expect(callback2).toHaveBeenCalled();

			unsubscribe1();
		});
	});

	describe('integration tests', () => {
		it('should maintain uniform consistency', () => {
			const { uniforms } = pointerTracker;

			// All uniforms should maintain their structure
			expect(typeof uniforms.uPointerPress.value).toBe('number');
			expect(uniforms.uPointerScroll.value).toBe(mockVector2);
			expect(uniforms.uPointerScrollVelocity.value).toBe(mockVector2);
			expect(uniforms.uPointerPosition.value).toBe(mockVector2);
			expect(uniforms.uPointerPositionVelocity.value).toBe(mockVector2);
			expect(uniforms.uPointerWorldPosition.value).toBe(mockVector3);
		});
	});
});
