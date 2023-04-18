import type { ControllerEvents, Scroll, ControllerOptions, ControllerItems, EventFn, ScrollToArgs, IViewport, IController, IContent, ContentArgs, ScrollbarArgs, ObserverArgs, StickyArgs, IScrollbar, IObserver, ISticky, BrowserSupport, ViewportArgs } from '../types';
declare class Controller implements IController {
    viewport: IViewport | null;
    content: IContent | null;
    scroll: Scroll;
    options: ControllerOptions;
    items: ControllerItems;
    browserSupport: BrowserSupport;
    private aF;
    private listeners;
    constructor(options?: Partial<ControllerOptions>);
    on(e: keyof ControllerEvents, fn: EventFn): void;
    off(e: keyof ControllerEvents, fn: EventFn): void;
    fire(e: keyof ControllerEvents): void;
    kill(): void;
    refresh(): void;
    update(): void;
    createViewport(args?: ViewportArgs): IViewport;
    createContent(args: ContentArgs): IContent;
    createScrollbar(args: ScrollbarArgs): IScrollbar;
    createObserver(args: ObserverArgs): IObserver;
    createSticky(args: StickyArgs): ISticky;
    setLimit({ x, y }: {
        x?: number | undefined;
        y?: number | undefined;
    }): void;
    scrollTo({ x, y, animate }: ScrollToArgs): void;
    private animateScroll;
}
export default Controller;
