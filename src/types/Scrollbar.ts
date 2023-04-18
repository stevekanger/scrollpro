import type { Bounds } from './shared'

export type ScrollbarArgs = {
  element: HTMLElement
  axis?: string
  orientation?: string
  useAnimation?: boolean
}

export interface IScrollbar {
  setOptions: (options: Partial<ScrollbarOptions>) => void
  init: () => void
  kill: () => void
  update: () => void
  refresh: () => void
}

export type ScrollbarOptions = {
  axis: string
  orientation: string
  useAnimation: boolean
}
