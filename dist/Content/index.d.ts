import type { ContentArgs, IContent, IController } from '../types';
declare class Content implements IContent {
    private controller;
    private element;
    constructor(controller: IController, { element }: ContentArgs);
    private construct;
    init(): void;
    kill(): void;
    refresh(): void;
    update(): void;
}
export default Content;
