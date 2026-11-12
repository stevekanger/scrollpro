import type { EventListener, EventListeners, EventsMap } from '@/types'

/**
 * Creates the event listeners.
 *
 * @param events - The listener events
 *
 * @typeParam EventsData - A map of the event keys and that events emit data
 */
export default function createListeners<EventsData extends object>(
  events: EventsMap<EventsData>
): EventListeners<EventsData> {
  function on<K extends keyof EventsData>(
    event: K,
    listener: EventListener<EventsData[K]>
  ): void {
    events[event].add(listener)
  }

  function off<K extends keyof EventsData>(
    event: K,
    listener: EventListener<EventsData[K]>
  ): void {
    events[event].delete(listener)
  }

  function dispatch<K extends keyof EventsData>(
    event: K,
    data: EventsData[K]
  ): void {
    events[event].forEach((listener) => listener(data))
  }

  return {
    on,
    off,
    dispatch,
  }
}
