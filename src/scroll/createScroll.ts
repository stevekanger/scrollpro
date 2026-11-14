import createListeners from '@/utils/createListeners'
import createStore from '@/utils/createStore'
import createAnimationFrame from './createAnimationFrame'
import type {
  AnimationFrame,
  Scroll,
  ScrollEventsData,
  ScrollOptions,
  ScrollState,
} from './types'

const defaultOptions = {
  initialX: window.scrollX,
  initialY: window.scrollY,
}

/**
 * Creates the scroll
 *
 * @param options - Scroll options that will be merged with defaults
 */
export default function createScroll(
  options: Partial<ScrollOptions> = {}
): Scroll {
  let af: AnimationFrame = createAnimationFrame()

  const listeners = createListeners<ScrollEventsData>({
    update: new Set(),
  })

  const accessScrollOptions = createStore<ScrollOptions>({
    ...defaultOptions,
    ...options,
  })

  const [{ initialX, initialY }] = accessScrollOptions()

  const accessScrollState = createStore<ScrollState>({
    x: initialX,
    y: initialY,
    deltaX: initialX,
    deltaY: initialY,
    limitX: Infinity,
    limitY: Infinity,
    progressX: 0,
    progressY: 0,
  })

  return {
    af,
    listeners,
    accessScrollState,
    accessScrollOptions,
  }
}
