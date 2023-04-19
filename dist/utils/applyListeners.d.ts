declare type Listeners = {
    element: any;
    event: string;
    fn: (...args: any) => void;
    condition: boolean;
    options?: {
        [key: string]: any;
    };
}[];
declare function applyListeners(type: 'add' | 'remove', listeners: Listeners): void;
export default applyListeners;
