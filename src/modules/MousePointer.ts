import type * as Three from 'three';
import type GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

type Uniforms = {
	uScroll: { value: Three.Vector2 };
	uScrollVelocity: { value: Three.Vector2 };
	uMousePress: { value: number };
	uMousePosition: { value: Three.Vector2 };
	uMouseWorldPosition: { value: Three.Vector3 };
	uMouseVelocity: { value: Three.Vector2 };
};

class MousePointer {
	uniforms: Uniforms;
	#origin: Three.Vector3;
	#plane: Three.Plane;
	#raycaster: Three.Raycaster;
	#previousScroll: Three.Vector2;
	#previousPosition: Three.Vector2;
	#timeoutId: ReturnType<typeof setTimeout> | undefined;
	#camera: Three.Camera;
	#cameraDirection: Three.Vector3;
	#ui: HTMLElement | undefined;

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
			uScroll: { value: new Vector2() },
			uScrollVelocity: { value: new Vector2() },
			uMousePress: { value: 0 },
			uMousePosition: { value: new Vector2() },
			uMouseWorldPosition: { value: new Vector3() },
			uMouseVelocity: { value: new Vector2() },
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

		this.#ui.innerHTML = `
			<p>Mouse position x ${this.uniforms.uMousePosition.value.x.toFixed(2)} y ${this.uniforms.uMousePosition.value.y.toFixed(2)}</p>
			<p>Mouse world position x ${this.uniforms.uMouseWorldPosition.value.x.toFixed(2)} y ${this.uniforms.uMouseWorldPosition.value.y.toFixed(2)} z ${this.uniforms.uMouseWorldPosition.value.z.toFixed(2)}</p>
			<p>Mouse velocity x ${this.uniforms.uMouseVelocity.value.x.toFixed(2)} y ${this.uniforms.uMouseVelocity.value.y.toFixed(2)}</p>
			<p>Mouse press ${this.uniforms.uMousePress.value}</p>
			<p>Scroll x ${this.uniforms.uScroll.value.x.toFixed(2)} y ${this.uniforms.uScroll.value.y.toFixed(2)}</p>
		
		`;
	};

	#updateMousePosition = (e: Event) => {
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

		const { uMousePosition } = this.uniforms;

		uMousePosition.value.x = (event.clientX / w) * 2 - 1;
		uMousePosition.value.y = -(event.clientY / h) * 2 + 1;
	};

	#updateMouseVelocity = (e: Event) => {
		const event = e as PointerEvent;
		const { uMouseVelocity } = this.uniforms;
		const x = event.pageX;
		const y = event.pageY;
		const px = this.#previousPosition.x;
		const py = this.#previousPosition.y;
		uMouseVelocity.value.x = Math.abs(x - px);
		uMouseVelocity.value.y = Math.abs(y - py);
		this.#previousPosition.set(x, y);

		if (typeof this.#timeoutId === 'number') clearTimeout(this.#timeoutId);
		this.#timeoutId = setTimeout(() => {
			uMouseVelocity.value.set(0, 0);
		}, 200);
	};

	#updateMouseWorldPosition = () => {
		const { uMouseWorldPosition, uMousePosition } = this.uniforms;
		this.#camera.getWorldDirection(this.#cameraDirection);
		this.#raycaster.setFromCamera(uMousePosition.value, this.#camera);
		this.#plane.setFromNormalAndCoplanarPoint(this.#cameraDirection, this.#origin);
		this.#raycaster.ray.intersectPlane(this.#plane, uMouseWorldPosition.value);
	};

	#updateMouseMove = (e: Event) => {
		this.#updateMousePosition(e);
		this.#updateMouseWorldPosition();
		this.#updateMouseVelocity(e);
		this.#updateUI();
	};

	#updateScroll = (e: Event) => {
		const { uScroll, uScrollVelocity } = this.uniforms;
		this.#previousScroll.copy(uScroll.value);
		const x = window.scrollX / (document.body.scrollWidth - window.innerWidth);
		const y = window.scrollY / (document.body.scrollHeight - window.innerHeight);

		uScroll.value.x = x;
		uScroll.value.y = y;

		if (e.type === 'scroll') uScrollVelocity.value.subVectors(uScroll.value, this.#previousScroll);
		else uScrollVelocity.value.set(0, 0);
		this.#updateUI();
	};

	#updateMousePress = (e: Event) => {
		const event = e as PointerEvent;
		const { uMousePress } = this.uniforms;
		const isMouse = event.pointerType === 'mouse';
		if (isMouse) uMousePress.value = event.pressure ? 1 : 0;
		else uMousePress.value = event.pressure;
		this.#updateUI();
	};

	init = (element: HTMLElement | Document | Window) => {
		element.addEventListener('pointermove', this.#updateMouseMove, false);
		element.addEventListener('pointerout', this.#updateMouseMove, false);
		element.addEventListener('pointerdown', this.#updateMousePress, false);
		element.addEventListener('pointerup', this.#updateMousePress, false);
		window.addEventListener('scroll', this.#updateScroll, false);
		window.addEventListener('scrollend', this.#updateScroll, false);
	};

	clear = (element: HTMLElement | Document | Window) => {
		element.removeEventListener('pointermove', this.#updateMouseMove, false);
		element.removeEventListener('pointerout', this.#updateMouseMove, false);
		element.removeEventListener('pointerdown', this.#updateMousePress, false);
		element.removeEventListener('pointerup', this.#updateMousePress, false);
		window.removeEventListener('scroll', this.#updateScroll, false);
		window.removeEventListener('scrollend', this.#updateScroll, false);
	};

	debug = (gui: GUI) => {
		this.#ui = document.createElement('div');
		this.#ui.style.padding = '3px';
		gui.domElement.appendChild(this.#ui);
	};
}

export default MousePointer;
