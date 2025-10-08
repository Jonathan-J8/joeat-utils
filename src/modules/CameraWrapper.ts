import type * as Three from 'three';
import type {
	ArcballControls,
	DragControls,
	FlyControls,
	OrbitControls,
} from 'three/examples/jsm/Addons.js';
import type { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

type Controls = OrbitControls | FlyControls | ArcballControls | DragControls;

type Uniforms = {
	uDirection: { value: Three.Vector3 };
};

export default class CameraWrapper {
	uniforms: Uniforms;
	direction: Three.Vector3 | undefined;
	instance: Three.PerspectiveCamera | Three.OrthographicCamera;
	#controls: Controls | undefined;

	constructor({
		instance,
		controls,
		Vector3,
	}: {
		instance: Three.PerspectiveCamera | Three.OrthographicCamera;
		controls?: Controls;
		Vector3: typeof Three.Vector3;
	}) {
		this.uniforms = Object.freeze({
			uDirection: { value: new Vector3() },
		});
		this.instance = instance;
		this.#controls = controls;
		// if (!this.controls) return;
		// this.controls.addEventListener('change', () => {
		// 	const { uDirection } = this.uniforms;
		// 	this.instance.getWorldDirection(uDirection.value);
		// });
	}

	get controls(): Controls {
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
		this.instance.getWorldDirection(this.uniforms.uDirection.value);
		if (this.#controls) this.#controls.update(deltaTime);
	};

	clear = () => {
		this.instance.clear();

		if (!this.#controls) return;
		this.#controls.disconnect();
		this.#controls.dispose();
	};

	debug = (gui: GUI) => {
		if (this.#controls) gui.add(this.#controls, 'enabled').name('camera controls');

		const { instance, direction } = this;
		gui.add(instance.position, 'x').name('camera position x').listen();
		gui.add(instance.position, 'y').name('camera position y').listen();
		gui.add(instance.position, 'z').name('camera position z').listen();

		if (!direction) return;
		gui
			.add(direction, 'x')
			.name('camera direction x')
			.onChange(() => {
				instance.lookAt(direction);
			})
			.listen();
		gui
			.add(direction, 'y')
			.name('camera direction y')
			.onChange(() => {
				instance.lookAt(direction);
			})
			.listen();
		gui
			.add(direction, 'z')
			.name('camera direction z')
			.onChange(() => {
				instance.lookAt(direction);
			})
			.listen();
	};
}
