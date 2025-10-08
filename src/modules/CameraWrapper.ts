import type * as Three from 'three';
import type {
	ArcballControls,
	DragControls,
	FlyControls,
	OrbitControls,
} from 'three/examples/jsm/Addons.js';
import type { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

type Uniforms = {
	cameraDirection: { value: Three.Vector3 };
	cameraScale: { value: Three.Vector3 };
	cameraQuaternion: { value: Three.Quaternion };
};

type Controls = OrbitControls | FlyControls | ArcballControls | DragControls;

export default class CameraWrapper<T extends Controls> {
	uniforms: Uniforms;
	direction: Three.Vector3 | undefined;
	instance: Three.PerspectiveCamera | Three.OrthographicCamera;
	#controls: T | undefined;

	constructor({
		instance,
		controls,
		Vector3,
		Quaternion,
	}: {
		instance: Three.PerspectiveCamera | Three.OrthographicCamera;
		controls?: T;
		Vector3: typeof Three.Vector3;
		Quaternion: typeof Three.Quaternion;
	}) {
		this.uniforms = Object.freeze({
			cameraDirection: { value: new Vector3() },
			cameraScale: { value: new Vector3() },
			cameraQuaternion: { value: new Quaternion() },
		});
		this.instance = instance;
		if (controls) this.#controls = controls;
		// if (!this.controls) return;
		// this.controls.addEventListener('change', () => {
		// 	const { uDirection } = this.uniforms;
		// 	this.instance.getWorldDirection(uDirection.value);
		// });
	}

	get controls(): T {
		if (!this.#controls) throw new Error('Controls not initialized');
		return this.#controls;
	}

	resize = ({ width, height }: { width: number; height: number }) => {
		const { instance } = this;
		if ((instance as Three.PerspectiveCamera)?.aspect)
			(instance as Three.PerspectiveCamera).aspect = width / height;

		// if(instance instanceof Three.OrthographicCamera) {
		// 	const frustumHeight = instance.top - instance.bottom;
		// 	instance.left = (frustumHeight * width) / height / -2;
		// 	instance.right = (frustumHeight * width) / height / 2;
		// }
		this.instance.updateProjectionMatrix();
	};

	update = ({ deltaTime }: { deltaTime: number }) => {
		this.instance.getWorldDirection(this.uniforms.cameraDirection.value);
		this.instance.getWorldScale(this.uniforms.cameraScale.value);
		this.instance.getWorldQuaternion(this.uniforms.cameraQuaternion.value);
		// this.instance.getWorldPosition(this.uniforms.cameraPosition.value); // usually not needed
		if (this.#controls && this.#controls.enabled) this.#controls.update(deltaTime);
	};

	clear = () => {
		this.instance.clear();

		if (!this.#controls) return;
		this.#controls.disconnect();
		this.#controls.dispose();
	};

	debug = (gui: GUI) => {
		if (this.#controls)
			gui
				.add({ enabled: this.#controls.enabled }, 'enabled')
				.name('camera controls')
				.onChange((v) => {
					if (!this.#controls) return;
					this.#controls.enabled = v;
				});

		const { instance } = this;

		gui.add(instance.position, 'x').name('camera position x').listen();
		gui.add(instance.position, 'y').name('camera position y').listen();
		gui.add(instance.position, 'z').name('camera position z').listen();

		gui.add(this.uniforms.cameraDirection.value, 'x').name('camera direction x').disable().listen();
		gui.add(this.uniforms.cameraDirection.value, 'y').name('camera direction y').disable().listen();
		gui.add(this.uniforms.cameraDirection.value, 'z').name('camera direction z').disable().listen();
	};
}
