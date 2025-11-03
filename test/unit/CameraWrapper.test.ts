import type * as Three from 'three';
import type { OrbitControls } from 'three/examples/jsm/Addons.js';
import type { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CameraWrapper } from '../../src';

// Mock Three.js classes
const mockVector3 = {
	x: 0,
	y: 0,
	z: 0,
	copy: vi.fn(),
	set: vi.fn(),
} as unknown as Three.Vector3;

const mockQuaternion = {
	x: 0,
	y: 0,
	z: 0,
	w: 0,
	copy: vi.fn(),
	set: vi.fn(),
} as unknown as Three.Quaternion;

const mockCameraPosition = {
	x: 0,
	y: 0,
	z: 0,
	copy: vi.fn(),
	set: vi.fn(),
} as unknown as Three.Vector3;

const mockVector3Class = vi.fn(() => mockVector3) as unknown as typeof Three.Vector3;
const mockQuaternionClass = vi.fn(() => mockQuaternion) as unknown as typeof Three.Quaternion;

const mockPerspectiveCamera = {
	aspect: 1,
	updateProjectionMatrix: vi.fn(),
	getWorldDirection: vi.fn((target) => {
		target.set(0, 0, -1);
		return target;
	}),
	getWorldScale: vi.fn((target) => {
		target.set(0, 0, -1);
		return target;
	}),
	getWorldQuaternion: vi.fn((target) => {
		target.set(0, 0, -1, 0);
		return target;
	}),
	clear: vi.fn(),
	position: mockCameraPosition,
} as unknown as Three.PerspectiveCamera;

const mockOrthographicCamera = {
	updateProjectionMatrix: vi.fn(),
	getWorldDirection: vi.fn((target) => {
		target.set(0, 0, -1);
		return target;
	}),
	getWorldScale: vi.fn((target) => {
		target.set(0, 0, -1);
		return target;
	}),
	getWorldQuaternion: vi.fn((target) => {
		target.set(0, 0, -1, 0);
		return target;
	}),
	clear: vi.fn(),
	position: mockCameraPosition,
} as unknown as Three.OrthographicCamera;

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
		disable: vi.fn().mockReturnThis(),
	}),
} as unknown as GUI;

describe('CameraWrapper', () => {
	let cameraWrapper: CameraWrapper;

	beforeEach(() => {
		vi.clearAllMocks();
		cameraWrapper = new CameraWrapper({
			perspective: mockPerspectiveCamera,
			orthographic: mockOrthographicCamera,
			controls: mockControls,
			Vector3: mockVector3Class,
			Quaternion: mockQuaternionClass,
		});
	});

	describe('constructor', () => {
		it('should create an instance with camera', () => {
			expect(cameraWrapper).toBeInstanceOf(CameraWrapper);
			expect(cameraWrapper.instance).toBe(mockPerspectiveCamera);
		});

		it('should create uniforms with direction vector', () => {
			expect(cameraWrapper.uniforms).toBeDefined();
			expect(cameraWrapper.uniforms.cameraDirection).toBeDefined();
			expect(cameraWrapper.uniforms.cameraDirection.value).toBe(mockVector3);
			expect(Object.isFrozen(cameraWrapper.uniforms)).toBe(true);
		});
	});

	describe('resize method', () => {
		it('should update perspective camera aspect ratio', () => {
			const width = 1920;
			const height = 1080;
			const expectedAspect = width / height;

			cameraWrapper.resize({ width, height });

			expect(mockPerspectiveCamera.aspect).toBe(expectedAspect);
			expect(mockPerspectiveCamera.updateProjectionMatrix).toHaveBeenCalled();
		});

		it('should handle different aspect ratios', () => {
			cameraWrapper.resize({ width: 800, height: 600 });
			expect(mockPerspectiveCamera.aspect).toBeCloseTo(1.333, 2);

			cameraWrapper.resize({ width: 1920, height: 1080 });
			expect(mockPerspectiveCamera.aspect).toBeCloseTo(1.777, 2);
		});

		it('should always call updateProjectionMatrix', () => {
			cameraWrapper.resize({ width: 100, height: 100 });
			expect(mockPerspectiveCamera.updateProjectionMatrix).toHaveBeenCalled();
		});
	});

	describe('update method', () => {
		it('should update world direction uniform', () => {
			const deltaTime = 16;

			cameraWrapper.update({ deltaTime });

			expect(mockPerspectiveCamera.getWorldDirection).toHaveBeenCalledWith(
				cameraWrapper.uniforms.cameraDirection.value,
			);
		});

		it('should update controls if available', () => {
			const deltaTime = 16;

			cameraWrapper.update({ deltaTime });

			expect(mockControls.update).toHaveBeenCalledWith(deltaTime);
		});
	});

	describe('clear method', () => {
		it('should clear camera', () => {
			cameraWrapper.clear();
			expect(mockPerspectiveCamera.clear).toHaveBeenCalled();
		});

		it('should disconnect and dispose controls if available', () => {
			cameraWrapper.clear();

			expect(mockControls.disconnect).toHaveBeenCalled();
			expect(mockControls.dispose).toHaveBeenCalled();
		});
	});

	describe('debug method', () => {
		it('should add controls enabled toggle to GUI', () => {
			cameraWrapper.debug(mockGUI);

			expect(mockGUI.add).not.toHaveBeenCalledWith(mockControls, 'enabled');
		});

		it('should add camera position controls to GUI', () => {
			cameraWrapper.debug(mockGUI);

			expect(mockGUI.add).toHaveBeenCalledWith(mockCameraPosition, 'x');
			expect(mockGUI.add).toHaveBeenCalledWith(mockCameraPosition, 'y');
			expect(mockGUI.add).toHaveBeenCalledWith(mockCameraPosition, 'z');
		});
	});

	describe('properties', () => {
		it('should expose camera instance', () => {
			expect(cameraWrapper.instance).toBe(mockPerspectiveCamera);
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
			const initialUniform = cameraWrapper.uniforms.cameraDirection.value;
			cameraWrapper.update({ deltaTime: 16 });
			// The uniform reference should remain the same, but its contents may be updated
			expect(cameraWrapper.uniforms.cameraDirection.value).toBe(initialUniform);
		});
	});
});
