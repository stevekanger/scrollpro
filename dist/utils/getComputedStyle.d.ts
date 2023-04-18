declare function getComputedStyle(element: HTMLElement | Window | undefined, value: 'margin' | 'padding' | 'border'): {
    top: number;
    bottom: number;
    left: number;
    right: number;
    totals: {
        vertical: number;
        horizontal: number;
    };
};
export default getComputedStyle;
