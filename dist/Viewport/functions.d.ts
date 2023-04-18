import type { Bounds } from '../types';
export declare function getViewableBounds(bounds: Bounds, element: HTMLElement | Window): {
    top: number;
    bottom: number;
    left: number;
    right: number;
    width: number;
    height: number;
};
export declare function getDeltaFromKey(e: KeyboardEvent, limitY: number, keyStep: number): {
    x: number;
    y: number;
};
