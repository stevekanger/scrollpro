export type SetStoreActionFunction<T> = (store: T) => T

export type SetStoreAction<T> = SetStoreActionFunction<Partial<T>> | Partial<T>

export type Store<T> = [T, (action: SetStoreAction<T>) => void]

export type AccessStore<T> = () => Store<T>

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
