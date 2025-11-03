import type * as Three from 'three';
import type GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import MonoEventEmitter from './MonoEventEmitter';

type Uniforms = {
	uPointerScroll: { value: Three.Vector2 };
	uPointerScrollVelocity: { value: Three.Vector2 };
	uPointerPress: { value: number };
	uPointerPosition: { value: Three.Vector2 };
	uPointerWorldPosition: { value: Three.Vector3 };
	uPointerPositionVelocity: { value: Three.Vector2 };
};

class PointerTracker {
	uniforms: Uniforms;
	#origin: Three.Vector3;
	#plane: Three.Plane;
	#raycaster: Three.Raycaster;
	#previousScroll: Three.Vector2;
	#previousPosition: Three.Vector2;
	#velocityTimeout: ReturnType<typeof setTimeout> | undefined;
	#uiTimeout: ReturnType<typeof setTimeout> | undefined;
	#delayTimeout = 20;
	#camera: Three.Camera;
	#cameraDirection: Three.Vector3;
	#ui: HTMLElement | undefined;
	#moveEmitter = new MonoEventEmitter();
	#pressEmitter = new MonoEventEmitter();
	#scrollEmitter = new MonoEventEmitter();

	constructor({
		Plane,
		Raycaster,
		Vector2,
		Vector3,
		camera,
	}: {
		Vector3: typeof Three.Vector3;
		Vector2: typeof Three.Vector2;
		Plane: typeof Three.Plane;
		Raycaster: typeof Three.Raycaster;
		camera: Three.Camera;
	}) {
		this.uniforms = Object.freeze({
			uPointerScroll: { value: new Vector2() },
			uPointerScrollVelocity: { value: new Vector2() },
			uPointerPress: { value: 0 },
			uPointerPosition: { value: new Vector2() },
			uPointerWorldPosition: { value: new Vector3() },
			uPointerPositionVelocity: { value: new Vector2() },
		});

		this.#origin = new Vector3();
		this.#plane = new Plane();
		this.#raycaster = new Raycaster();
		this.#previousScroll = new Vector2();
		this.#previousPosition = new Vector2();
		this.#camera = camera;
		this.#cameraDirection = new Vector3();
	}

	#updateUI = () => {
		if (!this.#ui) return;

		const html = () => `
			Pointer position x ${this.uniforms.uPointerPosition.value.x.toFixed(2)} y ${this.uniforms.uPointerPosition.value.y.toFixed(2)}
			Pointer world position x ${this.uniforms.uPointerWorldPosition.value.x.toFixed(2)} y ${this.uniforms.uPointerWorldPosition.value.y.toFixed(2)} z ${this.uniforms.uPointerWorldPosition.value.z.toFixed(2)}
			Pointer velocity x ${this.uniforms.uPointerPositionVelocity.value.x.toFixed(2)} y ${this.uniforms.uPointerPositionVelocity.value.y.toFixed(2)}
			Pointer press ${this.uniforms.uPointerPress.value}
			Scroll x ${this.uniforms.uPointerScroll.value.x.toFixed(2)} y ${this.uniforms.uPointerScroll.value.y.toFixed(2)}
			Scroll velocity x ${this.uniforms.uPointerScrollVelocity.value.x.toFixed(2)} y ${this.uniforms.uPointerScrollVelocity.value.y.toFixed(2)}
		`;
		this.#ui.innerText = html();

		if (typeof this.#uiTimeout === 'number') clearTimeout(this.#uiTimeout);
		this.#uiTimeout = setTimeout(() => {
			if (!this.#ui) return;
			this.#ui.innerText = html();
		}, this.#delayTimeout);
	};

	#updatePosition = (e: Event) => {
		const event = e as PointerEvent;
		const element = event.target;
		let w = 0;
		let h = 0;

		if (element instanceof HTMLCanvasElement) {
			w = element.width;
			h = element.height;
		} else if (element instanceof HTMLElement) {
			const { width, height } = element.getBoundingClientRect();
			w = width;
			h = height;
		} else {
			w = window.innerWidth;
			h = window.innerHeight;
		}

		const { uPointerPosition } = this.uniforms;

		uPointerPosition.value.x = (event.clientX / w) * 2 - 1;
		uPointerPosition.value.y = -(event.clientY / h) * 2 + 1;
	};

