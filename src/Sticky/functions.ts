import type { Bounds, StickyOptions, IViewport } from '../types'
import getOffsetTop from '../utils/getOffsetTop'
import getBounds from '../utils/getBounds'
import getComputedStyle from '../utils/getComputedStyle'

export function getStart(
  scrollY: number,
  viewport: IViewport,
  options: StickyOptions,
  bounds: Bounds
) {
  const { top, start } = options
  if (start) return start

  const viewportTop = viewport.getBounds().viewable.top || 0
  const offsetTop = getOffsetTop(bounds.top, viewportTop, scrollY)

  return offsetTop - top
}

export function getDistance(
  element: HTMLElement,
  options: StickyOptions,
  bounds: Bounds
) {
  const { bottom, ignoreBounds, distance } = options

  if (distance) return distance
  if (ignoreBounds) return Infinity

  const parentNode = element.parentNode as HTMLElement
  const parentPadding = getComputedStyle(parentNode, 'padding')
  const elementMargin = getComputedStyle(element, 'margin')
  const parentBounds = getBounds(parentNode)

  return (
    (parentBounds?.height || 0) -
    bounds.height -
    (parentPadding.totals.vertical || 0) -
    (elementMargin.totals.vertical || 0) -
    bottom
  )
}
