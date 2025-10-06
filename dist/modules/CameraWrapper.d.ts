import { ArcballControls, DragControls, FlyControls, OrbitControls } from 'three/examples/jsm/Addons.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import type * as Three from 'three';
type Uniforms = {
    uDirection: {
        value: Three.Vector3;
    };
};
export default class CameraWrapper {
    uniforms: Uniforms;
    direction: Three.Vector3 | undefined;
    instance: Three.PerspectiveCamera | Three.OrthographicCamera;
    controls: OrbitControls | FlyControls | ArcballControls | DragControls | undefined;
    constructor({ camera, controls, Vector3, }: {
        camera: Three.PerspectiveCamera | Three.OrthographicCamera;
        controls?: OrbitControls;
        Vector3: typeof Three.Vector3;
    });
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