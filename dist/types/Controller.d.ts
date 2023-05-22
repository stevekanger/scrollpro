import type { IViewport, ViewportArgs } from './Viewport';
import type { ContentArgs, IContent } from './Content';
import type { StickyArgs, ISticky } from './Sticky';
import type { ObserverArgs, IObserver } from './Observer';
import type { ScrollbarArgs, IScrollbar } from './Scrollbar';
export interface IController {
    viewport: null | IViewport;
    content: null | IContent;
    scroll: Scroll;
    options: ControllerOptions;
    items: ControllerItems;
    browserSupport: BrowserSupport;
    getScroll: () => Scroll;
    on: (e: keyof ControllerEvents, fn: EventFn) => void;
    off: (e: keyof ControllerEvents, fn: EventFn) => void;
    fire: (e: keyof ControllerEvents, data?: Scroll) => void;
    kill: () => void;
    refresh: () => void;
    update: () => void;
    setOptions: (options: Partial<ControllerOptions>) => void;
    createViewport: (args?: ViewportArgs) => IViewport;
    createContent: (args: ContentArgs) => IContent;
    createScrollbar: (args: ScrollbarArgs) => IScrollbar;
    createObserver: (args: ObserverArgs) => IObserver;
    createSticky: (args: StickyArgs) => ISticky;
    setLimit: ({ x, y }: {
        x: number;
        y: number;
    }) => void;
    scrollTo: (args: ScrollToArgs) => void;
}
export declare type Scroll = {
    scrollX: number;
    scrollY: number;
    deltaX: number;
    deltaY: number;
    limitX: number;
    limitY: number;
    progressX: number;
    progressY: number;
};
export declare type ItemFn = () => void;
export declare type Item = {
    update: ItemFn;
    refresh: ItemFn;
    kill: ItemFn;
    init: ItemFn;
};
export declare type ControllerItems = {
    scrollbar: Set<Item>;
    sticky: Set<Item>;
    observer: Set<Item>;
};
export declare type ControllerOptions = {
    keyStep: number;
    disableKeyNavigation: boolean;
    firefoxMult: number;
    touchMult: number;
    mouseMult: number;
    ease: number;
};
export declare type EventFn = (e: Scroll) => void;
export declare type ControllerEvents = {
    init: Set<EventFn>;
    kill: Set<EventFn>;
    refresh: Set<EventFn>;
    update: Set<EventFn>;
};
export declare type ScrollToArgs = {
    x?: number;
    y?: number;
    ease?: boolean | number;
};
export declare type BrowserSupport = {
    hasWheel: boolean;
    hasTouch: boolean;
    hasPointer: boolean;
    hasKeyDown: boolean;
    isFirefox: boolean;
    hasFonts: boolean;
};
