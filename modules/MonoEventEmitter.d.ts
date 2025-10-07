/**
 * Mono event emitter
 */
declare class MonoEventEmitter<T extends unknown[]> {
    #private;
    constructor();
    get size(): number;
    addListener(...callbacks: ((...args: T) => void)[]): void;
    removeListener(...callbacks: ((...args: T) => void)[]): void;
    fire(...args: T): void;
    clear(): void;
}
export default MonoEventEmitter;
//# sourceMappingURL=MonoEventEmitter.d.ts.map