import type { SetStoreAction } from '@/types'
import createListeners from '@/utils/createListeners'
import createStore from '@/utils/createStore'
import type { Scroll, ScrollEventsData, ScrollStore } from './types'

export default function createScroll(): Scroll {
  const scrollStore = createStore<ScrollStore>({
    x: 0,
    y: 0,
    deltaX: 0,
    deltaY: 0,
    limitX: 0,
    limitY: 0,
    progressX: 0,
    progressY: 0,
  })

  const listeners = createListeners<ScrollEventsData>({
    update: new Set(),
  })

  function set(action: SetStoreAction<ScrollStore>): void {
    scrollStore.set(action)
    listeners.dispatch('update', scrollStore.get())
  }

  function setVal<K extends keyof ScrollStore>(
    key: K,
    val: ScrollStore[K]
  ): void {
    scrollStore.setVal(key, val)
    listeners.dispatch('update', scrollStore.get())
  }

  return {
    set,
    setVal,
    get: scrollStore.get,
    on: listeners.on,
    off: listeners.off,
  }
}
