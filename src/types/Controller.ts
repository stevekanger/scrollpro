import type { IViewport, ViewportArgs } from './Viewport'
import type { ContentArgs, IContent } from './Content'
import type { StickyArgs, ISticky } from './Sticky'
import type { ObserverArgs, IObserver } from './Observer'
import type { ScrollbarArgs, IScrollbar } from './Scrollbar'

export interface IController {
  viewport: null | IViewport
  content: null | IContent
  scroll: Scroll
  options: ControllerOptions
  items: ControllerItems
  browserSupport: BrowserSupport
  on: (e: keyof ControllerEvents, fn: EventFn) => void
  off: (e: keyof ControllerEvents, fn: EventFn) => void
  fire: (e: keyof ControllerEvents, data?: Scroll) => void
  kill: () => void
  refresh: () => void
  update: () => void
  setOptions: (options: Partial<ControllerOptions>) => void
  createViewport: (args: ViewportArgs) => void
  createContent: (args: ContentArgs) => IContent
  createScrollbar: (args: ScrollbarArgs) => IScrollbar
  createObserver: (args: ObserverArgs) => IObserver
  createSticky: (args: StickyArgs) => ISticky
  setLimit: ({ x, y }: { x: number; y: number }) => void
  scrollTo: (args: ScrollToArgs) => void
}

export type Scroll = {
  scrollX: number
  scrollY: number
  deltaX: number
  deltaY: number
  limitX: number
  limitY: number
  progressX: number
  progressY: number
}

export type ItemFn = () => void

export type Item = {
  update: ItemFn
  refresh: ItemFn
  kill: ItemFn
  init: ItemFn
}

export type ControllerItems = {
  scrollbar: Set<Item>
  sticky: Set<Item>
  observer: Set<Item>
}

export type ControllerOptions = {
  keyStep: number
  disableKeyNavigation: boolean
  firefoxMult: number
  touchMult: number
  mouseMult: number
  ease: number
}

export type EventFn = (e?: Scroll) => void

export type ControllerEvents = {
  init: Set<EventFn>
  kill: Set<EventFn>
  refresh: Set<EventFn>
  update: Set<EventFn>
}

export type ScrollToArgs = {
  x?: number
  y?: number
  animate?: boolean
}

export type BrowserSupport = {
  hasWheel: boolean
  hasTouch: boolean
  hasPointer: boolean
  hasKeyDown: boolean
  isFirefox: boolean
}
