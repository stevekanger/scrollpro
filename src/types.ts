export type SetStoreAction<T> = ((store: T) => Partial<T>) | Partial<T>

export interface Store<T> {
  get: () => T
  set: (action: SetStoreAction<T>) => void
  setVal: <K extends keyof T>(key: K, val: T[K]) => void
}

export type EventListener<Data> = (data: Data) => void

export type EventsMap<EventsData> = {
  [K in keyof EventsData]: Set<EventListener<EventsData[K]>>
}

export interface EventListeners<EventsData> {
  on: <K extends keyof EventsData>(
    e: K,
    listener: EventListener<EventsData[K]>
  ) => void
  off: <K extends keyof EventsData>(
    e: K,
    listener: EventListener<EventsData[K]>
  ) => void
  dispatch: <K extends keyof EventsData>(e: K, data: EventsData[K]) => void
}
