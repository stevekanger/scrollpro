import type {
  IController,
  ObserverArgs,
  Bounds,
  IObserver,
  ObserverOptions,
} from '../types'
import getBounds from '../utils/getBounds'
import getOffsetTop from '../utils/getOffsetTop'
import applyClasses from '../utils/applyClasses'
import applyTween from '../utils/applyTween'
import getProgress from '../utils/getProgress'

import { getStart, getDistance, getInInitialView } from './functions'

class Observer implements IObserver {
  private controller: IController
  private element: HTMLElement
  private start: number
  private distance: number
  private progress: number | undefined
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
      callback = () => {},
    }: ObserverArgs
  ) {
    this.controller = controller
    this.element = element
    this.start = 0
    this.distance = 0
    this.progress = undefined

    this.options = {
      normalizeInitialView,
      offsetStart,
      offsetEnd,
      start,
      distance,
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

  setOptions(options: Partial<ObserverOptions>) {
    this.options = {
      ...this.options,
      ...options,
    }
  }

  private construct() {
    const { viewport } = this.controller

    if (!viewport) return

    this.progress = undefined
    const { callback } = this.options
    callback({ element: this.element, progress: 0, applyClasses, applyTween })

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
    const { callback } = this.options
    const progress = getProgress(this.start, this.distance, scrollY)

    if (
      (this.progress === 0 && progress === 0) ||
      (this.progress === 1 && progress === 1)
    )
      return

    callback({ element: this.element, progress, applyClasses, applyTween })
    this.progress = progress
  }

  refresh() {
    this.construct()
  }
}

export default Observer
