import type { Scroll } from '@/scroll/types'
import type { ElementBounds, ResolvableOption, Viewport } from '@/types'
import getElementBounds from '@/utils/getElementBounds'
import getProgress from '@/utils/getProgress'
import getViewportBounds from '@/utils/getViewportBounds'
import resolveOption from '@/utils/resolveOption'
import type { Observer, ObserverOptions, ObserverState } from './types'

const defaultOptions = {
  viewport: window,
  offsetStart: 0,
  offsetEnd: 0,
  callback: () => { },
}

/**
 * Whether the start of an element is in view when the scroll position is 0
 *
 * @param elBounds - The elements bounds
 * @param viewportBounds - The viewports bounds
 */
function startInInitialView(
  elBounds: ElementBounds,
  viewportBounds: ElementBounds
): boolean {
  if (elBounds.top < window.innerHeight) {
    return true
  }

  return false
}

/**
 * Gets the observer starting pos when the element first passes into view
 *
 * @param elBounds - The elements bounds
 * @param viewportBounds - The viewports bounds
 * @param scrollY - The current scrollY position
 * @param offsetStart - The resolved offsetStart option
 */
export function getObserverStart(
  elBounds: ElementBounds,
  viewportBounds: ElementBounds,
  scrollY: number,
  offsetStart: number
): number {
  return Math.max(
    0,
    elBounds.top + scrollY - viewportBounds.height + offsetStart
  )
}

/**
 * Gets the observer ending pos when the element is completely out of view
 *
 * @param start - The starting pos
 * @param elBounds - The elements bounds
 * @param viewportBounds - The viewports bounds
 * @param scrollY - The current scrollY position
 * @param offsetStart - The resolved offsetStart option
 * @param offsetEnd - The resolved offsetEnd option
 */
export function getObserverEnd(
  start: number,
  elBounds: ElementBounds,
  viewportBounds: ElementBounds,
  scrollY: number,
  offsetStart: number,
  offsetEnd: number
): number {
  const normalizedStart = startInInitialView(elBounds, viewportBounds)
    ? elBounds.top + scrollY - viewportBounds.height + offsetStart
    : start

  return Math.max(
    0,
    normalizedStart +
    elBounds.height +
    viewportBounds.height -
    (offsetStart + offsetEnd)
  )
}

/**
 * Gets the start and end positions of the observer
 *
 * @param el - The element to observe
 * @param viewport - The viewport element
 * @param scrollY - The current scroll position
 * @param offsetStart - The offsetStart option
 * @param offsetEnd - The offsetEnd position
 */
export function getObserverBoundaries(
  el: HTMLElement,
  viewport: Viewport,
  scrollY: number,
  offsetStart: ResolvableOption<number>,
  offsetEnd: ResolvableOption<number>
) {
  offsetStart = resolveOption(offsetStart)
  offsetEnd = resolveOption(offsetEnd)
  const elBounds = getElementBounds(el)
  const viewportBounds = getViewportBounds(viewport)
  const start = getObserverStart(elBounds, viewportBounds, scrollY, offsetStart)

  const end = getObserverEnd(
    start,
    elBounds,
    viewportBounds,
    scrollY,
    offsetStart,
    offsetEnd
  )

  return { start, end }
}

/**
 * Builds the observer start and end values
 *
 * @param observer - The observer to build
 */
function buildObserver({ el, scroll, options, state }: Observer): void {
  const { viewport, offsetStart, offsetEnd, callback } = options

  const { start, end } = getObserverBoundaries(
    el,
    viewport,
    scroll.state.y,
    offsetStart,
    offsetEnd
  )

  state.start = start
  state.end = end

  const progress = getProgress(start, end, scroll.state.y)
  state.progress = progress

  callback(state)
}

/**
 * Builds the observer start and end values
 *
 * @param observer - The observer to build
 */
function setObserverProgress(state: ObserverState, scrollY: number): void {
  state.progress = getProgress(state.start, state.end, scrollY)
}

/**
 * Initialize the observer
 *
 * @param observer - The observer to Initialize
 */
function initObserver(observer: Observer): void {
  const { scroll, options, state } = observer

  buildObserver(observer)

  scroll.listeners.on('update', function(e) {
    setObserverProgress(state, e.y)
    options.callback(state)
  })
}

/**
 * Creates the observer
 *
 * @param options - The observer options
 */
export default function createObserver(
  scroll: Scroll,
  el: HTMLElement,
  initialOptions: Partial<ObserverOptions>
): Observer {
  const options: ObserverOptions = {
    ...defaultOptions,
    ...initialOptions,
  }

  const state: ObserverState = {
    el,
    start: 0,
    end: 0,
    progress: 0,
  }

  const observer: Observer = {
    scroll,
    el,
    state,
    options,
  }

  initObserver(observer)

  return observer
}
