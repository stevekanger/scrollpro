import type { Viewport } from '@/types'
import createStore from '@/utils/createStore'
import getElementBounds from '@/utils/getElementBounds'
import getViewportBounds from '@/utils/getViewportBounds'
import type {
  Observer,
  ObserverOptions,
  ObserverState,
  RequiredObserverOptions,
} from './types'
import getProgress from '@/utils/getProgress'

const defaultOptions = {
  viewport: window,
  offsetStart: 0,
  offsetEnd: 0,
  callback: () => { },
}

export function getObserverBoundaries(
  el: HTMLElement,
  viewport: Viewport,
  scrollY: number,
  offsetStart: number,
  offsetEnd: number
) {
  const elBounds = getElementBounds(el)
  const viewportBounds = getViewportBounds(viewport)

  const start = elBounds.top + scrollY - viewportBounds.height + offsetStart
  const end = Math.max(
    0,
    start + viewportBounds.height + elBounds.height - (offsetStart + offsetEnd)
  )

  return { start, end }
}

/**
 * Creates the observer
 *
 * @param options - The observer options
 */
export default function createObserver(
  options: RequiredObserverOptions & Partial<ObserverOptions>
): Observer {
  const accessObserverState = createStore<ObserverState>({
    el: options.el,
    start: 0,
    end: 0,
    progress: 0,
  })

  const accessObserverOptions = createStore<ObserverOptions>({
    ...defaultOptions,
    ...options,
  })

  const [{ scroll, el, viewport, offsetStart, offsetEnd, callback }] =
    accessObserverOptions()
  const [scrollState] = scroll.accessScrollState()
  const [, setObserverState] = accessObserverState()
  const { start, end } = getObserverBoundaries(
    el,
    viewport,
    scrollState.y,
    offsetStart,
    offsetEnd
  )

  setObserverState({
    start,
    end,
  })

  scroll.listeners.on('update', function(e) {
    const [observerState] = accessObserverState()
    const { start, end } = observerState
    const progress = getProgress(start, end, e.y)

    observerState.progress = progress

    callback(observerState)
  })

  return {
    accessObserverState,
    accessObserverOptions,
  }
}
