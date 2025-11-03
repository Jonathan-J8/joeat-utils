import { ArcballControls, DragControls, FlyControls, OrbitControls } from 'three/examples/jsm/Addons.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import type * as Three from 'three';
type Uniforms = {
    cameraDirection: {
        value: Three.Vector3;
    };
    cameraScale: {
        value: Three.Vector3;
    };
    cameraQuaternion: {
        value: Three.Quaternion;
    };
};
export default class CameraWrapper {
    #private;
    uniforms: Uniforms;
    perspective: Three.PerspectiveCamera;
    orthographic: Three.OrthographicCamera;
    controls: OrbitControls | FlyControls | ArcballControls | DragControls;
    constructor({ perspective, orthographic, controls, Vector3, Quaternion, }: {
        perspective: Three.PerspectiveCamera;
        orthographic: Three.OrthographicCamera;
        default?: 'perspective' | 'orthographic';
        controls: OrbitControls | FlyControls | ArcballControls | DragControls;
        Vector3: typeof Three.Vector3;
        Quaternion: typeof Three.Quaternion;
    });
    set instance(value: 'OrthographicCamera' | 'PerspectiveCamera');
    get instance(): Three.PerspectiveCamera | Three.OrthographicCamera;
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