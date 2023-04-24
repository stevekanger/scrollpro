import type { ControllerOptions, Scroll } from '../types'

export function getProgress(scroll: number, limit: number) {
  return limit > 0 ? scroll / limit : 0
}

function lerp(start: number, end: number, ease: number) {
  return (1 - ease) * start + ease * end
}

export function setScrollDeltas(
  x: number | undefined,
  y: number | undefined,
  scroll: Scroll
) {
  let { deltaX, deltaY, limitX, limitY } = scroll

  deltaX = x !== undefined ? x : deltaX
  deltaY = y !== undefined ? y : deltaY

  deltaX = Math.max(0, deltaX)
  deltaY = Math.max(0, deltaY)

  deltaX = Math.min(limitX, deltaX)
  deltaY = Math.min(limitY, deltaY)

  return { ...scroll, deltaX, deltaY }
}

export function setScrollToDeltas(scroll: Scroll) {
  const scrollX = scroll.deltaX
  const scrollY = scroll.deltaY
  const progressX = getProgress(scroll.deltaX, scroll.limitX)
  const progressY = getProgress(scroll.deltaY, scroll.limitY)

  return {
    ...scroll,
    scrollX,
    scrollY,
    progressX,
    progressY,
  }
}

export function getScrollDiff(scroll: Scroll) {
  return {
    diffX: scroll.scrollX - scroll.deltaX,
    diffY: scroll.scrollY - scroll.deltaY,
  }
}

export function getLerpScroll(scroll: Scroll, ease: number) {
  const scrollX = lerp(scroll.scrollX, scroll.deltaX, ease)
  const scrollY = lerp(scroll.scrollY, scroll.deltaY, ease)
  const progressX = getProgress(scroll.scrollX, scroll.limitX)
  const progressY = getProgress(scroll.scrollY, scroll.limitY)

  return {
    ...scroll,
    scrollX,
    scrollY,
    progressX,
    progressY,
  }
}
