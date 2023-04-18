export declare type ContentArgs = {
    element: HTMLElement;
};
export interface IContent {
    init: () => void;
    kill: () => void;
    refresh: () => void;
    update: () => void;
}
