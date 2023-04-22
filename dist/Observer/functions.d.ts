import type { ObserverOptions, IViewport, Bounds } from '../types';
export declare function getInInitialView(offsetTop: number, viewBounds: Bounds): boolean;
export declare function getStart(offsetTop: number, inInitialView: boolean, options: ObserverOptions, viewport: IViewport): number;
export declare function getDistance(offsetTop: number, inInitialView: boolean, options: ObserverOptions, viewport: IViewport, bounds: Bounds): number;
export declare function getProgress(start: number, distance: number, scrollY: number): number;
