import createListeners from '@/utils/createListeners'
import createStore from '@/utils/createStore'
import createAnimationFrame from './createAnimationFrame'
import type {
  AnimationFrame,
  Scroll,
  ScrollEventsData,
  ScrollOptions,
} from './types'

const defaultOptions = {
  ease: 0.1,
}

/**
 * Creates the scroll
 *
 * @param initialOptions - The user defined scroll options that will be merged with defaults
 */
export default function createScroll(
  initialOptions: Partial<ScrollOptions> = {}
): Scroll {
  let af: AnimationFrame = createAnimationFrame()

  const listeners = createListeners<ScrollEventsData>({
    update: new Set(),
  })

  const accessScrollState = createStore({
    x: 0,
    y: 0,
    deltaX: 0,
    deltaY: 0,
    limitX: Infinity,
    limitY: Infinity,
    progressX: 0,
    progressY: 0,
  })

  const accessScrollOptions = createStore({
    ...defaultOptions,
    ...initialOptions,
  })

  return {
    af,
    listeners,
    accessScrollState,
    accessScrollOptions,
  }
}
