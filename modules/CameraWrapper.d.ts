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
type Controls = OrbitControls | FlyControls | ArcballControls | DragControls;
export default class CameraWrapper<T extends Controls> {
    #private;
    uniforms: Uniforms;
    direction: Three.Vector3 | undefined;
    instance: Three.PerspectiveCamera | Three.OrthographicCamera;
    constructor({ instance, controls, Vector3, Quaternion, }: {
        instance: Three.PerspectiveCamera | Three.OrthographicCamera;
        controls?: T;
        Vector3: typeof Three.Vector3;
        Quaternion: typeof Three.Quaternion;
    });
    get controls(): T;
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