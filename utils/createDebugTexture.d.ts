import { DoubleSide, Mesh, MeshLambertMaterial, PlaneGeometry, Texture } from 'three';
declare const createDebugTexture: (o: {
    textureCallback: () => Texture | null;
    DoubleSide: typeof DoubleSide;
    Mesh: typeof Mesh;
    MeshLambertMaterial: typeof MeshLambertMaterial;
    PlaneGeometry: typeof PlaneGeometry;
    Texture: typeof Texture;
}) => {
    mesh: Mesh<PlaneGeometry, MeshLambertMaterial, import('three').Object3DEventMap>;
    update: () => void;
    dispose: () => void;
};
export default createDebugTexture;
//# sourceMappingURL=createDebugTexture.d.ts.map