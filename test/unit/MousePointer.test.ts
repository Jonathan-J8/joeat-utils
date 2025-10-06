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

	let mousePointer: MousePointer;
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

	describe('init method', () => {
		it('should add event listeners to the element', () => {
			mousePointer.init(mockElement);

			expect(mockElement.addEventListener).toHaveBeenCalledWith(
				'pointermove',
				expect.any(Function),
				false,
			);
			expect(mockElement.addEventListener).toHaveBeenCalledWith(
				'pointerout',
				expect.any(Function),
				false,
			);
			expect(mockElement.addEventListener).toHaveBeenCalledWith(
				'pointerdown',
				expect.any(Function),
				false,
			);
			expect(mockElement.addEventListener).toHaveBeenCalledWith(
				'pointerup',
				expect.any(Function),
				false,
			);
		});

		it('should add scroll event listeners to window', () => {
			mousePointer.init(mockElement);

			expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), false);
			expect(window.addEventListener).toHaveBeenCalledWith(
				'scrollend',
				expect.any(Function),
				false,
			);
		});

		it('should work with window as element', () => {
			expect(() => mousePointer.init(window)).not.toThrow();
			expect(window.addEventListener).toHaveBeenCalled();
		});

		it('should work with document as element', () => {
			const mockDocument = {
				addEventListener: vi.fn(),
			} as unknown as Document;

			expect(() => mousePointer.init(mockDocument)).not.toThrow();
			expect(mockDocument.addEventListener).toHaveBeenCalled();
		});
	});

	describe('clear method', () => {
		beforeEach(() => {
			mousePointer.init(mockElement);
			vi.clearAllMocks();
		});

		it('should remove event listeners from the element', () => {
			mousePointer.clear(mockElement);

			expect(mockElement.removeEventListener).toHaveBeenCalledWith(
				'pointermove',
				expect.any(Function),
				false,
			);
			expect(mockElement.removeEventListener).toHaveBeenCalledWith(
				'pointerout',
				expect.any(Function),
				false,
			);
			expect(mockElement.removeEventListener).toHaveBeenCalledWith(
				'pointerdown',
				expect.any(Function),
				false,
			);
			expect(mockElement.removeEventListener).toHaveBeenCalledWith(
				'pointerup',
				expect.any(Function),
				false,
			);
		});

		it('should remove scroll event listeners from window', () => {
			mousePointer.clear(mockElement);

			expect(window.removeEventListener).toHaveBeenCalledWith(
				'scroll',
				expect.any(Function),
				false,
			);
			expect(window.removeEventListener).toHaveBeenCalledWith(
				'scrollend',
				expect.any(Function),
				false,
			);
		});

		it('should work with window as element', () => {
			expect(() => mousePointer.clear(window)).not.toThrow();
			expect(window.removeEventListener).toHaveBeenCalled();
		});

		it('should work with document as element', () => {
			const mockDocument = {
				removeEventListener: vi.fn(),
			} as unknown as Document;

			expect(() => mousePointer.clear(mockDocument)).not.toThrow();
			expect(mockDocument.removeEventListener).toHaveBeenCalled();
		});
	});

	describe('debug method', () => {
		it('should create and append UI element to gui', () => {
			const mockGui = {
				domElement: {
					appendChild: vi.fn(),
				},
			} as unknown as Parameters<typeof mousePointer.debug>[0];

			// Mock document.createElement
			const mockDiv = {
				style: { padding: '' },
				innerHTML: '',
			};
			const createElementSpy = vi
				.spyOn(document, 'createElement')
				.mockReturnValue(mockDiv as HTMLElement);

			mousePointer.debug(mockGui);

			expect(createElementSpy).toHaveBeenCalledWith('div');
			expect(mockGui.domElement.appendChild).toHaveBeenCalledWith(mockDiv);
			expect(mockDiv.style.padding).toBe('3px');

			createElementSpy.mockRestore();
		});
	});

	describe('integration tests', () => {
		it('should initialize and work correctly', () => {
			// Should be able to init without errors
			expect(() => mousePointer.init(mockElement)).not.toThrow();

			// Should call addEventListener for pointer and scroll events
			expect(mockElement.addEventListener).toHaveBeenCalledWith(
				'pointermove',
				expect.any(Function),
				false,
			);
			expect(mockElement.addEventListener).toHaveBeenCalledWith(
				'pointerdown',
				expect.any(Function),
				false,
			);
			expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), false);

			// Should be able to clear without errors
			expect(() => mousePointer.clear(mockElement)).not.toThrow();

			// Should call removeEventListener
			expect(mockElement.removeEventListener).toHaveBeenCalledWith(
				'pointermove',
				expect.any(Function),
				false,
			);
			expect(window.removeEventListener).toHaveBeenCalledWith(
				'scroll',
				expect.any(Function),
				false,
			);
		});

		it('should maintain uniform consistency', () => {
			const { uniforms } = mousePointer;

			// All uniforms should maintain their structure
			expect(typeof uniforms.uMousePress.value).toBe('number');
			expect(uniforms.uScroll.value).toBe(mockVector2);
			expect(uniforms.uScrollVelocity.value).toBe(mockVector2);
			expect(uniforms.uMousePosition.value).toBe(mockVector2);
			expect(uniforms.uMouseVelocity.value).toBe(mockVector2);
			expect(uniforms.uMouseWorldPosition.value).toBe(mockVector3);
		});

		it('should handle window and document as valid elements', () => {
			expect(() => mousePointer.init(window)).not.toThrow();
			expect(() => mousePointer.clear(window)).not.toThrow();

			const mockDoc = {
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
			} as unknown as Document;
			expect(() => mousePointer.init(mockDoc)).not.toThrow();
			expect(() => mousePointer.clear(mockDoc)).not.toThrow();
		});
	});
});
