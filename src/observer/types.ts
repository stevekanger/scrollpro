import type { Scroll } from '@/scroll/types'
import type { ResolvableOption } from '@/types'

export interface ObserverOptions {
  viewport: HTMLElement | Window
  offsetStart: ResolvableOption<number>
  offsetEnd: ResolvableOption<number>
  callback: (e: ObserverState) => void
}

// export type RequiredObserverOptions = Pick<ObserverOptions, 'scroll' | 'el'>

export interface ObserverState {
  el: HTMLElement
  start: number
  end: number
  progress: number
}

export interface Observer {
  scroll: Scroll
  el: HTMLElement
  options: ObserverOptions
  state: ObserverState
}
