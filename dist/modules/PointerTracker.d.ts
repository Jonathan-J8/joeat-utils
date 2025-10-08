import { default as GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import type * as Three from 'three';
type Uniforms = {
    uPointerScroll: {
        value: Three.Vector2;
    };
    uPointerScrollVelocity: {
        value: Three.Vector2;
    };
    uPointerPress: {
        value: number;
    };
    uPointerPosition: {
        value: Three.Vector2;
    };
    uPointerWorldPosition: {
        value: Three.Vector3;
    };
    uPointerPositionVelocity: {
        value: Three.Vector2;
    };
};
declare class PointerTracker {
    #private;
    uniforms: Uniforms;
    constructor({ Plane, Raycaster, Vector2, Vector3, camera, }: {
        Vector3: typeof Three.Vector3;
        Vector2: typeof Three.Vector2;
        Plane: typeof Three.Plane;
        Raycaster: typeof Three.Raycaster;
        camera: Three.Camera;
    });
    onMove: (e: Event) => void;
    onScroll: (e: Event) => void;
    onPress: (e: Event) => void;
    addMoveListener: (...callbacks: (() => void)[]) => () => void;
    addPressListener: (...callbacks: (() => void)[]) => () => void;
    addScrollListener: (...callbacks: (() => void)[]) => () => void;
    clear: () => void;
    debug: (gui: GUI) => void;
}
export default PointerTracker;
//# sourceMappingURL=PointerTracker.d.ts.map