import type { IController, ObserverArgs, IObserver } from '../types';
declare class Observer implements IObserver {
    private controller;
    private element;
    private start;
    private distance;
    private options;
    private bounds;
    constructor(controller: IController, { element, normalizeInitialView, offsetStart, offsetEnd, start, distance, tween, addClasses, callback, }: ObserverArgs);
    private construct;
    init(): void;
    kill(): void;
    update(): void;
    refresh(): void;
}
export default Observer;
