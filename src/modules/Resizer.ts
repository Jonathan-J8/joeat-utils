import type { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { clamp } from '../utils';
import MonoEventEmitter from './MonoEventEmitter';

class Resizer extends MonoEventEmitter<[{ width: number; height: number; pixelRatio: number }]> {
	#maxSize = 7680; // 4k
	#width = 1280;
	#height = 720;
	#pixelRatio = 1;
	#resolutionFactor = 1;
	#element: HTMLElement;

	constructor(element: HTMLElement) {
		super();
		this.#pixelRatio = Math.min(window.devicePixelRatio, 2);
		this.#element = element;
		this.#observer.observe(this.#element);
		this.fire();
	}

	get width() {
		return this.#width * this.#resolutionFactor;
	}
	get height() {
		return this.#height * this.#resolutionFactor;
	}
	get element() {
		return this.#element;
	}

	get pixelRatio() {
		return this.#pixelRatio;
	}
	get maxSize() {
		return this.#maxSize;
	}
	get resolutionFactor() {
		return this.#resolutionFactor;
	}

	set resolutionFactor(n: number) {
		this.#resolutionFactor = clamp(n, 0.001, 1);
		this.fire();
	}

	set maxSize(n: number) {
		this.#maxSize = n < 32 ? 32 : n;
		this.fire();
	}

	fire = () => {
		let width = this.#width;
		let height = this.#height;

		if (this.#width > this.#maxSize || this.#height > this.#maxSize) {
			if (width > height) {
				const ratio = height / width;
				width = clamp(width, 0, this.#maxSize);
				height = width * ratio;
			} else {
				const ratio = width / height;
				height = clamp(height, 0, this.#maxSize);
				width = height * ratio;
			}
		}

		width *= this.#resolutionFactor;
		height *= this.#resolutionFactor;

		const pixelRatio = this.#pixelRatio;
		super.fire({ width, height, pixelRatio });
	};

	#observer = new ResizeObserver((entries) => {
		const box = entries[0].contentBoxSize[0];
		const { inlineSize: width, blockSize: height } = box;

		if (this.#width === width && this.#height === height) return; // no need to resize

		this.#width = width;
		this.#height = height;
		this.fire();
	});

	clear() {
		super.clear();
		if (this.#element) this.#observer.unobserve(this.#element);
		this.#observer.disconnect();
	}

	debug = (gui: GUI) => {
		gui
			.add({ maxSize: this.maxSize }, 'maxSize', 0, 7680)
			.name('max resolution')
			.onChange((v: number) => {
				this.maxSize = v;
			});
		gui
			.add({ resolutionFactor: this.resolutionFactor }, 'resolutionFactor', 0.0, 1)
			.name('resolution factor')
			.onChange((v: number) => {
				this.resolutionFactor = v;
			});
	};
}

export default Resizer;
