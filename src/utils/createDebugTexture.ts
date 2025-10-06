import type { DoubleSide, Mesh, MeshLambertMaterial, PlaneGeometry, Texture } from 'three';

const createDebugTexture = (o: {
	textureCallback: () => Texture | null;
	DoubleSide: typeof DoubleSide;
	Mesh: typeof Mesh;
	MeshLambertMaterial: typeof MeshLambertMaterial;
	PlaneGeometry: typeof PlaneGeometry;
	Texture: typeof Texture;
}) => {
	const mesh = new o.Mesh(
		new o.PlaneGeometry(2, 2),

		new o.MeshLambertMaterial({
			map: o.textureCallback(),
			side: o.DoubleSide,
			color: 0xffffff,
			transparent: false,
		}),
	);

	const update = () => {
		mesh.material.map = o.textureCallback();
	};

	const dispose = () => {
		mesh.geometry.dispose();
		mesh.material.dispose();
	};

	return { mesh, update, dispose };
};

export default createDebugTexture;
