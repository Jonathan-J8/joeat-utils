import type * as Three from 'three';
import type { Pass } from 'three/addons/postprocessing/Pass.js';
import type { EffectComposer } from 'three/examples/jsm/Addons.js';
import type { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RendererWrapper } from '../../src';

describe('RendererWrapper', () => {
	// Mock Vector2
	const createMockVector2 = () => ({
		x: 0,
		y: 0,
		set: vi.fn().mockImplementation(function (
			this: { x: number; y: number },
			x: number,
			y: number,
		) {
			this.x = x;
			this.y = y;
			return this;
		}),
		copy: vi.fn().mockReturnThis(),
	});

	// Mock WebGL Renderer
	const mockRenderer = {
		setSize: vi.fn(),
		setPixelRatio: vi.fn(),
		render: vi.fn(),
		dispose: vi.fn(),
		debug: {
			checkShaderErrors: true,
			onShaderError: vi.fn(),
		},
		toneMapping: 0,
		toneMappingExposure: 1,
	} as unknown as Three.WebGLRenderer;

	// Mock EffectComposer
	const mockComposer = {
		addPass: vi.fn(),
		removePass: vi.fn(),
		render: vi.fn(),
		setSize: vi.fn(),
		setPixelRatio: vi.fn(),
	} as unknown as EffectComposer;

	// Mock Pass
	const mockPass = {
		dispose: vi.fn(),
		enabled: true,
	} as unknown as Pass;

	// Mock Scene and Camera
	const mockScene = {} as Three.Scene;
	const mockCamera = {} as Three.Camera;

	// Mock GUI
	const mockAdd = vi.fn().mockReturnValue({
		name: vi.fn().mockReturnThis(),
	});
	const mockGui = {
		add: mockAdd,
	} as unknown as GUI;

	const mockVector2Class = vi.fn(createMockVector2) as unknown as typeof Three.Vector2;
	const mockEffectComposerClass = vi.fn(() => mockComposer) as unknown as typeof EffectComposer;

	let rendererWrapper: RendererWrapper;

	beforeEach(() => {
		vi.clearAllMocks();

		rendererWrapper = new RendererWrapper({
			instance: mockRenderer,
			Vector2: mockVector2Class,
			EffectComposer: mockEffectComposerClass,
		});
	});

	describe('constructor', () => {
		it('should create instance with correct structure', () => {
			expect(rendererWrapper).toBeInstanceOf(RendererWrapper);
			expect(rendererWrapper.instance).toBe(mockRenderer);
			expect(rendererWrapper.composer).toBe(mockComposer);
		});

		it('should initialize uniforms correctly', () => {
			expect(rendererWrapper.uniforms.uResolution).toBeDefined();
			expect(rendererWrapper.uniforms.uResolution.value).toEqual(
				expect.objectContaining({
					x: 0,
					y: 0,
					set: expect.any(Function),
				}),
			);
		});

		it('should freeze uniforms object', () => {
			expect(Object.isFrozen(rendererWrapper.uniforms)).toBe(true);
		});

		it('should disable shader error checking by default', () => {
			expect(mockRenderer.debug.checkShaderErrors).toBe(false);
		});

		it('should create composer when EffectComposer is provided', () => {
			expect(mockEffectComposerClass).toHaveBeenCalledWith(mockRenderer);
			expect(rendererWrapper.composer).toBe(mockComposer);
		});

		it('should work without EffectComposer', () => {
			const wrapperWithoutComposer = new RendererWrapper({
				instance: mockRenderer,
				Vector2: mockVector2Class,
			});

			expect(wrapperWithoutComposer.composer).toBeUndefined();
		});
	});

	describe('addEffect method', () => {
		it('should add pass to composer when composer exists', () => {
			rendererWrapper.addEffect(mockPass);

			expect(mockComposer.addPass).toHaveBeenCalledWith(mockPass);
		});

		it('should handle missing composer gracefully', () => {
			const wrapperWithoutComposer = new RendererWrapper({
				instance: mockRenderer,
				Vector2: mockVector2Class,
			});

			expect(() => wrapperWithoutComposer.addEffect(mockPass)).not.toThrow();
		});

		it('should handle missing instance gracefully', () => {
			// @ts-expect-error - Testing edge case
			rendererWrapper.composer = null;
			expect(() => rendererWrapper.addEffect(mockPass)).not.toThrow();
		});
	});

	describe('removeEffect method', () => {
		it('should remove single pass', () => {
			rendererWrapper.removeEffect(mockPass);

			expect(mockPass.dispose).toHaveBeenCalled();
			expect(mockComposer.removePass).toHaveBeenCalledWith(mockPass);
		});

		it('should remove multiple passes', () => {
			const mockPass2 = { dispose: vi.fn() } as unknown as Pass;

			rendererWrapper.removeEffect(mockPass, mockPass2);

			expect(mockPass.dispose).toHaveBeenCalled();
			expect(mockPass2.dispose).toHaveBeenCalled();
			expect(mockComposer.removePass).toHaveBeenCalledWith(mockPass);
			expect(mockComposer.removePass).toHaveBeenCalledWith(mockPass2);
		});

		it('should handle missing composer gracefully', () => {
			const wrapperWithoutComposer = new RendererWrapper({
				instance: mockRenderer,
				Vector2: mockVector2Class,
			});

			expect(() => wrapperWithoutComposer.removeEffect(mockPass)).not.toThrow();
			expect(mockPass.dispose).toHaveBeenCalled();
		});
	});

	describe('update method', () => {
		it('should render with composer when available', () => {
			const deltaTime = 0.02;
			rendererWrapper.update({ scene: mockScene, camera: mockCamera, deltaTime });

			expect(mockComposer.render).toHaveBeenCalledWith(deltaTime);
			expect(mockRenderer.render).not.toHaveBeenCalled();
		});

		it('should render directly when no composer', () => {
			const wrapperWithoutComposer = new RendererWrapper({
				instance: mockRenderer,
				Vector2: mockVector2Class,
			});

			wrapperWithoutComposer.update({ scene: mockScene, camera: mockCamera, deltaTime: 0.02 });

			expect(mockRenderer.render).toHaveBeenCalledWith(mockScene, mockCamera);
		});

		it('should use default delta time', () => {
			rendererWrapper.update({ scene: mockScene, camera: mockCamera });

			expect(mockComposer.render).toHaveBeenCalledWith(0.016);
		});

		it('should handle missing instance gracefully', () => {
			// @ts-expect-error - Testing edge case
			rendererWrapper.instance = null;

			expect(() => rendererWrapper.update({ scene: mockScene, camera: mockCamera })).not.toThrow();
		});
	});

	describe('resize method', () => {
		it('should resize renderer and update resolution uniform', () => {
			const resizeParams = { width: 1920, height: 1080, pixelRatio: 2 };

			rendererWrapper.resize(resizeParams);

			expect(mockRenderer.setSize).toHaveBeenCalledWith(1920, 1080, false);
			expect(mockRenderer.setPixelRatio).toHaveBeenCalledWith(2);
			expect(rendererWrapper.uniforms.uResolution.value.x).toBe(1920);
			expect(rendererWrapper.uniforms.uResolution.value.y).toBe(1080);
		});

		it('should resize composer when available', () => {
			const resizeParams = { width: 800, height: 600, pixelRatio: 1 };

			rendererWrapper.resize(resizeParams);

			expect(mockComposer.setSize).toHaveBeenCalledWith(800, 600);
		});

		it('should work without composer', () => {
			const wrapperWithoutComposer = new RendererWrapper({
				instance: mockRenderer,
				Vector2: mockVector2Class,
			});
			const resizeParams = { width: 1024, height: 768, pixelRatio: 1.5 };

			wrapperWithoutComposer.resize(resizeParams);

			expect(mockRenderer.setSize).toHaveBeenCalledWith(1024, 768, false);
			expect(mockRenderer.setPixelRatio).toHaveBeenCalledWith(1.5);
		});

		it('should handle missing instance gracefully', () => {
			// @ts-expect-error - Testing edge case
			rendererWrapper.instance = null;
			const resizeParams = { width: 800, height: 600, pixelRatio: 1 };

			expect(() => rendererWrapper.resize(resizeParams)).not.toThrow();
		});

		it('should handle different pixel ratios', () => {
			const highDpiParams = { width: 1920, height: 1080, pixelRatio: 3 };

			rendererWrapper.resize(highDpiParams);

			expect(mockRenderer.setPixelRatio).toHaveBeenCalledWith(3);
		});
	});

	describe('clear method', () => {
		it('should dispose renderer and composer passes', () => {
			const mockPass1 = { dispose: vi.fn() } as unknown as Pass;
			const mockPass2 = { dispose: vi.fn() } as unknown as Pass;

			// Set up passes in composer
			Object.defineProperty(mockComposer, 'passes', {
				value: [mockPass1, mockPass2],
				configurable: true,
			});

			rendererWrapper.clear();

			expect(mockRenderer.dispose).toHaveBeenCalled();
			expect(mockPass1.dispose).toHaveBeenCalled();
			expect(mockPass2.dispose).toHaveBeenCalled();
		});

		it('should handle missing composer gracefully', () => {
			const wrapperWithoutComposer = new RendererWrapper({
				instance: mockRenderer,
				Vector2: mockVector2Class,
			});

			expect(() => wrapperWithoutComposer.clear()).not.toThrow();
			expect(mockRenderer.dispose).toHaveBeenCalled();
		});
	});

	describe('debug method', () => {
		it('should enable shader error checking and setup GUI controls', () => {
			rendererWrapper.debug(mockGui);

			expect(mockRenderer.debug.checkShaderErrors).toBe(true);
			expect(mockRenderer.debug.onShaderError).toBeDefined();
			expect(mockGui.add).toHaveBeenCalledTimes(2);
		});

		it('should add tone mapping control', () => {
			rendererWrapper.debug(mockGui);

			expect(mockGui.add).toHaveBeenCalledWith(mockRenderer, 'toneMapping', expect.any(Object));
		});

		it('should add tone mapping exposure control', () => {
			rendererWrapper.debug(mockGui);

			expect(mockGui.add).toHaveBeenCalledWith(mockRenderer, 'toneMappingExposure', 0, 1);
		});

		it('should handle missing instance gracefully', () => {
			// @ts-expect-error - Testing edge case
			rendererWrapper.instance = null;

			expect(() => rendererWrapper.debug(mockGui)).not.toThrow();
		});

		it('should setup shader error handler', () => {
			rendererWrapper.debug(mockGui);

			expect(mockRenderer.debug.onShaderError).toBeDefined();
		});
	});

	describe('integration tests', () => {
		it('should handle complete rendering pipeline', () => {
			// Setup
			const resizeParams = { width: 1920, height: 1080, pixelRatio: 2 };
			rendererWrapper.resize(resizeParams);

			// Add effect
			rendererWrapper.addEffect(mockPass);

			// Render frame
			rendererWrapper.update(mockScene, mockCamera, 0.016);

			// Verify pipeline
			expect(mockRenderer.setSize).toHaveBeenCalledWith(1920, 1080, false);
			expect(mockComposer.addPass).toHaveBeenCalledWith(mockPass);
			expect(mockComposer.render).toHaveBeenCalledWith(0.016);
		});

		it('should handle effect management lifecycle', () => {
			// Add effects
			const pass1 = { dispose: vi.fn() } as unknown as Pass;
			const pass2 = { dispose: vi.fn() } as unknown as Pass;

			rendererWrapper.addEffect(pass1);
			rendererWrapper.addEffect(pass2);

			// Remove effects
			rendererWrapper.removeEffect(pass1, pass2);

			expect(mockComposer.addPass).toHaveBeenCalledWith(pass1);
			expect(mockComposer.addPass).toHaveBeenCalledWith(pass2);
			expect(pass1.dispose).toHaveBeenCalled();
			expect(pass2.dispose).toHaveBeenCalled();
		});

		it('should maintain uniform consistency', () => {
			const resizeParams = { width: 800, height: 600, pixelRatio: 1 };
			rendererWrapper.resize(resizeParams);

			expect(rendererWrapper.uniforms.uResolution.value.x).toBe(800);
			expect(rendererWrapper.uniforms.uResolution.value.y).toBe(600);
		});
	});
});
