import type { ObserverOptions, IViewport, Bounds } from '../types'

export function getInInitialView(offsetTop: number, viewBounds: Bounds) {
  return offsetTop < viewBounds.height
}

export function getStart(
  offsetTop: number,
  inInitialView: boolean,
  options: ObserverOptions,
  viewport: IViewport
) {
  const { start, offsetStart } = options

  if (start) return start

  if (inInitialView) return 0 + offsetStart

  return offsetTop - viewport.getBounds().viewable.height + offsetStart
}

export function getDistance(
  offsetTop: number,
  inInitialView: boolean,
  options: ObserverOptions,
  viewport: IViewport,
  bounds: Bounds
) {
  const { distance, offsetStart, offsetEnd, normalizeInitialView } = options

  if (distance) return Math.max(0, distance)

  const totalOffsets = offsetStart + offsetEnd

  if (inInitialView && !normalizeInitialView)
    return Math.max(0, offsetTop + bounds.height - totalOffsets)

  return Math.max(
    0,
    viewport.getBounds().viewable.height + bounds.height - totalOffsets
  )
}

export function getProgress(start: number, distance: number, scrollY: number) {
  return Math.min(1, Math.max(0, (scrollY - start) / distance))
}
