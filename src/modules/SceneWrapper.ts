import type * as Three from 'three';

export default class CustomScene {
	instance: Three.Scene;

	constructor({ scene }: { scene: Three.Scene }) {
		this.instance = scene;
	}

	private static disposeMaterial = (material: Three.Material) => {
		Object.values(material).forEach((value) => {
			if (typeof value?.dispose === 'function') value.dispose();
		});
	};

	private static disposeNode = (node: unknown) => {
		if (!node) return;

		const mesh = node as Three.Mesh | Three.Line | Three.Points;

		if (mesh?.geometry) mesh.geometry.dispose();
		if (mesh?.material) {
			if (Array.isArray(mesh.material)) {
				mesh.material.forEach((m: Three.Material) => {
					CustomScene.disposeMaterial(m);
					m.dispose();
				});
			} else {
				CustomScene.disposeMaterial(mesh.material);
				mesh.material.dispose();
			}
		}
		mesh.children.forEach((child: unknown) => this.disposeNode(child));
	};

	dispose = () => {
		this.instance.children.forEach((child) => CustomScene.disposeNode(child));
		this.instance.clear();
	};
}
