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

export default class CameraWrapper {
	uniforms: Uniforms;
	#instance: Three.PerspectiveCamera | Three.OrthographicCamera;
	perspective: Three.PerspectiveCamera;
	orthographic: Three.OrthographicCamera;
	controls: OrbitControls | FlyControls | ArcballControls | DragControls;

	constructor({
		perspective,
		orthographic,
		controls,
		Vector3,
		Quaternion,
	}: {
		perspective: Three.PerspectiveCamera;
		orthographic: Three.OrthographicCamera;
		default?: 'perspective' | 'orthographic';
		controls: OrbitControls | FlyControls | ArcballControls | DragControls;

		Vector3: typeof Three.Vector3;
		Quaternion: typeof Three.Quaternion;
	}) {
		this.uniforms = Object.freeze({
			cameraDirection: { value: new Vector3() },
			cameraScale: { value: new Vector3() },
			cameraQuaternion: { value: new Quaternion() },
		});
		this.controls = controls;
		this.perspective = perspective;
		this.orthographic = orthographic;
		this.#instance =
			controls.object.type === 'OrthographicCamera' ? this.orthographic : this.perspective;
	}

	set instance(value: 'OrthographicCamera' | 'PerspectiveCamera') {
		if (value === 'OrthographicCamera' && this.#instance.type !== 'OrthographicCamera') {
			this.#instance = this.orthographic;
			this.controls.object = this.#instance;
			// this.dispatcher.fire();
			return;
		}
		if (this.#instance.type !== 'PerspectiveCamera') {
			this.#instance = this.perspective;
			this.controls.object = this.#instance;
			// this.dispatcher.fire();
		}

		if (value !== 'OrthographicCamera' && value !== 'PerspectiveCamera') {
			console.warn(
				'Invalid camera type: use "OrthographicCamera" or "PerspectiveCamera". Falling back to "PerspectiveCamera"',
			);
		}
	}

	get instance(): Three.PerspectiveCamera | Three.OrthographicCamera {
		return this.#instance;
	}

	// onInstanceChange = (...cb: (() => void)[]) => {
	// 	this.dispatcher.addListener(...cb);
	// };

	resize = ({ width, height }: { width: number; height: number }) => {
		this.perspective.aspect = width / height;
		this.perspective.updateProjectionMatrix();

		const frustumHeight = this.orthographic.top - this.orthographic.bottom;
		this.orthographic.left = (frustumHeight * width) / height / -2;
		this.orthographic.right = (frustumHeight * width) / height / 2;
		this.orthographic.updateProjectionMatrix();
	};

	update = ({ deltaTime }: { deltaTime: number }) => {
		this.#instance.getWorldDirection(this.uniforms.cameraDirection.value);
		this.#instance.getWorldScale(this.uniforms.cameraScale.value);
		this.#instance.getWorldQuaternion(this.uniforms.cameraQuaternion.value);
		// this.instance.getWorldPosition(this.uniforms.cameraPosition.value); // usually not needed
		if (this.controls && this.controls.enabled) this.controls.update(deltaTime);
	};

	clear = () => {
		// this.dispatcher.clear();
		this.perspective.clear();
		this.orthographic.clear();
		this.instance.clear();
		this.controls.disconnect();
		this.controls.dispose();
	};

	debug = (gui: GUI) => {
		// CONTROLS
		gui
			.add({ enabled: this.controls.enabled }, 'enabled')
			.name('controls enabled')
			.onChange((v) => {
				this.controls.enabled = v;
			});

		if ('enableDamping' in this.controls)
			gui
				.add({ enableDamping: this.controls.enableDamping }, 'enableDamping')
				.name('controls damping')
				.onChange((v) => {
					if ('enableDamping' in this.controls) this.controls.enableDamping = v;
				});

		if ('dampingFactor' in this.controls)
			gui
				.add({ dampingFactor: this.controls.dampingFactor }, 'dampingFactor', 0, 1, 0.01)
				.name('controls damping factor')
				.onChange((v) => {
					if ('dampingFactor' in this.controls) this.controls.dampingFactor = v;
				});

		// CAMERA TYPE
		gui
			.add({ orthographic: this.#instance.type === 'OrthographicCamera' }, 'orthographic')
			.name('orthographic camera')
			.onChange((v) => {
				this.instance = v ? 'OrthographicCamera' : 'PerspectiveCamera';
			});
		//  CAMERA POSITION
		gui.add(this.#instance.position, 'x').name('camera position x').listen();
		gui.add(this.#instance.position, 'y').name('camera position y').listen();
		gui.add(this.#instance.position, 'z').name('camera position z').listen();
		//  CAMERA DIRECTION
		gui.add(this.uniforms.cameraDirection.value, 'x').name('camera direction x').disable().listen();
		gui.add(this.uniforms.cameraDirection.value, 'y').name('camera direction y').disable().listen();
		gui.add(this.uniforms.cameraDirection.value, 'z').name('camera direction z').disable().listen();
	};
}
