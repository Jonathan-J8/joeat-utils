import type * as Three from 'three';
import type {
	ArcballControls,
	DragControls,
	FlyControls,
	OrbitControls,
} from 'three/examples/jsm/Addons.js';
import type { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

type Uniforms = {
	uDirection: { value: Three.Vector3 };
};

export default class CameraWrapper {
	uniforms: Uniforms;
	direction: Three.Vector3 | undefined;
	instance: Three.PerspectiveCamera | Three.OrthographicCamera;
	controls: OrbitControls | FlyControls | ArcballControls | DragControls | undefined;

	constructor({
		camera,
		controls,
		Vector3,
	}: {
		camera: Three.PerspectiveCamera | Three.OrthographicCamera;
		controls?: OrbitControls;
		Vector3: typeof Three.Vector3;
	}) {
		this.uniforms = Object.freeze({
			uDirection: { value: new Vector3() },
		});
		this.instance = camera;
		this.controls = controls;
		if (!this.controls) return;
		this.controls.addEventListener('change', () => {
			const { uDirection } = this.uniforms;
			this.instance.getWorldDirection(uDirection.value);
		});
	}

	resize = ({ width, height }: { width: number; height: number }) => {
		const { instance } = this;
		// if (Object.hasOwn(instance, 'aspect')) instance.aspect = width / height;

		if ((instance as Three.PerspectiveCamera)?.aspect)
			(instance as Three.PerspectiveCamera).aspect = width / height;

		// if (instance?.isPerspectiveCamera) instance.aspect = width / height;
		// if(instance instanceof Three.OrthographicCamera) {
		// 	const frustumHeight = instance.top - instance.bottom;
		// 	instance.left = (frustumHeight * width) / height / -2;
		// 	instance.right = (frustumHeight * width) / height / 2;
		// }
		this.instance.updateProjectionMatrix();
	};

	update = ({ deltaTime }: { deltaTime: number }) => {
		this.instance.getWorldDirection(this.uniforms.uDirection.value);
		if (this.controls) this.controls.update(deltaTime);
	};

	clear = () => {
		const { controls, instance } = this;
		instance.clear();

		if (!controls) return;
		controls.disconnect();
		controls.dispose();
	};

	debug = (gui: GUI) => {
		const { instance, controls, direction } = this;
		if (controls) gui.add(controls, 'enabled').name('camera controls');

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
