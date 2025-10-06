import type * as Three from 'three';

type Uniforms = {
	uElementSize: { value: Three.Vector2 };
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
			uElementSize: { value: new Vector2() },
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

		// window.addEventListener('pointermove', pointermove, false);
		// window.addEventListener('pointerdown', updateMousePress, false);
		// window.addEventListener('pointerup', updateMousePress, false);
		// window.addEventListener('pointerout', updateMousePress, false);
		// window.addEventListener('scroll', updateScroll, false);
		// window.addEventListener('scrollend', updateScroll, false);

		// const dispose = () => {
		// 	window.removeEventListener('pointermove', pointermove, false);
		// 	window.removeEventListener('pointerdown', updateMousePress, false);
		// 	window.removeEventListener('pointerup', updateMousePress, false);
		// 	window.removeEventListener('pointerout', updateMousePress, false);
		// 	window.removeEventListener('scroll', updateScroll, false);
		// 	window.removeEventListener('scrollend', updateScroll, false);
		// };
	}

	#updateScroll = (e: Event) => {
		const { uScroll, uScrollVelocity } = this.uniforms;
		this.#previousScroll.copy(uScroll.value);
		const x = window.scrollX / (document.body.scrollWidth - window.innerWidth);
		const y = window.scrollY / (document.body.scrollHeight - window.innerHeight);

		uScroll.value.x = x;
		uScroll.value.y = y;

		if (e.type === 'scroll') uScrollVelocity.value.subVectors(uScroll.value, this.#previousScroll);
		else uScrollVelocity.value.set(0, 0);
	};

	#updateMousePosition = (event: PointerEvent) => {
		const { uMousePosition, uElementSize } = this.uniforms;
		const w = uElementSize.value.x;
		const h = uElementSize.value.y;
		uMousePosition.value.x = (event.clientX / w) * 2 - 1;
		uMousePosition.value.y = -(event.clientY / h) * 2 + 1;
	};

	#updateMousePress = (e: PointerEvent) => {
		const { uMousePress } = this.uniforms;
		const isMouse = e.pointerType === 'mouse';
		if (isMouse) uMousePress.value = e.pressure ? 1 : 0;
		else uMousePress.value = e.pressure;
	};

	#updateMouseVelocity = (event: PointerEvent) => {
		const { uMouseVelocity } = this.uniforms;
		const x = event.pageX;
		const y = event.pageY;
		const px = this.#previousPosition.x;
		const py = this.#previousPosition.y;
		uMouseVelocity.value.x = Math.abs(x - px) * 0.16; // approximation of deltaTime 60fps
		uMouseVelocity.value.y = Math.abs(y - py) * 0.16;
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

	// canvas or window resize
	onResize = ({ width, height }: { width: number; height: number }) => {
		this.uniforms.uElementSize.value.set(width, height);
	};

	// pointer move
	onMove = (e: PointerEvent) => {
		this.#updateMousePosition(e);
		this.#updateMouseWorldPosition();
		this.#updateMouseVelocity(e);
	};

	// pointer down / up / out
	onPress = (e: PointerEvent) => {
		this.#updateMousePress(e);
	};

	// scroll / scroll end
	onScroll = (e: Event) => {
		this.#updateScroll(e);
	};
}

export default MousePointer;
