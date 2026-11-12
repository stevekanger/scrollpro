import type { SetStoreAction, Store } from '@/types'
import createListeners from '@/utils/createListeners'
import createStore from '@/utils/createStore'
import type {
  Scroll,
  ScrollAnimationFrame,
  ScrollEventsData,
  ScrollStore,
  AnimationFrame,
} from './types'
import getProgress from '@/utils/getProgress'

export function lerp(start: number, end: number, ease: number) {
  return (1 - ease) * start + ease * end
}

export function createAnimationFrame(): ScrollAnimationFrame {
  let af: AnimationFrame = null

  function get() {
    return af
  }

  function set(callback: FrameRequestCallback) {
    if (af) {
      cancelAnimationFrame(af)
    }

    af = requestAnimationFrame(callback)
  }

  function cancel() {
    if (af) {
      cancelAnimationFrame(af)
    }

    af = null
  }

  return {
    get,
    set,
    cancel,
  }
}

export function animateScroll(
  scrollStore: Store<ScrollStore>,
  af: ScrollAnimationFrame,
  ease: number
) {
  const { x, y, deltaX, deltaY, limitX, limitY } = scrollStore.get()

  const diffX = x - deltaX
  const diffY = y - deltaY

  if (Math.abs(diffX) > 0.2 || Math.abs(diffY) > 0.2) {
    const lerpedX = lerp(x, deltaX, ease)
    const lerpedY = lerp(x, deltaX, ease)

    scrollStore.setVal('x', lerpedX)
    scrollStore.setVal('y', lerpedY)
    scrollStore.setVal('progressX', getProgress(0, limitX, lerpedX))
    scrollStore.setVal('progressY', getProgress(0, limitY, lerpedY))

    af.set(() => animateScroll(scrollStore, af, ease))
  } else {
    if (af.get()) {
      af.cancel()
    }
    scrollStore.setVal('x', deltaX)
    scrollStore.setVal('y', deltaY)
    scrollStore.setVal('progressX', getProgress(0, limitX, deltaX))
    scrollStore.setVal('progressY', getProgress(0, limitY, deltaY))
  }
}

export default function createScroll(): Scroll {
  let af: ScrollAnimationFrame = createAnimationFrame()

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
    animateScroll(scrollStore, af, 0.1)
    listeners.dispatch('update', scrollStore.get())
  }

  function setVal<K extends keyof ScrollStore>(
    key: K,
    val: ScrollStore[K]
  ): void {
    scrollStore.setVal(key, val)
    animateScroll(scrollStore, af, 0.1)
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
