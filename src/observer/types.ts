import type { Scroll } from '@/scroll/types'
import type { AccessStore } from '@/types'

export interface ObserverOptions {
  scroll: Scroll
  el: HTMLElement
  viewport: HTMLElement | Window
}

export interface ObserverState {
  start: number
  end: number
  progress: number
}

export interface Observer {
  accessObserverState: AccessStore<ObserverState>
  accessObserverOptions: AccessStore<ObserverOptions>
}
