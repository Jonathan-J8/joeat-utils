import type { DataTexture } from 'three';

const createEmpytTexture = (datatexture: typeof DataTexture) => {
	const size = 1;
	const emptyTexture = new datatexture(new Uint8Array(size * size), size, size);
	return emptyTexture;
};
export default createEmpytTexture;
