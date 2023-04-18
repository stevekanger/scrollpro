import type { Bounds, StickyOptions, IViewport } from '../types';
export declare function getStart(scrollY: number, viewport: IViewport, options: StickyOptions, bounds: Bounds): number;
export declare function getDistance(element: HTMLElement, options: StickyOptions, bounds: Bounds): number;
