import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { default as MonoEventEmitter } from './MonoEventEmitter';
declare class Resizer extends MonoEventEmitter<[{
    width: number;
    height: number;
    pixelRatio: number;
}]> {
    #private;
    constructor(element: HTMLElement);
    get width(): number;
    get height(): number;
    get element(): HTMLElement;
    get pixelRatio(): number;
    get maxSize(): number;
    get resolutionFactor(): number;
    set resolutionFactor(n: number);
    set maxSize(n: number);
    fire: () => void;
    clear(): void;
    debug: (gui: GUI) => void;
}
export default Resizer;
//# sourceMappingURL=Resizer.d.ts.map