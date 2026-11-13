import type { AnimationFrame, AF } from './types'

export default function createAnimationFrame(): AnimationFrame {
  let current: AF = null

  /**
   * Gets the current animationFrame
   */
  function get() {
    return current
  }

  /**
   * Sets the animation frame. If one exists it automatically cancels it.
   *
   * @param callback - The animationFrame callback function
   */
  function request(callback: FrameRequestCallback) {
    if (current) {
      cancelAnimationFrame(current)
    }

    current = requestAnimationFrame(callback)
  }

  /**
   * Cancels the animationFrame and sets to null
   */
  function cancel() {
    if (current) {
      cancelAnimationFrame(current)
    }

    current = null
  }

  return {
    get,
    request,
    cancel,
  }
}
