import type { Bounds, IController, IViewport, ViewportArgs } from '../types';
declare class Viewport implements IViewport {
    private element;
    private eventTarget;
    private controller;
    private touchStart;
    private bounds;
    private viewableBounds;
    constructor(controller: IController, { element, eventTarget }: ViewportArgs);
    getBounds(): {
        viewable: Bounds;
        top: number;
        bottom: number;
        left: number;
        right: number;
        width: number;
        height: number;
    };
    private init;
    kill(): void;
    refresh(): void;
    private construct;
    private onWheel;
    private onPointerUp;
    private onPointerDown;
    private onPointerMove;
    private onKeyDown;
}
export default Viewport;
