import { default as GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import type * as Three from 'three';
type Uniforms = {
    uScroll: {
        value: Three.Vector2;
    };
    uScrollVelocity: {
        value: Three.Vector2;
    };
    uMousePress: {
        value: number;
    };
    uMousePosition: {
        value: Three.Vector2;
    };
    uMouseWorldPosition: {
        value: Three.Vector3;
    };
    uMouseVelocity: {
        value: Three.Vector2;
    };
};
declare class MousePointer {
    #private;
    uniforms: Uniforms;
    constructor({ Plane, Raycaster, Vector2, Vector3, camera, }: {
        Vector3: typeof Three.Vector3;
        Vector2: typeof Three.Vector2;
        Plane: typeof Three.Plane;
        Raycaster: typeof Three.Raycaster;
        camera: Three.Camera;
    });
    init: (element: HTMLElement | Document | Window) => void;
    clear: (element: HTMLElement | Document | Window) => void;
    debug: (gui: GUI) => void;
}
export default MousePointer;
//# sourceMappingURL=MousePointer.d.ts.map