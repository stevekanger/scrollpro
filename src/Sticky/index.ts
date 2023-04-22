import type {
  ISticky,
  IController,
  StickyArgs,
  StickyOptions,
  Bounds,
} from '../types'

import getBounds from '../utils/getBounds'
import getProgress from '../utils/getProgress'
import { getStart, getDistance } from './functions'

class Sticky implements ISticky {
  private controller: IController
  private element: HTMLElement
  private options: StickyOptions
  private bounds: Bounds
  private start: number
  private distance: number
  private progress: number | undefined

  constructor(
    controller: IController,
    {
      element,
      top = 0,
      bottom = 0,
      start,
      distance,
      ignoreBounds = false,
    }: StickyArgs
  ) {
    this.controller = controller
    this.element = element
    this.start = 0
    this.distance = 0
    this.progress = undefined

    this.options = {
      top,
      bottom,
      start,
      distance,
      ignoreBounds,
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

  setOptions(options: Partial<StickyOptions>) {
    this.options = {
      ...this.options,
      ...options,
    }
  }

  private construct() {
    const { viewport } = this.controller

    if (!viewport) return

    this.progress = undefined
    this.element.style.transform = 'translateY(0)'
    this.bounds = getBounds(this.element)

    this.start = getStart(
      this.controller.scroll.scrollY,
      viewport,
      this.options,
      this.bounds
    )

    this.distance = getDistance(this.element, this.options, this.bounds)

    this.update()
  }

  init() {
    this.construct()
    this.controller.items.sticky.add(this)
  }

  kill() {
    this.controller.items.sticky.delete(this)
  }

  update() {
    const { scrollY } = this.controller.scroll
    const pos = Math.min(this.distance, Math.max(0, scrollY - this.start))
    const progress = getProgress(this.start, this.distance, scrollY)

    if (
      (this.progress === 0 && progress === 0) ||
      (this.progress === 1 && progress === 1)
    )
      return

    this.element.style.transform = `translateY(${pos}px)`
    this.progress = progress
  }

  refresh() {
    this.construct()
  }
}

export default Sticky
