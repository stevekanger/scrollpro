import type { ISticky, IController, StickyArgs, StickyOptions } from '../types';
declare class Sticky implements ISticky {
    private controller;
    private element;
    private options;
    private bounds;
    private start;
    private distance;
    private progress;
    constructor(controller: IController, { element, top, bottom, start, distance, ignoreBounds, }: StickyArgs);
    setOptions(options: Partial<StickyOptions>): void;
    private construct;
    init(): void;
    kill(): void;
    update(): void;
    refresh(): void;
}
export default Sticky;
