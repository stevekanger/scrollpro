import type { ISticky, IController, StickyArgs } from '../types';
declare class Sticky implements ISticky {
    private controller;
    private element;
    private options;
    private bounds;
    private start;
    private distance;
    constructor(controller: IController, { element, top, bottom, start, distance, ignoreBounds, }: StickyArgs);
    private construct;
    init(): void;
    kill(): void;
    update(): void;
    refresh(): void;
}
export default Sticky;
