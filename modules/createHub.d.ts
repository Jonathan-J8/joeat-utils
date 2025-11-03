import { EventDispatcher as T } from 'three';
declare const createHub: (EventDispatcher: typeof T) => T<{
    resize: {
        width: number;
        height: number;
    };
    update: () => void;
    clear: () => void;
}>;
export default createHub;
//# sourceMappingURL=createHub.d.ts.map