import type { Bounds, IController, IViewport, ViewportArgs } from '../types';
declare class Viewport implements IViewport {
    private element;
    private controller;
    private touchStart;
    private bounds;
    private viewableBounds;
    constructor(controller: IController, { element }: ViewportArgs);
    getBounds(): {
        viewable: Bounds;
        top: number;
        bottom: number;
        left: number;
        right: number;
        width: number;
        height: number;
    };
    kill(): void;
    private init;
    private construct;
    private onWheel;
    private onPointerUp;
    private onPointerDown;
    private onPointerMove;
    private onKeyDown;
}
export default Viewport;
