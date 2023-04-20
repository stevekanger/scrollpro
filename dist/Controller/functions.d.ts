import type { ControllerOptions, Scroll } from '../types';
export declare function getProgress(scroll: number, limit: number): number;
export declare function setScrollDeltas(x: number | undefined, y: number | undefined, scroll: Scroll): {
    deltaX: number;
    deltaY: number;
    scrollX: number;
    scrollY: number;
    limitX: number;
    limitY: number;
    progressX: number;
    progressY: number;
};
export declare function setScrollToDeltas(scroll: Scroll): {
    scrollX: number;
    scrollY: number;
    progressX: number;
    progressY: number;
    deltaX: number;
    deltaY: number;
    limitX: number;
    limitY: number;
};
export declare function getScrollDiff(scroll: Scroll): {
    diffX: number;
    diffY: number;
};
export declare function getLerpScroll(scroll: Scroll, options: ControllerOptions): {
    scrollX: number;
    scrollY: number;
    progressX: number;
    progressY: number;
    deltaX: number;
    deltaY: number;
    limitX: number;
    limitY: number;
};
