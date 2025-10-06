import { MousePointer } from 'joeat-utils';
import type * as Three from 'three';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('MousePointer', () => {
	// Mock Three.js classes
	const mockVector2 = {
		x: 0,
		y: 0,
		set: vi.fn().mockReturnThis(),
		copy: vi.fn().mockReturnThis(),
		subVectors: vi.fn().mockReturnThis(),
	} as unknown as Three.Vector2;

	const mockVector3 = {
		x: 0,
		y: 0,
		z: 0,
		set: vi.fn().mockReturnThis(),
		copy: vi.fn().mockReturnThis(),
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

	let mousePointer: MousePointer;

	beforeEach(() => {
		vi.clearAllMocks();

		mousePointer = new MousePointer({
			Vector2: mockVector2Class,
			Vector3: mockVector3Class,
			Plane: mockPlaneClass,
			Raycaster: mockRaycasterClass,
			camera: mockCamera,
		});
	});

	describe('constructor', () => {
		it('should create instance with correct uniforms structure', () => {
			expect(mousePointer).toBeInstanceOf(MousePointer);

			// Check uniform properties exist
			expect(mousePointer.uniforms.uElementSize).toBeDefined();
			expect(mousePointer.uniforms.uScroll).toBeDefined();
			expect(mousePointer.uniforms.uScrollVelocity).toBeDefined();
			expect(mousePointer.uniforms.uMousePress).toBeDefined();
			expect(mousePointer.uniforms.uMousePosition).toBeDefined();
			expect(mousePointer.uniforms.uMouseWorldPosition).toBeDefined();
			expect(mousePointer.uniforms.uMouseVelocity).toBeDefined();
		});

		it('should initialize uniforms with correct types and values', () => {
			const { uniforms } = mousePointer;

			// Vector2 uniforms should have { value: Vector2 } structure
			expect(uniforms.uElementSize.value).toBe(mockVector2);
			expect(uniforms.uScroll.value).toBe(mockVector2);
			expect(uniforms.uScrollVelocity.value).toBe(mockVector2);
			expect(uniforms.uMousePosition.value).toBe(mockVector2);
			expect(uniforms.uMouseVelocity.value).toBe(mockVector2);

			// Vector3 uniform
			expect(uniforms.uMouseWorldPosition.value).toBe(mockVector3);

			// Number uniform
			expect(uniforms.uMousePress.value).toBe(0);
		});

		it('should freeze uniforms object', () => {
			expect(Object.isFrozen(mousePointer.uniforms)).toBe(true);
		});

		it('should create required Three.js objects', () => {
			// Should create Vector2, Vector3, Plane, and Raycaster instances
			expect(mockVector2Class).toHaveBeenCalled();
			expect(mockVector3Class).toHaveBeenCalled();
			expect(mockPlaneClass).toHaveBeenCalled();
			expect(mockRaycasterClass).toHaveBeenCalled();
		});
	});

	describe('onResize method', () => {
		it('should update element size uniform', () => {
			mousePointer.onResize({ width: 1920, height: 1080 });

			expect(mockVector2.set).toHaveBeenCalledWith(1920, 1080);
		});

		it('should handle different screen sizes', () => {
			mousePointer.onResize({ width: 800, height: 600 });
			expect(mockVector2.set).toHaveBeenCalledWith(800, 600);

			mousePointer.onResize({ width: 1440, height: 900 });
			expect(mockVector2.set).toHaveBeenCalledWith(1440, 900);
		});
	});

	describe('onMove method', () => {
		beforeEach(() => {
			// Set up element size for mouse position calculations
			mousePointer.onResize({ width: 800, height: 600 });
		});

		it('should update mouse world position', () => {
			const pointerEvent = {
				clientX: 200,
				clientY: 150,
				pageX: 200,
				pageY: 150,
			} as PointerEvent;

			mousePointer.onMove(pointerEvent);

			// Should call raycaster and plane methods for world position calculation
			expect(mockCamera.getWorldDirection).toHaveBeenCalled();
			expect(mockRaycaster.setFromCamera).toHaveBeenCalled();
			expect(mockPlane.setFromNormalAndCoplanarPoint).toHaveBeenCalled();
			expect(mockRay.intersectPlane).toHaveBeenCalled();
		});

		it('should reset velocity after timeout', async () => {
			vi.useFakeTimers();

			const pointerEvent = { clientX: 100, clientY: 100, pageX: 100, pageY: 100 } as PointerEvent;
			mousePointer.onMove(pointerEvent);

			// Fast forward past the 200ms timeout
			vi.advanceTimersByTime(201);

			// Should reset velocity to 0,0
			expect(mockVector2.set).toHaveBeenLastCalledWith(0, 0);

			vi.useRealTimers();
		});
	});

	describe('onPress method', () => {
		it('should handle mouse press events', () => {
			const mouseDownEvent = {
				pointerType: 'mouse',
				pressure: 1,
			} as PointerEvent;

			mousePointer.onPress(mouseDownEvent);

			// Mouse with pressure should set press to 1
			expect(mousePointer.uniforms.uMousePress.value).toBe(1);
		});

		it('should handle mouse release events', () => {
			const mouseUpEvent = {
				pointerType: 'mouse',
				pressure: 0,
			} as PointerEvent;

			mousePointer.onPress(mouseUpEvent);

			// Mouse without pressure should set press to 0
			expect(mousePointer.uniforms.uMousePress.value).toBe(0);
		});

		it('should handle touch/pen pressure events', () => {
			const touchEvent = {
				pointerType: 'touch',
				pressure: 0.5,
			} as PointerEvent;

			mousePointer.onPress(touchEvent);

			// Touch/pen events should use actual pressure value
			expect(mousePointer.uniforms.uMousePress.value).toBe(0.5);
		});

		it('should handle pen events with variable pressure', () => {
			const penEvent = {
				pointerType: 'pen',
				pressure: 0.8,
			} as PointerEvent;

			mousePointer.onPress(penEvent);

			expect(mousePointer.uniforms.uMousePress.value).toBe(0.8);
		});
	});

	describe('onScroll method', () => {
		beforeEach(() => {
			// Mock document and window properties for scroll calculations
			Object.defineProperty(document.body, 'scrollWidth', { value: 2000, configurable: true });
			Object.defineProperty(document.body, 'scrollHeight', { value: 3000, configurable: true });
			Object.defineProperty(window, 'innerWidth', { value: 800, configurable: true });
			Object.defineProperty(window, 'innerHeight', { value: 600, configurable: true });
			Object.defineProperty(window, 'scrollX', { value: 0, configurable: true });
			Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
		});

		it('should update scroll position uniform', () => {
			// Set scroll position
			Object.defineProperty(window, 'scrollX', { value: 600, configurable: true });
			Object.defineProperty(window, 'scrollY', { value: 1200, configurable: true });

			const scrollEvent = { type: 'scroll' } as Event;
			mousePointer.onScroll(scrollEvent);

			// Expected: x = 600/(2000-800) = 0.5, y = 1200/(3000-600) = 0.5
			expect(mockVector2.x).toBe(0.5);
			expect(mockVector2.y).toBe(0.5);
		});

		it('should calculate scroll velocity on scroll events', () => {
			const scrollEvent = { type: 'scroll' } as Event;

			// First call to establish baseline
			mousePointer.onScroll(scrollEvent);

			// Change scroll position
			Object.defineProperty(window, 'scrollX', { value: 300, configurable: true });
			Object.defineProperty(window, 'scrollY', { value: 600, configurable: true });

			// Second call should calculate velocity
			mousePointer.onScroll(scrollEvent);

			expect(mockVector2.subVectors).toHaveBeenCalled();
		});

		it('should reset scroll velocity on scrollend events', () => {
			const scrollEndEvent = { type: 'scrollend' } as Event;
			mousePointer.onScroll(scrollEndEvent);

			expect(mockVector2.set).toHaveBeenCalledWith(0, 0);
		});

		it('should handle edge case when document dimensions equal window dimensions', () => {
			// Mock equal dimensions to avoid division by zero
			Object.defineProperty(document.body, 'scrollWidth', { value: 800, configurable: true });
			Object.defineProperty(document.body, 'scrollHeight', { value: 600, configurable: true });

			const scrollEvent = { type: 'scroll' } as Event;
			mousePointer.onScroll(scrollEvent);

			// Should handle division by zero gracefully
			expect(() => mousePointer.onScroll(scrollEvent)).not.toThrow();
		});
	});

	describe('integration tests', () => {
		it('should handle complete interaction sequence', () => {
			// Resize
			mousePointer.onResize({ width: 1024, height: 768 });
			expect(mockVector2.set).toHaveBeenCalledWith(1024, 768);

			// Mouse move
			const moveEvent = { clientX: 512, clientY: 384, pageX: 512, pageY: 384 } as PointerEvent;
			mousePointer.onMove(moveEvent);

			// Should update position, world position, and velocity
			expect(mockCamera.getWorldDirection).toHaveBeenCalled();
			expect(mockRaycaster.setFromCamera).toHaveBeenCalled();

			// Mouse press
			const pressEvent = { pointerType: 'mouse', pressure: 1 } as PointerEvent;
			mousePointer.onPress(pressEvent);
			expect(mousePointer.uniforms.uMousePress.value).toBe(1);

			// Scroll
			const scrollEvent = { type: 'scroll' } as Event;
			mousePointer.onScroll(scrollEvent);
			expect(mockVector2.copy).toHaveBeenCalled();
		});

		it('should maintain uniform consistency across operations', () => {
			const { uniforms } = mousePointer;

			// All uniforms should maintain their structure
			expect(typeof uniforms.uMousePress.value).toBe('number');
			expect(uniforms.uElementSize.value).toBe(mockVector2);
			expect(uniforms.uMouseWorldPosition.value).toBe(mockVector3);
		});
	});
});
