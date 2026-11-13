import type { Scroll } from '@/scroll/types'
import createStore from '@/utils/createStore'

export default function createObserver(
  scroll: Scroll,
  el: HTMLElement,
  viewportEl: HTMLElement | Window
) {
  const accessObserverState = createStore({})
}
