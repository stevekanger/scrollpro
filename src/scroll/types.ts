import type { AccessStore } from '@/types'
import type { EventListeners } from '@/types'

export interface ScrollState {
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
  update: ScrollState
}

export interface ScrollOptions {
  ease: number
}

export interface Scroll {
  af: AnimationFrame
  listeners: EventListeners<ScrollEventsData>
  accessScrollState: AccessStore<ScrollState>
  accessScrollOptions: AccessStore<ScrollOptions>
}

export type AF = ReturnType<typeof requestAnimationFrame> | null

export interface AnimationFrame {
  get: () => AF
  request: (callback: FrameRequestCallback) => void
  cancel: () => void
}
