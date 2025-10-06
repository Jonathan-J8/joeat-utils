import type * as Three from 'three';
type Uniforms = {
    uElementSize: {
        value: Three.Vector2;
    };
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
    onResize: ({ width, height }: {
        width: number;
        height: number;
    }) => void;
    onMove: (e: PointerEvent) => void;
    onPress: (e: PointerEvent) => void;
    onScroll: (e: Event) => void;
}
export default MousePointer;
//# sourceMappingURL=MousePointer.d.ts.map