import type { IController, IScrollbar, ScrollbarArgs, ScrollbarOptions } from '../types';
declare class Scrollbar implements IScrollbar {
    private controller;
    private element;
    private bounds;
    private track;
    private thumb;
    private options;
    constructor(controller: IController, { element, axis, orientation, useEasing, }: ScrollbarArgs);
    setOptions(options: Partial<ScrollbarOptions>): void;
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
