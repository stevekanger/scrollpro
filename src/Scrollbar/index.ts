import type {
  Bounds,
  IController,
  IScrollbar,
  ScrollbarArgs,
  ScrollbarOptions,
} from '../types'
import getBounds from '../utils/getBounds'
import { setStyles } from './functions'
import applyListeners from '../utils/applyListeners'

class Scrollbar implements IScrollbar {
  private controller: IController
  private element: HTMLElement
  private bounds: Bounds
  private track: HTMLDivElement
  private thumb: HTMLSpanElement
  private options: {
    axis: string
    orientation: string
    useAnimation: boolean
  }

  constructor(
    controller: IController,
    {
      element,
      axis = 'y',
      orientation = 'vertical',
      useAnimation = true,
    }: ScrollbarArgs
  ) {
    this.controller = controller
    this.element = element
    this.track = document.createElement('div')
    this.thumb = document.createElement('span')

    this.options = {
      axis,
      orientation,
      useAnimation,
    }

    this.bounds = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
    }

    this.onPointerDown = this.onPointerDown.bind(this)
    this.onPointerMove = this.onPointerMove.bind(this)
    this.onPointerUp = this.onPointerUp.bind(this)
    this.onWheel = this.onWheel.bind(this)

    this.init()
  }

  setOptions(options: Partial<ScrollbarOptions>) {
    this.options = {
      ...this.options,
      ...options,
    }
  }

  init() {
    this.element.appendChild(this.track)
    this.track.appendChild(this.thumb)
    setStyles(this.options.orientation, this.track, this.thumb)
    this.bounds = getBounds(this.track)
    this.controller.items.scrollbar.add(this)
    this.update()

    const { hasWheel, hasPointer } = this.controller.browserSupport
    applyListeners('add', [
      {
        element: this.element,
        event: 'wheel',
        fn: this.onWheel,
        condition: hasWheel,
      },
      {
        element: this.element,
        event: 'pointerdown',
        fn: this.onPointerDown,
        condition: hasPointer,
      },
      {
        element: window,
        event: 'pointerup',
        fn: this.onPointerUp,
        condition: hasPointer,
      },
    ])
  }

  kill() {
    this.controller.items.scrollbar.delete(this)
    this.track.remove()

    const { hasWheel, hasPointer } = this.controller.browserSupport
    applyListeners('remove', [
      {
        element: this.element,
        event: 'wheel',
        fn: this.onWheel,
        condition: hasWheel,
      },
      {
        element: this.element,
        event: 'pointerdown',
        fn: this.onPointerDown,
        condition: hasPointer,
      },
      {
        element: window,
        event: 'pointerup',
        fn: this.onPointerUp,
        condition: hasPointer,
      },
    ])
  }

  update() {
    const { progressX, progressY } = this.controller.scroll
    const { axis, orientation } = this.options
    const percent = axis === 'y' ? progressY * 100 : progressX * 100

    this.thumb.style.transform =
      orientation === 'vertical'
        ? `translateY(${percent}%)`
        : `translateX(${percent}%)`
  }

  refresh() {
    const { orientation } = this.options
    this.thumb.style.right = orientation === 'vertical' ? '0' : '100%'
    this.thumb.style.bottom = orientation === 'vertical' ? '100%' : '0'
    this.bounds = getBounds(this.track)
    this.update()
  }

  private preventSelect(e: Event) {
    e.preventDefault()
  }

  private onPointerDown(e: PointerEvent) {
    if (e.stopPropagation) e.stopPropagation()
    this.onPointerMove(e)
    window.addEventListener('pointermove', this.onPointerMove)
    window.addEventListener('selectstart', this.preventSelect)
  }

  private onPointerUp(e: PointerEvent) {
    window.removeEventListener('pointermove', this.onPointerMove)
    window.removeEventListener('selectstart', this.preventSelect)
  }

  private onPointerMove(e: PointerEvent) {
    let { deltaX, deltaY, limitX, limitY } = this.controller.scroll
    const { axis, orientation, useAnimation } = this.options

    const limit = axis === 'y' ? limitY : limitX

    if (limit === Infinity || limit <= 0) return

    const isVertical = orientation === 'vertical'
    const trackLength = isVertical ? this.bounds.height : this.bounds.width
    const trackStart = isVertical ? this.bounds.top : this.bounds.left
    const pointerPos = isVertical
      ? e.pageY - window.scrollY
      : e.pageX - window.scrollX
    const pos = (limit / trackLength) * (pointerPos - trackStart)

    if (axis === 'y') {
      this.controller.scrollTo({
        x: deltaX,
        y: pos,
        animate: useAnimation,
      })
      return
    }

    this.controller.scrollTo({
      x: pos,
      y: deltaY,
      animate: useAnimation,
    })
  }

  private onWheel(e: WheelEvent) {
    e.preventDefault()
    e.stopPropagation()
    const {
      scroll: { deltaX, deltaY },
      options: { firefoxMult, mouseMult },
    } = this.controller

    const { useAnimation } = this.options

    let dx = -e.deltaX
    let dy = -e.deltaY

    if (navigator.userAgent.indexOf('Firefox') > -1 && e.deltaMode === 1) {
      dx *= firefoxMult
      dy *= firefoxMult
    }

    dx *= mouseMult
    dy *= mouseMult

    this.controller.scrollTo({
      x: deltaX - dx,
      y: deltaY - dy,
      animate: useAnimation,
    })
  }
}

export default Scrollbar
