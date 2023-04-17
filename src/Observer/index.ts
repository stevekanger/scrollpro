import type {
  IController,
  ObserverArgs,
  Bounds,
  IObserver,
  ObserverOptions,
} from '../types'
import getBounds from '../utils/getBounds'
import getOffsetTop from '../utils/getOffsetTop'

import {
  applyTween,
  getStart,
  getDistance,
  applyClasses,
  getInInitialView,
  getProgress,
} from './functions'

class Observer implements IObserver {
  private controller: IController
  private element: HTMLElement
  private start: number
  private distance: number
  private options: ObserverOptions
  private bounds: Bounds

  constructor(
    controller: IController,
    {
      element,
      normalizeInitialView = false,
      offsetStart = 0,
      offsetEnd = 0,
      start,
      distance,
      tween,
      addClasses = false,
      callback = () => {},
    }: ObserverArgs
  ) {
    this.controller = controller
    this.element = element
    this.start = 0
    this.distance = 0

    this.options = {
      normalizeInitialView,
      offsetStart,
      offsetEnd,
      start,
      distance,
      tween: {
        element: tween?.element || this.element,
        css: tween?.css,
      },
      addClasses,
      callback,
    }

    this.bounds = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
    }

    this.init()
  }

  private construct() {
    const { viewport } = this.controller

    if (!viewport) return

    const { tween } = this.options
    if (tween.css) applyTween(tween, 0)
    this.bounds = getBounds(this.element)
    const viewBounds = viewport.getBounds().viewable
    const { scrollY } = this.controller.scroll
    const offsetTop = getOffsetTop(this.bounds.top, viewBounds.top, scrollY)
    const inInitialView = getInInitialView(offsetTop, viewBounds)
    this.start = getStart(offsetTop, inInitialView, this.options, viewport)
    this.distance = getDistance(
      offsetTop,
      inInitialView,
      this.options,
      viewport,
      this.bounds
    )

    this.update()
  }

  init() {
    this.construct()
    this.controller.items.observer.add(this)
  }

  kill() {
    this.controller.items.observer.delete(this)
  }

  update() {
    const { scrollY } = this.controller.scroll
    const { tween, addClasses, callback } = this.options

    const progress = getProgress(this.start, this.distance, scrollY)
    const inViewport = progress > 0 && progress < 1

    if (tween.css) applyTween(tween, progress)
    if (addClasses) applyClasses(this.element, progress)

    if (callback && typeof callback === 'function') {
      callback({ progress, inViewport })
    }
  }

  refresh() {
    this.construct()
  }
}

export default Observer
