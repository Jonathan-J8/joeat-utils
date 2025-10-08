type SpringCallback = (o: Spring['value']) => void;
type Options = {
    mass: number;
    tension: number;
    friction: number;
    threshold: number;
    onUpdate: SpringCallback | undefined;
    onComplete: SpringCallback | undefined;
};
export default class Spring {
    #private;
    get value(): number;
    get velocity(): number;
    get finished(): boolean;
    constructor(value?: number, options?: Partial<Options>);
    from: (value: number) => this;
    to: (v: number, o?: Partial<Options>) => this;
    update: (deltaTime?: number) => void;
}
export {};
//# sourceMappingURL=Spring.d.ts.map