import { CameraWrapper } from 'joeat-utils';
import type * as Three from 'three';
import type { OrbitControls } from 'three/examples/jsm/Addons.js';
import type { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock Three.js classes
const mockVector3 = {
	x: 0,
	y: 0,
	z: 0,
	copy: vi.fn(),
	set: vi.fn(),
} as unknown as Three.Vector3;

const mockCameraPosition = {
	x: 0,
	y: 0,
	z: 0,
	copy: vi.fn(),
	set: vi.fn(),
} as unknown as Three.Vector3;

const mockVector3Class = vi.fn(() => mockVector3) as unknown as typeof Three.Vector3;

const mockCamera = {
	aspect: 1,
	updateProjectionMatrix: vi.fn(),
	getWorldDirection: vi.fn((target) => {
		target.set(0, 0, -1);
		return target;
	}),
	clear: vi.fn(),
	position: mockCameraPosition,
} as unknown as Three.PerspectiveCamera;

const mockControls = {
	addEventListener: vi.fn(),
	update: vi.fn(),
	disconnect: vi.fn(),
	dispose: vi.fn(),
	enabled: true,
} as unknown as OrbitControls;

const mockGUI = {
	add: vi.fn().mockReturnValue({
		name: vi.fn().mockReturnThis(),
		onChange: vi.fn().mockReturnThis(),
		listen: vi.fn().mockReturnThis(),
	}),
} as unknown as GUI;

describe('CameraWrapper', () => {
	let cameraWrapper: CameraWrapper;

	beforeEach(() => {
		vi.clearAllMocks();
		cameraWrapper = new CameraWrapper({
			camera: mockCamera,
			controls: mockControls,
			Vector3: mockVector3Class,
		});
	});

	describe('constructor', () => {
		it('should create an instance with camera', () => {
			expect(cameraWrapper).toBeInstanceOf(CameraWrapper);
			expect(cameraWrapper.instance).toBe(mockCamera);
		});

		it('should create uniforms with direction vector', () => {
			expect(cameraWrapper.uniforms).toBeDefined();
			expect(cameraWrapper.uniforms.uDirection).toBeDefined();
			expect(cameraWrapper.uniforms.uDirection.value).toBe(mockVector3);
			expect(Object.isFrozen(cameraWrapper.uniforms)).toBe(true);
		});

		it('should set up controls if provided', () => {
			expect(cameraWrapper.controls).toBe(mockControls);
			expect(mockControls.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
		});

		it('should work without controls', () => {
			const wrapperWithoutControls = new CameraWrapper({
				camera: mockCamera,
				Vector3: mockVector3Class,
			});
			expect(wrapperWithoutControls.controls).toBeUndefined();
		});
	});

	describe('resize method', () => {
		it('should update perspective camera aspect ratio', () => {
			const width = 1920;
			const height = 1080;
			const expectedAspect = width / height;

			cameraWrapper.resize({ width, height });

			expect(mockCamera.aspect).toBe(expectedAspect);
			expect(mockCamera.updateProjectionMatrix).toHaveBeenCalled();
		});

		it('should handle different aspect ratios', () => {
			cameraWrapper.resize({ width: 800, height: 600 });
			expect(mockCamera.aspect).toBeCloseTo(1.333, 2);

			cameraWrapper.resize({ width: 1920, height: 1080 });
			expect(mockCamera.aspect).toBeCloseTo(1.777, 2);
		});

		it('should always call updateProjectionMatrix', () => {
			cameraWrapper.resize({ width: 100, height: 100 });
			expect(mockCamera.updateProjectionMatrix).toHaveBeenCalled();
		});
	});

	describe('update method', () => {
		it('should update world direction uniform', () => {
			const deltaTime = 16;

			cameraWrapper.update({ deltaTime });

			expect(mockCamera.getWorldDirection).toHaveBeenCalledWith(
				cameraWrapper.uniforms.uDirection.value,
			);
		});

		it('should update controls if available', () => {
			const deltaTime = 16;

			cameraWrapper.update({ deltaTime });

			expect(mockControls.update).toHaveBeenCalledWith(deltaTime);
		});

		it('should work without controls', () => {
			const wrapperWithoutControls = new CameraWrapper({
				camera: mockCamera,
				Vector3: mockVector3Class,
			});

			expect(() => wrapperWithoutControls.update({ deltaTime: 16 })).not.toThrow();
		});
	});

	describe('clear method', () => {
		it('should clear camera', () => {
			cameraWrapper.clear();
			expect(mockCamera.clear).toHaveBeenCalled();
		});

		it('should disconnect and dispose controls if available', () => {
			cameraWrapper.clear();

			expect(mockControls.disconnect).toHaveBeenCalled();
			expect(mockControls.dispose).toHaveBeenCalled();
		});

		it('should work without controls', () => {
			const wrapperWithoutControls = new CameraWrapper({
				camera: mockCamera,
				Vector3: mockVector3Class,
			});

			expect(() => wrapperWithoutControls.clear()).not.toThrow();
		});
	});

	describe('debug method', () => {
		it('should add controls enabled toggle to GUI', () => {
			cameraWrapper.debug(mockGUI);

			expect(mockGUI.add).toHaveBeenCalledWith(mockControls, 'enabled');
		});

		it('should add camera position controls to GUI', () => {
			cameraWrapper.debug(mockGUI);

			expect(mockGUI.add).toHaveBeenCalledWith(mockCameraPosition, 'x');
			expect(mockGUI.add).toHaveBeenCalledWith(mockCameraPosition, 'y');
			expect(mockGUI.add).toHaveBeenCalledWith(mockCameraPosition, 'z');
		});

		it('should work without controls', () => {
			const wrapperWithoutControls = new CameraWrapper({
				camera: mockCamera,
				Vector3: mockVector3Class,
			});

			expect(() => wrapperWithoutControls.debug(mockGUI)).not.toThrow();
		});
	});

	describe('properties', () => {
		it('should expose camera instance', () => {
			expect(cameraWrapper.instance).toBe(mockCamera);
		});

		it('should expose controls', () => {
			expect(cameraWrapper.controls).toBe(mockControls);
		});

		it('should allow setting direction', () => {
			const newDirection = { x: 1, y: 1, z: 1 } as Three.Vector3;
			cameraWrapper.direction = newDirection;
			expect(cameraWrapper.direction).toBe(newDirection);
		});
	});

	describe('uniforms integration', () => {
		it('should maintain consistent uniform reference', () => {
			const uniformsBefore = cameraWrapper.uniforms;
			cameraWrapper.update({ deltaTime: 16 });
			expect(cameraWrapper.uniforms).toBe(uniformsBefore);
		});

		it('should update uniform values through camera methods', () => {
			const initialUniform = cameraWrapper.uniforms.uDirection.value;
			cameraWrapper.update({ deltaTime: 16 });
			// The uniform reference should remain the same, but its contents may be updated
			expect(cameraWrapper.uniforms.uDirection.value).toBe(initialUniform);
		});
	});
});
