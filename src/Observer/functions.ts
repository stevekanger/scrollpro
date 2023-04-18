import type { ObserverOptions, TweenCss, IViewport, Bounds } from '../types'

const regex = /\{(.*?)\}/g

function replaceString(progress: number) {
  return function (string: string) {
    const s = string.slice(1, -1)
    const vals = s.split(',')

    if (vals.length === 2) {
      const from = Number(vals[0])
      const to = Number(vals[1])
      const val = (to - from) * progress + from

      if (isNaN(val)) {
        console.log(
          `You have a css parse error. ${string} has an invalid number`
        )
        return string
      }

      return val.toString()
    }

    console.log(
      `You have a css parse error. ${string} is required to have a to and from value.`
    )

    return string
  }
}

export function applyTween(
  element: HTMLElement,
  css: TweenCss,
  progress: number
) {
  if (!css) return

  Object.keys(css).forEach((key: string) => {
    const string = css[key]
    const replaced = string.replace(regex, replaceString(progress))

    if (!element) return

    element.style[key as any] = replaced
  })
}

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

export function applyClasses(element: HTMLElement, progress: number) {
  if (progress === 0) {
    if (element.classList.contains('belowViewport')) return
    element.classList.add('belowViewport')
    element.classList.remove('aboveViewport', 'inViewport')
  } else if (progress === 1) {
    if (element.classList.contains('aboveViewport')) return
    element.classList.add('aboveViewport')
    element.classList.remove('belowViewport', 'inViewport')
  } else {
    if (element.classList.contains('inViewport')) return
    element.classList.add('inViewport')
    element.classList.remove('belowViewport', 'aboveViewport')
  }
}

export function getProgress(start: number, distance: number, scrollY: number) {
  return Math.min(1, Math.max(0, (scrollY - start) / distance))
}
