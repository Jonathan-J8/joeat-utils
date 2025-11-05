import { Vector2, Vector2Like, Vector3, Vector3Like, Vector4, Vector4Like } from 'three';
export declare const clamp: (value: number, min: number, max: number) => number;
export declare const isBetween: (base: number, range: number, threshold: number) => boolean;
export declare const lerp: (x: number, y: number, t: number) => number;
export declare const dampThreshold: (x: number, y: number, lambda: number, dt: number, threshold?: number) => number;
export declare const dampThresholdVec: (vec0: Vector2 | Vector3 | Vector4, vec1: Vector2Like | Vector3Like | Vector4Like, lambda: number, delta: number, threshold?: number) => void;
//# sourceMappingURL=math.d.ts.map