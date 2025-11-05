import type * as Three from 'three';
import type { WebGPURenderer } from 'three/webgpu';

import type { Pass } from 'three/addons/postprocessing/Pass.js';
import type { EffectComposer as TEffectComposer } from 'three/examples/jsm/Addons.js';
import type { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import onShaderError from './onShaderError';

type Uniforms = {
	uResolution: { value: Three.Vector2 };
};

export default class GlRendererWrapper {
	uniforms: Uniforms;
	instance: Three.WebGLRenderer | WebGPURenderer;
	composer: TEffectComposer | undefined;

	constructor({
		instance,
		Vector2,
		EffectComposer,
	}: {
		instance: Three.WebGLRenderer;
		Vector2: typeof Three.Vector2;
		EffectComposer?: typeof TEffectComposer;
	}) {
		this.uniforms = Object.freeze({
			uResolution: { value: new Vector2() },
		});
		this.instance = instance;
		this.instance.debug.checkShaderErrors = false;

		if (!EffectComposer) return;
		this.composer = new EffectComposer(this.instance);
	}

	addEffect = (...pass: Pass[]) => {
		pass.forEach((p) => {
			if (!this.composer || !this.instance) return console.warn('EffectComposer not initialized');
			this.composer.addPass(p);
		});
	};

	removeEffect = (...pass: Pass[]) => {
		pass.forEach((p) => {
			p.dispose();
			this.composer?.removePass(p);
		});
	};

	update = (o: { scene: Three.Scene; camera: Three.Camera; deltaTime?: number }) => {
		if (!this.instance) return;

		if (this.composer) this.composer.render(o.deltaTime || 0.016);
		else this.instance.render(o.scene, o.camera);
	};

	resize = (o: { width: number; height: number; pixelRatio: number }) => {
		const { width, height, pixelRatio } = o;
		if (!this.instance) return;

		this.instance.setSize(width, height, false);
		this.instance.setPixelRatio(pixelRatio);
		this.uniforms.uResolution.value.set(width, height);
		if (this.composer) {
			this.composer.setSize(width, height);
			this.composer.setPixelRatio(pixelRatio);
		}
	};

	clear = () => {
		this.instance.dispose();
		if (this.composer) this.removeEffect(...this.composer.passes);
	};

	debug = (gui: GUI) => {
		const { instance } = this;
		if (!instance) return;

		instance.debug.checkShaderErrors = true;
		instance.debug.onShaderError = onShaderError;
		gui
			.add(instance, 'toneMapping', {
				NoToneMapping: 0,
				LinearToneMapping: 1,
				ReinhardToneMapping: 2,
				CineonToneMapping: 3,
				ACESFilmicToneMapping: 4,
				CustomToneMapping: 5,
				AgXToneMapping: 6,
				NeutralToneMapping: 7,
			})
			.name('tone mapping');
		gui.add(instance, 'toneMappingExposure', 0, 1).name('tone mapping exposure');
	};
}