	#updateVelocity = (e: Event) => {
		const event = e as PointerEvent;
		const { uPointerPositionVelocity } = this.uniforms;
		const x = event.pageX;
		const y = event.pageY;
		const px = this.#previousPosition.x;
		const py = this.#previousPosition.y;
		uPointerPositionVelocity.value.x = Math.abs(x - px);
		uPointerPositionVelocity.value.y = Math.abs(y - py);
		this.#previousPosition.set(x, y);

		if (typeof this.#velocityTimeout === 'number') clearTimeout(this.#velocityTimeout);
		this.#velocityTimeout = setTimeout(() => {
			uPointerPositionVelocity.value.set(0, 0);
		}, this.#delayTimeout);
	};

	#updateWorldPosition = () => {
		const { uPointerWorldPosition, uPointerPosition } = this.uniforms;
		this.#camera.getWorldDirection(this.#cameraDirection);
		this.#raycaster.setFromCamera(uPointerPosition.value, this.#camera);
		this.#plane.setFromNormalAndCoplanarPoint(this.#cameraDirection, this.#origin);
		this.#raycaster.ray.intersectPlane(this.#plane, uPointerWorldPosition.value);
	};

	onMove = (e: Event) => {
		this.#updatePosition(e);
		this.#updateWorldPosition();
		this.#updateVelocity(e);
		this.#updateUI();
		this.#moveEmitter.fire();
	};

	onScroll = (e: Event) => {
		const { uPointerScroll, uPointerScrollVelocity } = this.uniforms;
		this.#previousScroll.copy(uPointerScroll.value);
		const x = window.scrollX / (document.body.scrollWidth - window.innerWidth);
		const y = window.scrollY / (document.body.scrollHeight - window.innerHeight);

		uPointerScroll.value.x = x;
		uPointerScroll.value.y = y;

		if (e.type === 'scroll')
			uPointerScrollVelocity.value.subVectors(uPointerScroll.value, this.#previousScroll);
		else uPointerScrollVelocity.value.set(0, 0);
		this.#updateUI();
		this.#scrollEmitter.fire();
	};

	onPress = (e: Event) => {
		const event = e as PointerEvent;
		const { uPointerPress } = this.uniforms;
		const isMouse = event.pointerType === 'mouse';
		if (isMouse) uPointerPress.value = event.pressure ? 1 : 0;
		else uPointerPress.value = event.pressure;
		this.#updateUI();
		this.#pressEmitter.fire();
	};

	addMoveListener = (...callbacks: (() => void)[]) => {
		this.#moveEmitter.addListener(...callbacks);
		return () => this.#moveEmitter.removeListener(...callbacks);
	};

	addPressListener = (...callbacks: (() => void)[]) => {
		this.#pressEmitter.addListener(...callbacks);
		return () => this.#pressEmitter.removeListener(...callbacks);
	};

	addScrollListener = (...callbacks: (() => void)[]) => {
		this.#scrollEmitter.addListener(...callbacks);
		return () => this.#scrollEmitter.removeListener(...callbacks);
	};

	clear = () => {
		this.#moveEmitter.clear();
		this.#pressEmitter.clear();
		this.#scrollEmitter.clear();
		if (this.#velocityTimeout) clearTimeout(this.#velocityTimeout);
		this.#velocityTimeout = undefined;
		if (this.#uiTimeout) clearTimeout(this.#uiTimeout);
		this.#uiTimeout = undefined;
		this.#ui?.remove();
		this.#ui = undefined;
	};

	debug = (gui: GUI) => {
		this.#ui = document.createElement('div');
		this.#ui.style.padding = '4px';
		gui.domElement.appendChild(this.#ui);
	};
}

export default PointerTracker;
