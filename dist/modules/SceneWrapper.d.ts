import type * as Three from 'three';
export default class CustomScene {
    instance: Three.Scene;
    constructor({ scene }: {
        scene: Three.Scene;
    });
    private static disposeMaterial;
    private static disposeNode;
    clear: () => void;
}
//# sourceMappingURL=SceneWrapper.d.ts.map