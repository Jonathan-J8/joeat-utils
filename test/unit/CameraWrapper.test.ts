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
	type: 'PerspectiveCamera',
	aspect: 1,
	updateProjectionMatrix: vi.fn(),
	getWorldDirection: vi.fn((target) => {
		target.set(0, 0, -1);
		return target;
	}),
	getWorldScale: vi.fn((target) => {
		target.set(1, 1, 1);
		return target;
	}),
	getWorldQuaternion: vi.fn((target) => {
		target.set(0, 0, 0, 1);
		return target;
	}),
	clear: vi.fn(),
	position: mockCameraPosition,
} as unknown as Three.PerspectiveCamera;

const mockOrthographicCamera = {
	type: 'OrthographicCamera',
	top: 1,
	bottom: -1,
	left: -1,
	right: 1,
	updateProjectionMatrix: vi.fn(),
	getWorldDirection: vi.fn((target) => {
		target.set(0, 0, -1);
		return target;
	}),
	getWorldScale: vi.fn((target) => {
		target.set(1, 1, 1);
		return target;
	}),
	getWorldQuaternion: vi.fn((target) => {
		target.set(0, 0, 0, 1);
		return target;
	}),
	clear: vi.fn(),
	position: mockCameraPosition,
} as unknown as Three.OrthographicCamera;

