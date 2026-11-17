import type { ResolvableOption, Viewport } from '@/types'
import getElementBounds from '@/utils/getElementBounds'
import getViewportBounds from '@/utils/getViewportBounds'
import type { Observer, ObserverOptions, ObserverState } from './types'
import getProgress from '@/utils/getProgress'
import resolveOption from '@/utils/resolveOption'
import type { Scroll } from '@/scroll/types'

const defaultOptions = {
  viewport: window,
  offsetStart: 0,
  offsetEnd: 0,
  callback: () => { },
}

/**
 * Whether the element is in view when the scroll position is 0
 *
 * @param elTop - The elements top position
 * @param viewportTop - The viewports top position
 * @param viewportHeight - The viewports height
 */
function inInitialView(
  elTop: number,
  viewportTop: number,
  viewportHeight: number
): boolean {
  if (elTop < window.innerHeight) {
    return true
  }

  return false
}

/**
 * Gets the observer starting pos when the element first passes into view
 *
 * @param elTop - The elements top position
 * @param elHeight - The elements height
 * @param viewportTop - The viewports top position
 * @param viewportHeight - The viewports height
 * @param scrollY - The current scrollY position
 * @param offsetStart - The resolved offsetStart option
 */
export function getObserverStart(
  elTop: number,
  elHeight: number,
  viewportTop: number,
  viewportHeight: number,
  scrollY: number,
  offsetStart: number
): number {
  if (inInitialView(elTop, viewportTop, viewportHeight)) {
    return 0
  }

  return elTop + scrollY - viewportHeight + offsetStart
}

/**
 * Gets the observer ending pos when the element is completely out of view
 *
 * @param start - The starting pos
 * @param elTop - The elements top position
 * @param elHeight - The elements height
 * @param viewportTop - The viewports top position
 * @param viewportHeight - The viewports height
 * @param scrollY - The current scrollY position
 * @param offsetStart - The resolved offsetStart option
 * @param offsetEnd - The resolved offsetEnd option
 */
export function getObserverEnd(
  start: number,
  elTop: number,
  elHeight: number,
  viewportTop: number,
  viewportHeight: number,
  scrollY: number,
  offsetStart: number,
  offsetEnd: number
): number {
  const normalizedStart = inInitialView(elTop, viewportTop, scrollY)
    ? start - elTop
    : start

  return Math.max(
    0,
    normalizedStart + viewportHeight + elHeight - (offsetStart + offsetEnd)
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
  // const start = elBounds.top + scrollY - viewportBounds.height + offsetStart
  const start = getObserverStart(
    elBounds.top,
    elBounds.height,
    viewportBounds.top,
    viewportBounds.height,
    scrollY,
    offsetStart
  )

  // const end = Math.max(
  //   0,
  //   start + viewportBounds.height + elBounds.height - (offsetStart + offsetEnd)
  // )

  const end = getObserverEnd(
    start,
    elBounds.top,
    elBounds.height,
    viewportBounds.top,
    viewportBounds.height,
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
