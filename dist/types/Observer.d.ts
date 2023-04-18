export declare type ObserverArgs = {
    element: HTMLElement;
    normalizeInitialView?: boolean;
    offsetStart?: number;
    offsetEnd?: number;
    start?: number | undefined;
    distance?: number | undefined;
    tween?: Tween;
    addClasses?: boolean;
    callback?: ObserverCallback;
};
export declare type ObserverOptions = {
    normalizeInitialView: boolean;
    offsetStart: number;
    offsetEnd: number;
    start: number | undefined;
    distance: number | undefined;
    tween: Tween;
    addClasses: boolean;
    callback: ObserverCallback;
};
export interface IObserver {
    init: () => void;
    kill: () => void;
    update: () => void;
    refresh: () => void;
}
declare type TweenCss = {
    [key: string]: string;
};
export declare type Tween = {
    element?: HTMLElement;
    css: TweenCss | undefined;
};
export declare type ObserverCallback = (e: ObserverEvent) => void;
export declare type ObserverEvent = {
    progress: number;
    inViewport: boolean;
};
export {};
