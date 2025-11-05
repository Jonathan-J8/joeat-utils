import type * as Three from 'three';

const disposeMaterial = (material: Three.Material) => {
	Object.values(material).forEach((value) => {
		if (typeof value?.dispose === 'function') value.dispose();
	});
};

const disposeNode = (node: unknown) => {
	if (!node) return;

	const mesh = node as Three.Mesh | Three.Line | Three.Points;

	if (mesh?.geometry) mesh.geometry.dispose();
	if (mesh?.material) {
		if (Array.isArray(mesh.material)) {
			mesh.material.forEach((m: Three.Material) => {
				disposeMaterial(m);
				m.dispose();
			});
		} else {
			disposeMaterial(mesh.material);
			mesh.material.dispose();
		}
	}
	mesh.children.forEach((child: unknown) => disposeNode(child));
};

export default disposeNode;
