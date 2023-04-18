import type {
  Bounds,
  IController,
  IViewport,
  TouchStart,
  ViewportArgs,
} from '../types'

import getBounds from '../utils/getBounds'
import applyListeners from '../utils/applyListeners'
import { getDeltaFromKey, getViewableBounds } from './functions'

class Viewport implements IViewport {
  private element: Window | HTMLElement
  private controller: IController
  private touchStart: TouchStart
  private bounds: Bounds
  private viewableBounds: Bounds

  constructor(controller: IController, { element = window }: ViewportArgs) {
    this.controller = controller
    this.element = element

    this.touchStart = {
      x: 0,
      y: 0,
    }

    this.bounds = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
    }

    this.viewableBounds = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
    }

    this.onKeyDown = this.onKeyDown.bind(this)
    this.onPointerDown = this.onPointerDown.bind(this)
    this.onPointerUp = this.onPointerUp.bind(this)
    this.onPointerMove = this.onPointerMove.bind(this)
    this.onWheel = this.onWheel.bind(this)

    this.init()
  }

  getBounds() {
    return {
      ...this.bounds,
      viewable: this.viewableBounds,
    }
  }

  kill() {
    const {
      options: { disableKeyNavigation },
      browserSupport: { hasWheel, hasPointer, hasTouch, hasKeyDown },
    } = this.controller

    this.controller.viewport = null
    document.body.style.touchAction = 'pinch-zoom'

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
        condition: hasPointer && hasTouch,
      },
      {
        element: this.element,
        event: 'pointerup',
        fn: this.onPointerUp,
        condition: hasPointer && hasTouch,
      },
      {
        element: document,
        event: 'keydown',
        fn: this.onKeyDown,
        condition: !disableKeyNavigation && hasKeyDown,
      },
    ])
  }

  private init() {
    const {
      options: { disableKeyNavigation },
      browserSupport: { hasWheel, hasPointer, hasTouch, hasKeyDown },
    } = this.controller

    this.construct()
    document.body.style.touchAction = 'pinch-zoom'

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
        condition: hasPointer && hasTouch,
      },
      {
        element: this.element,
        event: 'pointerup',
        fn: this.onPointerUp,
        condition: hasPointer && hasTouch,
      },
      {
        element: document,
        event: 'keydown',
        fn: this.onKeyDown,
        condition: !disableKeyNavigation && hasKeyDown,
      },
    ])
  }

  private construct() {
    this.bounds = getBounds(this.element)
    this.viewableBounds = getViewableBounds(this.bounds, this.element)
  }

  private onWheel(e: WheelEvent) {
    const { firefoxMult, mouseMult } = this.controller.options
    let x = -e.deltaX
    let y = -e.deltaY

    if (this.controller.browserSupport.isFirefox && e.deltaMode === 1) {
      x *= firefoxMult
      y *= firefoxMult
    }

    x *= mouseMult
    y *= mouseMult

    let { deltaX, deltaY } = this.controller.scroll

    deltaX -= x
    deltaY -= y

    this.controller.scrollTo({ y: deltaY, x: deltaX })
  }

  private onPointerUp(e: PointerEvent) {
    if (e.pointerType === 'mouse') return
    window.removeEventListener('pointermove', this.onPointerMove)
  }

  private onPointerDown(e: PointerEvent) {
    if (e.pointerType === 'mouse') return

    this.touchStart.x = e.pageX
    this.touchStart.y = e.pageY

    this.onPointerMove(e)
    window.addEventListener('pointermove', this.onPointerMove)
  }

  private onPointerMove(e: PointerEvent) {
    const { touchMult } = this.controller.options
    let x = (e.pageX - this.touchStart.x) * touchMult
    let y = (e.pageY - this.touchStart.y) * touchMult
    this.touchStart.x = e.pageX
    this.touchStart.y = e.pageY

    let { deltaX, deltaY } = this.controller.scroll

    deltaX -= x
    deltaY -= y

    this.controller.scrollTo({ y: deltaY, x: deltaX })
  }

  private onKeyDown(e: KeyboardEvent) {
    const { limitY } = this.controller.scroll
    const { keyStep } = this.controller.options
    const { x, y } = getDeltaFromKey(e, limitY, keyStep)

    let { deltaX, deltaY } = this.controller.scroll

    deltaX -= x
    deltaY -= y

    this.controller.scrollTo({ y: deltaY, x: deltaX })
  }
}

export default Viewport
