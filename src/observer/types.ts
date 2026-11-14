import type { Scroll } from '@/scroll/types'
import type { AccessStore } from '@/types'

export interface ObserverOptions {
  scroll: Scroll
  el: HTMLElement
  viewport: HTMLElement | Window
  offsetStart: number | (() => number)
  offsetEnd: number | (() => number)
  callback: (e: ObserverState) => void
}

export type RequiredObserverOptions = Pick<ObserverOptions, 'scroll' | 'el'>

export interface ObserverState {
  el: HTMLElement
  start: number
  end: number
  progress: number
}

export interface Observer {
  accessObserverState: AccessStore<ObserverState>
  accessObserverOptions: AccessStore<ObserverOptions>
}
