import { WebGLRenderer } from 'three';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { default as MonoEventEmitter } from './MonoEventEmitter';
type InterpolateCallback = (it: {
    value: number;
    time: number;
    deltaTime: number;
    deltaMs: number;
}) => void;
declare class Animator extends MonoEventEmitter<[{
    time: number;
    deltaTime: number;
    deltaMs: number;
}]> {
    #private;
    uniforms: Readonly<{
        uTime: {
            value: number;
        };
        uDeltaTime: {
            value: number;
        };
        uDeltaMs: {
            value: number;
        };
    }>;
    constructor();
    get paused(): boolean;
    play: (renderer?: WebGLRenderer) => void;
    pause: (renderer?: WebGLRenderer) => void;
    debug: (gui: GUI) => void;
    interpolate: ({ from, to, onStart, onUpdate, onComplete, }: {
        from: number;
        to: number;
        onStart?: InterpolateCallback;
        onUpdate?: InterpolateCallback;
        onComplete?: InterpolateCallback;
    }) => void;
    animate: ({ steps, duration, delay, iterations, onStart, onUpdate, onComplete, }: {
        steps?: number;
        duration?: number;
        delay?: number;
        iterations?: number;
        onStart?: () => void;
        onUpdate?: () => void;
        onComplete?: () => void;
    }) => () => void;
}
export default Animator;
//# sourceMappingURL=Animator.d.ts.map