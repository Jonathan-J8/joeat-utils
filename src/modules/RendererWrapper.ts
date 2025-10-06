import type * as Three from 'three';
import type { Pass } from 'three/addons/postprocessing/Pass.js';
import type { EffectComposer as TEffectComposer } from 'three/examples/jsm/Addons.js';
import type { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import onShaderError from './onShaderError';

type Uniforms = {
	uResolution: { value: Three.Vector2 };
};

export default class GlRendererWrapper {
	uniforms: Uniforms;
	instance: Three.WebGLRenderer;
	composer: TEffectComposer | undefined;

	constructor({
		renderer,
		Vector2,
		EffectComposer,
	}: {
		renderer: Three.WebGLRenderer;
		Vector2: typeof Three.Vector2;
		EffectComposer?: typeof TEffectComposer;
	}) {
		this.uniforms = Object.freeze({
			uResolution: { value: new Vector2() },
		});
		this.instance = renderer;
		this.instance.debug.checkShaderErrors = false;

		if (!EffectComposer) return;
		this.composer = new EffectComposer(this.instance);
		// const renderPass = new RenderPass(scene, camera);
		// this.composer.addPass(renderPass);
	}

	addEffect = (pass: Pass) => {
		if (!this.composer || !this.instance) return;
		this.composer.addPass(pass);
	};

	removeEffect = (...pass: Pass[]) => {
		pass.forEach((p) => {
			p.dispose();
			this.composer?.removePass(p);
		});
	};

	update = (scene: Three.Scene, camera: Three.Camera, delta = 0.16) => {
		if (!this.instance) return;

		if (this.composer) this.composer.render(delta);
		else this.instance.render(scene, camera);
	};

	resize = (o: { width: number; height: number; pixelRatio: number }) => {
		const { width, height, pixelRatio } = o;
		if (!this.instance) return;
		this.instance.setSize(width, height, false);
		this.uniforms.uResolution.value.set(width, height);
		this.instance.setPixelRatio(pixelRatio);
		if (this.composer) this.composer.setSize(width, height);
	};

	clear = () => {
		if (this.instance) this.instance.dispose();
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
