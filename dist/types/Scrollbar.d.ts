export declare type ScrollbarArgs = {
    element: HTMLElement;
    axis?: string;
    orientation?: string;
    useAnimation?: boolean;
};
export interface IScrollbar {
    init: () => void;
    kill: () => void;
    update: () => void;
    refresh: () => void;
}
export declare type ScrollbarOptions = {
    axis: string;
    orientation: string;
    useAnimation: boolean;
};
