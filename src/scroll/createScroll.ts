import createListeners from '@/utils/createListeners'
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
  initialOptions: Partial<ScrollOptions> = {}
): Scroll {
  let af: AnimationFrame = createAnimationFrame()

  const listeners = createListeners<ScrollEventsData>({
    update: new Set(),
  })

  const options: ScrollOptions = {
    ...defaultOptions,
    ...initialOptions,
  }

  const { initialX, initialY } = options

  const state: ScrollState = {
    x: initialX,
    y: initialY,
    deltaX: initialX,
    deltaY: initialY,
    limitX: Infinity,
    limitY: Infinity,
    progressX: 0,
    progressY: 0,
  }

  const scroll = {
    af,
    listeners,
    options,
    state,
  }

  return scroll
}
