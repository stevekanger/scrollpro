import type { IController, IScrollbar, ScrollbarArgs } from '../types';
declare class Scrollbar implements IScrollbar {
    private controller;
    private element;
    private bounds;
    private track;
    private thumb;
    private options;
    constructor(controller: IController, { element, axis, orientation, useAnimation, }: ScrollbarArgs);
    init(): void;
    kill(): void;
    update(): void;
    refresh(): void;
    private preventSelect;
    private onPointerDown;
    private onPointerUp;
    private onPointerMove;
    private onWheel;
}
export default Scrollbar;
