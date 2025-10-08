import { Pass } from 'three/addons/postprocessing/Pass.js';
import { EffectComposer as TEffectComposer } from 'three/examples/jsm/Addons.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import type * as Three from 'three';
type Uniforms = {
    uResolution: {
        value: Three.Vector2;
    };
};
export default class GlRendererWrapper {
    uniforms: Uniforms;
    instance: Three.WebGLRenderer;
    composer: TEffectComposer | undefined;
    constructor({ instance, Vector2, EffectComposer, }: {
        instance: Three.WebGLRenderer;
        Vector2: typeof Three.Vector2;
        EffectComposer?: typeof TEffectComposer;
    });
    addEffect: (...pass: Pass[]) => void;
    removeEffect: (...pass: Pass[]) => void;
    update: (scene: Three.Scene, camera: Three.Camera, delta?: number) => void;
    resize: (o: {
        width: number;
        height: number;
        pixelRatio: number;
    }) => void;
    clear: () => void;
    debug: (gui: GUI) => void;
}
export {};
//# sourceMappingURL=RendererWrapper.d.ts.map