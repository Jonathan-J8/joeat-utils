import { ArcballControls, DragControls, FlyControls, OrbitControls } from 'three/examples/jsm/Addons.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import type * as Three from 'three';
type Controls = OrbitControls | FlyControls | ArcballControls | DragControls;
type Uniforms = {
    uDirection: {
        value: Three.Vector3;
    };
};
export default class CameraWrapper {
    #private;
    uniforms: Uniforms;
    direction: Three.Vector3 | undefined;
    instance: Three.PerspectiveCamera | Three.OrthographicCamera;
    constructor({ instance, controls, Vector3, }: {
        instance: Three.PerspectiveCamera | Three.OrthographicCamera;
        controls?: Controls;
        Vector3: typeof Three.Vector3;
    });
    get controls(): Controls;
    resize: ({ width, height }: {
        width: number;
        height: number;
    }) => void;
    update: ({ deltaTime }: {
        deltaTime: number;
    }) => void;
    clear: () => void;
    debug: (gui: GUI) => void;
}
export {};
//# sourceMappingURL=CameraWrapper.d.ts.map