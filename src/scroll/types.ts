import type { Store } from '@/types'
import type { EventListeners } from '@/types'

export interface ScrollStore {
  x: number
  y: number
  deltaX: number
  deltaY: number
  limitX: number
  limitY: number
  progressX: number
  progressY: number
}

export interface ScrollEventsData {
  update: ScrollStore
}

export interface Scroll {
  get: Store<ScrollStore>['get']
  set: Store<ScrollStore>['set']
  setVal: Store<ScrollStore>['setVal']
  on: EventListeners<ScrollEventsData>['on']
  off: EventListeners<ScrollEventsData>['off']
}

export type AnimationFrame = ReturnType<typeof requestAnimationFrame> | null

export interface ScrollAnimationFrame {
  get: () => AnimationFrame
  set: (callback: FrameRequestCallback) => void
  cancel: () => void
}
