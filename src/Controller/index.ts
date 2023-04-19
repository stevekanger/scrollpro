import type {
  ControllerEvents,
  Scroll,
  ControllerOptions,
  ControllerItems,
  EventFn,
  Item,
  ScrollToArgs,
  IViewport,
  IController,
  IContent,
  ContentArgs,
  ScrollbarArgs,
  ObserverArgs,
  StickyArgs,
  IScrollbar,
  IObserver,
  ISticky,
  BrowserSupport,
  ViewportArgs,
} from '../types'

import Viewport from '../Viewport'
import Content from '../Content'
import Scrollbar from '../Scrollbar'
import Sticky from '../Sticky'
import Observer from '../Observer'

import {
  getScrollDiff,
  getLerpScroll,
  setScrollDeltas,
  setScrollToDeltas,
} from './functions'

class Controller implements IController {
  public viewport: IViewport | null
  public content: IContent | null
  public scroll: Scroll
  public options: ControllerOptions
  public items: ControllerItems
  public browserSupport: BrowserSupport

  private aF: null | number
  private listeners: ControllerEvents

  constructor(options?: Partial<ControllerOptions>) {
    this.aF = null
    this.viewport = null
    this.content = null

    this.items = {
      sticky: new Set(),
      scrollbar: new Set(),
      observer: new Set(),
    }

    this.options = {
      ...options,
      ease: 0.1,
      keyStep: 120,
      disableKeyNavigation: false,
      firefoxMult: 15,
      touchMult: 2,
      mouseMult: 1,
    }

    this.listeners = {
      init: new Set(),
      kill: new Set(),
      refresh: new Set(),
      update: new Set(),
    }

    this.scroll = {
      scrollX: 0,
      scrollY: 0,
      deltaX: 0,
      deltaY: 0,
      limitX: Infinity,
      limitY: Infinity,
      progressX: 0,
      progressY: 0,
    }

    this.browserSupport = {
      hasWheel: 'onwheel' in document,
      hasTouch: 'ontouchstart' in document,
      hasPointer: 'PointerEvent' in window,
      hasKeyDown: 'onkeydown' in document,
      isFirefox: navigator.userAgent.indexOf('Firefox') > -1,
    }

    this.refresh = this.refresh.bind(this)
    this.animateScroll = this.animateScroll.bind(this)
  }

  getScroll() {
    return this.scroll
  }

  setOptions(options: Partial<ControllerOptions>) {
    this.options = {
      ...this.options,
      ...options,
    }
  }

  on(e: keyof ControllerEvents, fn: EventFn) {
    this.listeners[e]?.add(fn)
  }

  off(e: keyof ControllerEvents, fn: EventFn) {
    this.listeners[e]?.delete(fn)
  }

  fire(e: keyof ControllerEvents) {
    const events = ['init', 'kill', 'update', 'refresh']
    if (!events.includes(e)) return

    const runOrder = ['scrollbar', 'sticky', 'observer']

    if (this.content) this.content[e]()

    runOrder.forEach((key) => {
      this.items[key as keyof ControllerItems]?.forEach((item: Item) => {
        item[e]()
      })
    })

    this.listeners[e].forEach((listener) => listener(this.scroll))
  }

  kill() {
    this.viewport?.kill()
    this.fire('kill')
    this.viewport = null
    this.content = null
    window.removeEventListener('resize', this.refresh)
  }

  refresh() {
    this.fire('refresh')
  }

  update() {
    this.fire('update')
  }

  createViewport(args?: ViewportArgs) {
    if (this.viewport) {
      throw new Error(
        'You already have viewport initialized for this controller. Please kill the previous viewport before initializing another content instance.'
      )
    }
    this.viewport = new Viewport(this, { ...args })
    this.fire('init')
    window.addEventListener('resize', this.refresh)
    return this.viewport
  }

  createContent(args: ContentArgs) {
    if (this.content) {
      throw new Error(
        'You already have content initialized for this controller. Please kill the previous content before initializing another content instance.'
      )
    }
    const content: IContent = new Content(this, args)
    this.content = content
    return content
  }

  createScrollbar(args: ScrollbarArgs) {
    const scrollbar: IScrollbar = new Scrollbar(this, args)
    this.items.scrollbar.add(scrollbar)
    return scrollbar
  }

  createObserver(args: ObserverArgs) {
    const observer: IObserver = new Observer(this, args)
    this.items.observer.add(observer)
    return observer
  }

  createSticky(args: StickyArgs) {
    const sticky: ISticky = new Sticky(this, args)
    this.items.sticky.add(sticky)
    return sticky
  }

  setLimit({ x = this.scroll.limitX, y = this.scroll.limitY }) {
    this.scroll.limitX = Math.max(0, x)
    this.scroll.limitY = Math.max(0, y)
    this.scroll.scrollX = Math.min(this.scroll.scrollX, this.scroll.limitX)
    this.scroll.scrollY = Math.min(this.scroll.scrollY, this.scroll.limitY)

    this.fire('update')
  }

  scrollTo({ x, y, animate = true }: ScrollToArgs) {
    this.scroll = setScrollDeltas(x, y, this.scroll)

    if (
      (this.scroll.deltaX === this.scroll.scrollX &&
        this.scroll.deltaY === this.scroll.scrollY) ||
      this.aF
    ) {
      return
    }

    if (animate) {
      this.aF = requestAnimationFrame(this.animateScroll)
      return
    }

    this.scroll = setScrollToDeltas(this.scroll)
    this.fire('update')
  }

  private animateScroll() {
    const { diffX, diffY } = getScrollDiff(this.scroll)

    if (Math.abs(diffX) > 0.2 || Math.abs(diffY) > 0.2) {
      this.scroll = getLerpScroll(this.scroll, this.options)
      this.aF = requestAnimationFrame(this.animateScroll)
    } else {
      if (this.aF) cancelAnimationFrame(this.aF)
      this.aF = null
      this.scroll = setScrollToDeltas(this.scroll)
    }

    this.fire('update')
  }
}

export default Controller
