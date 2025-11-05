import type * as Three from 'three';
import disposeNode from '../utils/disposeNode';

export default class CustomScene {
	instance: Three.Scene;

	constructor({ instance }: { instance: Three.Scene }) {
		this.instance = instance;
	}

	clear = () => {
		disposeNode(this.instance);
		this.instance.clear();
	};
}
