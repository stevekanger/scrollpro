type SetStoreAction<T> = ((store: T) => Partial<T>) | Partial<T>;
interface Store<T> {
  get: () => T;
  set: (action: SetStoreAction<T>) => void;
  setVal: <K extends keyof T>(key: K, val: T[K]) => void;
}
type EventListener<Data> = (data: Data) => void;
interface EventListeners<EventsData> {
  on: <K extends keyof EventsData>(e: K, listener: EventListener<EventsData[K]>) => void;
  off: <K extends keyof EventsData>(e: K, listener: EventListener<EventsData[K]>) => void;
  fire: <K extends keyof EventsData>(e: K, data: EventsData[K]) => void;
}
interface ScrollStore {
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  limitX: number;
  limitY: number;
  progressX: number;
  progressY: number;
}
interface ScrollEventsData {
  update: ScrollStore;
}
interface Scroll {
  get: Store<ScrollStore>['get'];
  set: Store<ScrollStore>['set'];
  setVal: Store<ScrollStore>['setVal'];
  on: EventListeners<ScrollEventsData>['on'];
  off: EventListeners<ScrollEventsData>['off'];
  fire: EventListeners<ScrollEventsData>['fire'];
}
declare function createScroll(): Scroll;
declare function createObserver(el: HTMLElement): void;
export { createObserver, createScroll };