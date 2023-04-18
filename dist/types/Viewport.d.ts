import { Bounds } from './shared';
declare type ViewportBounds = Bounds & {
    viewable: Bounds;
};
export declare type ViewportArgs = {
    element?: HTMLElement | Window | undefined;
};
export interface IViewport {
    getBounds: () => ViewportBounds;
    kill: () => void;
}
export declare type TouchStart = {
    x: number;
    y: number;
};
export {};
