import { SceneWrapper } from 'joeat-utils';
import type * as Three from 'three';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock Three.js Scene and related objects
const mockMaterial = {
	dispose: vi.fn(),
	map: { dispose: vi.fn() },
	normalMap: { dispose: vi.fn() },
};

const mockGeometry = {
	dispose: vi.fn(),
};

const mockMesh = {
	geometry: mockGeometry,
	material: mockMaterial,
	children: [],
} as unknown as Three.Mesh;

const mockScene = {
	children: [mockMesh],
	clear: vi.fn(),
} as unknown as Three.Scene;

describe('SceneWrapper', () => {
	let sceneWrapper: SceneWrapper;

	beforeEach(() => {
		vi.clearAllMocks();
		sceneWrapper = new SceneWrapper({ scene: mockScene });
	});

	describe('constructor', () => {
		it('should create an instance', () => {
			expect(sceneWrapper).toBeInstanceOf(SceneWrapper);
		});

		it('should store scene instance', () => {
			expect(sceneWrapper.instance).toBe(mockScene);
		});
	});

	describe('dispose method', () => {
		it('should dispose geometry of meshes', () => {
			sceneWrapper.dispose();
			expect(mockGeometry.dispose).toHaveBeenCalled();
		});

		it('should dispose materials of meshes', () => {
			sceneWrapper.dispose();
			expect(mockMaterial.dispose).toHaveBeenCalled();
		});

		it('should dispose material properties that have dispose method', () => {
			sceneWrapper.dispose();
			expect(mockMaterial.map.dispose).toHaveBeenCalled();
			expect(mockMaterial.normalMap.dispose).toHaveBeenCalled();
		});

		it('should clear the scene', () => {
			sceneWrapper.dispose();
			expect(mockScene.clear).toHaveBeenCalled();
		});

		it('should handle array materials', () => {
			const materialArray = [
				{ dispose: vi.fn(), map: { dispose: vi.fn() } },
				{ dispose: vi.fn(), roughnessMap: { dispose: vi.fn() } },
			];

			const meshWithArrayMaterial = {
				geometry: { dispose: vi.fn() },
				material: materialArray,
				children: [],
			} as unknown as Three.Mesh;

			const sceneWithArray = {
				children: [meshWithArrayMaterial],
				clear: vi.fn(),
			} as unknown as Three.Scene;

			const wrapper = new SceneWrapper({ scene: sceneWithArray });
			wrapper.dispose();

			materialArray.forEach((mat) => {
				expect(mat.dispose).toHaveBeenCalled();
			});
		});

		it('should handle nested children', () => {
			const nestedChild = {
				geometry: { dispose: vi.fn() },
				material: { dispose: vi.fn() },
				children: [],
			} as unknown as Three.Mesh;

			const parentMesh = {
				geometry: { dispose: vi.fn() },
				material: { dispose: vi.fn() },
				children: [nestedChild],
			} as unknown as Three.Mesh;

			const sceneWithNested = {
				children: [parentMesh],
				clear: vi.fn(),
			} as unknown as Three.Scene;

			const wrapper = new SceneWrapper({ scene: sceneWithNested });
			wrapper.dispose();

			expect(parentMesh.geometry.dispose).toHaveBeenCalled();
			expect((parentMesh.material as Three.Material).dispose).toHaveBeenCalled();
			expect(nestedChild.geometry.dispose).toHaveBeenCalled();
			expect((nestedChild.material as Three.Material).dispose).toHaveBeenCalled();
		});

		it('should handle objects without geometry or material', () => {
			const emptyObject = {
				children: [],
			} as unknown as Three.Object3D;

			const sceneWithEmpty = {
				children: [emptyObject],
				clear: vi.fn(),
			} as unknown as Three.Scene;

			const wrapper = new SceneWrapper({ scene: sceneWithEmpty });

			expect(() => wrapper.dispose()).not.toThrow();
			expect(sceneWithEmpty.clear).toHaveBeenCalled();
		});

		it('should handle null or undefined children', () => {
			const sceneWithNulls = {
				children: [null, undefined, mockMesh],
				clear: vi.fn(),
			} as unknown as Three.Scene;

			const wrapper = new SceneWrapper({ scene: sceneWithNulls });

			expect(() => wrapper.dispose()).not.toThrow();
		});

		it('should handle materials without disposable properties', () => {
			const simpleMaterial = {
				dispose: vi.fn(),
				color: 0xff0000, // Non-disposable property
			};

			const simpleMesh = {
				geometry: { dispose: vi.fn() },
				material: simpleMaterial,
				children: [],
			} as unknown as Three.Mesh;

			const sceneWithSimple = {
				children: [simpleMesh],
				clear: vi.fn(),
			} as unknown as Three.Scene;

			const wrapper = new SceneWrapper({ scene: sceneWithSimple });
			wrapper.dispose();

			expect(simpleMaterial.dispose).toHaveBeenCalled();
		});
	});

	describe('static methods', () => {
		it('should have disposeMaterial as private static method', () => {
			// This tests the existence of the private method indirectly
			// by ensuring disposal works correctly
			const material = {
				dispose: vi.fn(),
				map: { dispose: vi.fn() },
				unknownProperty: 'test',
			};

			// Create a mesh that will use the disposeMaterial method
			const mesh = {
				geometry: { dispose: vi.fn() },
				material,
				children: [],
			} as unknown as Three.Mesh;

			const scene = {
				children: [mesh],
				clear: vi.fn(),
			} as unknown as Three.Scene;

			const wrapper = new SceneWrapper({ scene });
			wrapper.dispose();

			expect(material.map.dispose).toHaveBeenCalled();
			expect(material.dispose).toHaveBeenCalled();
		});

		it('should have disposeNode as private static method', () => {
			// Test indirectly through dispose functionality
			expect(() => sceneWrapper.dispose()).not.toThrow();
		});
	});

	describe('instance property', () => {
		it('should provide access to the wrapped scene', () => {
			expect(sceneWrapper.instance).toBe(mockScene);
		});

		it('should allow scene manipulation through instance', () => {
			// const newObject = {} as Three.Object3D;
			// This would work in real Three.js but we're just testing the reference
			expect(sceneWrapper.instance).toBe(mockScene);
		});
	});

	describe('edge cases', () => {
		it('should handle scene with no children', () => {
			const emptyScene = {
				children: [],
				clear: vi.fn(),
			} as unknown as Three.Scene;

			const wrapper = new SceneWrapper({ scene: emptyScene });

			expect(() => wrapper.dispose()).not.toThrow();
			expect(emptyScene.clear).toHaveBeenCalled();
		});

		it('should handle deeply nested object hierarchies', () => {
			const level3 = {
				geometry: { dispose: vi.fn() },
				material: { dispose: vi.fn() },
				children: [],
			} as unknown as Three.Mesh;

			const level2 = {
				geometry: { dispose: vi.fn() },
				material: { dispose: vi.fn() },
				children: [level3],
			} as unknown as Three.Mesh;

			const level1 = {
				geometry: { dispose: vi.fn() },
				material: { dispose: vi.fn() },
				children: [level2],
			} as unknown as Three.Mesh;

			const deepScene = {
				children: [level1],
				clear: vi.fn(),
			} as unknown as Three.Scene;

			const wrapper = new SceneWrapper({ scene: deepScene });
			wrapper.dispose();

			expect(level1.geometry.dispose).toHaveBeenCalled();
			expect(level2.geometry.dispose).toHaveBeenCalled();
			expect(level3.geometry.dispose).toHaveBeenCalled();
		});
	});
});
