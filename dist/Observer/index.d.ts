import type { IController, ObserverArgs, IObserver, ObserverOptions } from '../types';
declare class Observer implements IObserver {
    private controller;
    private element;
    private start;
    private distance;
    private options;
    private bounds;
    constructor(controller: IController, { element, normalizeInitialView, offsetStart, offsetEnd, start, distance, callback, }: ObserverArgs);
    setOptions(options: Partial<ObserverOptions>): void;
    private construct;
    init(): void;
    kill(): void;
    update(): void;
    refresh(): void;
}
export default Observer;
