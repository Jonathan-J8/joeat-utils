import type { WebGLRenderer } from 'three';
import type { WebGPURenderer } from 'three/webgpu';

import type { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { clamp, now } from '../utils';
import MonoEventEmitter from './MonoEventEmitter';

const execute = (fn?: () => void) => fn && fn();

type InterpolateCallback = (it: {
	value: number;
	time: number;
	deltaTime: number;
	deltaMs: number;
}) => void;

class Animator extends MonoEventEmitter<[{ time: number; deltaTime: number; deltaMs: number }]> {
	#rafID: undefined | number;
	#paused = true;
	#previousTime = 0;
	#renderer: WebGLRenderer | WebGPURenderer | undefined;

	uniforms = Object.freeze({
		uTime: { value: 0 },
		uDeltaTime: { value: 0 },
		uDeltaMs: { value: 0 },
	});

	constructor() {
		super();
	}

	get paused() {
		return this.#paused;
	}

	#tick = (time: number) => {
		const { uTime, uDeltaTime, uDeltaMs } = this.uniforms;
		uTime.value = time; // in milliseconds
		uDeltaMs.value = Math.abs(time - this.#previousTime); // in milliseconds
		uDeltaTime.value = uDeltaMs.value * 0.001; // in seconds
		this.#previousTime = time;

		super.fire({ time, deltaTime: uDeltaTime.value, deltaMs: uDeltaMs.value });

		if (this.#renderer) return;
		this.#rafID = requestAnimationFrame(this.#tick);
	};

	play = (renderer?: WebGLRenderer | WebGPURenderer) => {
		this.#renderer = renderer;
		if (!this.#paused) return;
		this.#paused = false;
		this.#previousTime = now();

		if (renderer) renderer.setAnimationLoop(this.#tick);
		else this.#rafID = requestAnimationFrame(this.#tick);
	};

	pause = (renderer?: WebGLRenderer | WebGPURenderer) => {
		this.#paused = true;

		if (renderer) renderer.setAnimationLoop(null);
		else if (typeof this.#rafID === 'number') cancelAnimationFrame(this.#rafID);
	};

	debug = (gui: GUI) => {
		gui.add({ paused: this.paused }, 'paused').onChange((b: boolean) => {
			if (b) this.pause(this.#renderer);
			else this.play(this.#renderer);
		});
	};

	interpolate = ({
		from = 0,
		to = 1,
		onStart,
		onUpdate,
		onComplete,
	}: {
		from: number;
		to: number;
		onStart?: InterpolateCallback;
		onUpdate?: InterpolateCallback;
		onComplete?: InterpolateCallback;
	}) => {
		const origin = Math.abs(from);
		const target = Math.abs(to);
		const sign = from < to ? 1 : -1;
		let value = origin;

		const tick = (o: { time: number; deltaTime: number; deltaMs: number }) => {
			value += o.deltaTime;
			value = clamp(value, origin, target);

			if (typeof onUpdate === 'function') onUpdate({ value: value * sign, ...o });

			if (value === target) {
				if (typeof onComplete === 'function') onComplete({ value: value * sign, ...o });
				this.removeListener(tick);
			}
		};

		const { uDeltaMs, uDeltaTime, uTime } = this.uniforms;

		if (typeof onStart === 'function')
			onStart({
				value: from,
				time: uTime.value,
				deltaTime: uDeltaTime.value,
				deltaMs: uDeltaMs.value,
			});
		this.addListener(tick);
	};

	animate = ({
		steps = 0,
		duration = 400,
		delay = 0,
		iterations = 0,
		onStart,
		onUpdate,
		onComplete,
	}: {
		steps?: number;
		duration?: number;
		delay?: number;
		iterations?: number;
		onStart?: () => void;
		onUpdate?: () => void;
		onComplete?: () => void;
	}) => {
		let id: ReturnType<typeof setTimeout> | undefined;
		let startTime = 0;
		let currentStep = 0;
		let currentIteration = 0;

		const _tick = ({ time }: { time: number }) => {
			const elapsed = Math.abs(time - startTime);
			if (steps > 0) {
				const step = Math.min(Math.floor((elapsed / duration) * steps), steps - 1);

				if (step !== currentStep) {
					currentStep = step;
					execute(onUpdate);
				}
			} else execute(onUpdate);

			if (elapsed >= duration) {
				this.removeListener(_tick);
				execute(onUpdate);
				execute(onComplete);

				currentIteration++;
				if (iterations < 0 || iterations === Infinity || currentIteration < iterations) {
					if (typeof id === 'number') clearTimeout(id);
					if (delay > 0)
						id = setTimeout(() => {
							startTime = now();
							execute(onStart);
							this.addListener(_tick);
						}, delay);
					else start();
				}
			}
		};

		const start = () => {
			startTime = now();
			execute(onStart);
			this.addListener(_tick);
		};

		if (typeof id === 'number') clearTimeout(id);
		if (delay > 0) id = setTimeout(start, delay);
		else start();

		return () => this.removeListener(_tick);
	};
}

export default Animator;