const mockControls = {
	object: mockPerspectiveCamera,
	addEventListener: vi.fn(),
	update: vi.fn(),
	disconnect: vi.fn(),
	dispose: vi.fn(),
	enabled: true,
	enableDamping: false,
	dampingFactor: 0.05,
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

		it('should create uniforms with all required vectors', () => {
			expect(cameraWrapper.uniforms).toBeDefined();
			expect(cameraWrapper.uniforms.cameraDirection).toBeDefined();
			expect(cameraWrapper.uniforms.cameraScale).toBeDefined();
			expect(cameraWrapper.uniforms.cameraQuaternion).toBeDefined();
			expect(cameraWrapper.uniforms.cameraDirection.value).toBe(mockVector3);
			expect(cameraWrapper.uniforms.cameraScale.value).toBe(mockVector3);
			expect(cameraWrapper.uniforms.cameraQuaternion.value).toBe(mockQuaternion);
			expect(Object.isFrozen(cameraWrapper.uniforms)).toBe(true);
		});

		it('should set camera based on controls object type', () => {
			const orthographicControls = {
				...mockControls,
				object: mockOrthographicCamera,
			} as unknown as OrbitControls;

			const orthographicWrapper = new CameraWrapper({
				perspective: mockPerspectiveCamera,
				orthographic: mockOrthographicCamera,
				controls: orthographicControls,
				Vector3: mockVector3Class,
				Quaternion: mockQuaternionClass,
			});

			expect(orthographicWrapper.instance).toBe(mockOrthographicCamera);
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

		it('should update orthographic camera bounds', () => {
			const width = 800;
			const height = 600;
			const frustumHeight = mockOrthographicCamera.top - mockOrthographicCamera.bottom;
			const expectedLeft = (frustumHeight * width) / height / -2;
			const expectedRight = (frustumHeight * width) / height / 2;

			cameraWrapper.resize({ width, height });

			expect(mockOrthographicCamera.left).toBe(expectedLeft);
			expect(mockOrthographicCamera.right).toBe(expectedRight);
			expect(mockOrthographicCamera.updateProjectionMatrix).toHaveBeenCalled();
		});

		it('should handle different aspect ratios', () => {
			cameraWrapper.resize({ width: 800, height: 600 });
			expect(mockPerspectiveCamera.aspect).toBeCloseTo(1.333, 2);

			cameraWrapper.resize({ width: 1920, height: 1080 });
			expect(mockPerspectiveCamera.aspect).toBeCloseTo(1.777, 2);
		});

		it('should always call updateProjectionMatrix for both cameras', () => {
			vi.clearAllMocks();
			cameraWrapper.resize({ width: 100, height: 100 });
			expect(mockPerspectiveCamera.updateProjectionMatrix).toHaveBeenCalled();
			expect(mockOrthographicCamera.updateProjectionMatrix).toHaveBeenCalled();
		});
	});

	describe('update method', () => {
		it('should update all world uniforms', () => {
			const deltaTime = 16;

			cameraWrapper.update({ deltaTime });

			expect(mockPerspectiveCamera.getWorldDirection).toHaveBeenCalledWith(
				cameraWrapper.uniforms.cameraDirection.value,
			);
			expect(mockPerspectiveCamera.getWorldScale).toHaveBeenCalledWith(
				cameraWrapper.uniforms.cameraScale.value,
			);
			expect(mockPerspectiveCamera.getWorldQuaternion).toHaveBeenCalledWith(
				cameraWrapper.uniforms.cameraQuaternion.value,
			);
		});

		it('should update controls if available and enabled', () => {
			const deltaTime = 16;

			cameraWrapper.update({ deltaTime });

			expect(mockControls.update).toHaveBeenCalledWith(deltaTime);
		});

		it('should not update controls if disabled', () => {
			const deltaTime = 16;
			mockControls.enabled = false;

			cameraWrapper.update({ deltaTime });

			expect(mockControls.update).not.toHaveBeenCalled();

			// Reset for other tests
			mockControls.enabled = true;
		});
	});

	describe('clear method', () => {
		it('should clear all cameras', () => {
			cameraWrapper.clear();
			expect(mockPerspectiveCamera.clear).toHaveBeenCalled();
			expect(mockOrthographicCamera.clear).toHaveBeenCalled();
		});

		it('should disconnect and dispose controls if available', () => {
			cameraWrapper.clear();

			expect(mockControls.disconnect).toHaveBeenCalled();
			expect(mockControls.dispose).toHaveBeenCalled();
		});
	});

	describe('debug method', () => {
		beforeEach(() => {
			vi.clearAllMocks();
		});

		it('should add controls enabled toggle to GUI', () => {
			cameraWrapper.debug(mockGUI);

			expect(mockGUI.add).toHaveBeenCalledWith({ enabled: mockControls.enabled }, 'enabled');
		});

		it('should add camera type toggle to GUI', () => {
			cameraWrapper.debug(mockGUI);

			expect(mockGUI.add).toHaveBeenCalledWith({ orthographic: false }, 'orthographic');
		});

		it('should add camera position controls to GUI', () => {
			cameraWrapper.debug(mockGUI);

			expect(mockGUI.add).toHaveBeenCalledWith(mockCameraPosition, 'x');
			expect(mockGUI.add).toHaveBeenCalledWith(mockCameraPosition, 'y');
			expect(mockGUI.add).toHaveBeenCalledWith(mockCameraPosition, 'z');
		});

		it('should add camera direction controls to GUI (disabled)', () => {
			cameraWrapper.debug(mockGUI);

			expect(mockGUI.add).toHaveBeenCalledWith(cameraWrapper.uniforms.cameraDirection.value, 'x');
			expect(mockGUI.add).toHaveBeenCalledWith(cameraWrapper.uniforms.cameraDirection.value, 'y');
			expect(mockGUI.add).toHaveBeenCalledWith(cameraWrapper.uniforms.cameraDirection.value, 'z');
		});

		it('should add damping controls for OrbitControls', () => {
			cameraWrapper.debug(mockGUI);

			expect(mockGUI.add).toHaveBeenCalledWith(
				{ enableDamping: mockControls.enableDamping },
				'enableDamping',
			);
			expect(mockGUI.add).toHaveBeenCalledWith(
				{ dampingFactor: mockControls.dampingFactor },
				'dampingFactor',
				0,
				1,
				0.01,
			);
		});
	});

	describe('instance property', () => {
		it('should expose camera instance', () => {
			expect(cameraWrapper.instance).toBe(mockPerspectiveCamera);
		});

		it('should switch to orthographic camera', () => {
			cameraWrapper.instance = 'OrthographicCamera';
			expect(cameraWrapper.instance).toBe(mockOrthographicCamera);
			expect(mockControls.object).toBe(mockOrthographicCamera);
		});

		it('should switch to perspective camera', () => {
			cameraWrapper.instance = 'OrthographicCamera';
			cameraWrapper.instance = 'PerspectiveCamera';
			expect(cameraWrapper.instance).toBe(mockPerspectiveCamera);
			expect(mockControls.object).toBe(mockPerspectiveCamera);
		});

		it('should handle invalid camera type and default to perspective', () => {
			const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

			// @ts-expect-error - Testing invalid input
			cameraWrapper.instance = 'InvalidCamera';
			expect(cameraWrapper.instance).toBe(mockPerspectiveCamera);
			expect(consoleSpy).toHaveBeenCalledWith(
				'Invalid camera type: use "OrthographicCamera" or "PerspectiveCamera". Falling back to "PerspectiveCamera"',
			);

			consoleSpy.mockRestore();
		});

		it('should expose controls', () => {
			expect(cameraWrapper.controls).toBe(mockControls);
		});

		it('should expose perspective and orthographic cameras', () => {
			expect(cameraWrapper.perspective).toBe(mockPerspectiveCamera);
			expect(cameraWrapper.orthographic).toBe(mockOrthographicCamera);
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
