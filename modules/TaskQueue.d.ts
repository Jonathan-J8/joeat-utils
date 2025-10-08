export type Task = (() => void) | (() => Promise<unknown>);
export default class TaskQueue {
    #private;
    get isPlaying(): boolean;
    get size(): number;
    add: (...task: Task[]) => void;
    play: () => Promise<void>;
    stop: () => void;
    clear: () => void;
}
//# sourceMappingURL=TaskQueue.d.ts.map