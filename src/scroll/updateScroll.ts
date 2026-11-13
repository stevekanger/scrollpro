import type { Scroll, AnimationFrame, ScrollState } from './types'
import getProgress from '@/utils/getProgress'

/**
 * Linear interplation function
 *
 * @param start - The staring value
 * @param end  - The ending value
 * @param ease - The easing value
 */
export function lerp(start: number, end: number, ease: number) {
  return (1 - ease) * start + ease * end
}

/**
 * Anmiates the scroll via requestAnimationFrame from x,y value to their respective deltas
 *
 * @param state - The scroll state
 * @param af  - The animation frame
 * @param ease - The ease value
 * @param callback - The callback to run after the frame
 */
export function animateScrollToDeltas(
  state: ScrollState,
  af: AnimationFrame,
  ease: number,
  callback: () => void
) {
  const { x, y, deltaX, deltaY, limitX, limitY } = state

  const diffX = x - deltaX
  const diffY = y - deltaY

  if (Math.abs(diffX) > 0.2 || Math.abs(diffY) > 0.2) {
    const lerpedX = lerp(x, deltaX, ease)
    const lerpedY = lerp(y, deltaY, ease)

    // Must mutate state directly here for performance reasons
    state.x = lerpedX
    state.y = lerpedY
    state.progressX = getProgress(0, limitX, lerpedX)
    state.progressY = getProgress(0, limitY, lerpedY)

    af.request(() => animateScrollToDeltas(state, af, ease, callback))
  } else {
    af.cancel()

    // Must mutate state directly here for performance reasons
    state.x = deltaX
    state.y = deltaY
    state.progressX = getProgress(0, limitX, deltaX)
    state.progressY = getProgress(0, limitY, deltaY)
  }

  callback()
}

/**
 * Connects the scroll to a scrolling mechanism
 *
 * @param scroll - The scroll
 * @param x - The x scroll value
 * @param y - The y scroll value
 * @param [animate=true] - Whether or not to animate the scroll
 */
export default function updateScroll(
  scroll: Scroll,
  x: number,
  y: number,
  animate: boolean = true
): void {
  const { af, accessScrollState, accessScrollOptions, listeners } = scroll
  const [{ ease }] = accessScrollOptions()
  const [state] = accessScrollState()

  af.cancel()

  if (animate) {
    // Must mutate state directly here for performance reasons
    state.deltaX = Math.min(state.limitX, Math.max(0, x))
    state.deltaY = Math.min(state.limitY, Math.max(0, y))

    af.request(() =>
      animateScrollToDeltas(state, af, ease, function() {
        listeners.dispatch('update', state)
      })
    )
  } else {
    // Must mutate state directly here for performance reasons
    state.x = x
    state.y = y
    state.deltaX = x
    state.deltaY = y

    listeners.dispatch('update', state)
  }
}
