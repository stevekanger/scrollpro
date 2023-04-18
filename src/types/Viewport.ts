import { Bounds, Data } from './shared'

type ViewportBounds = Bounds & { viewable: Bounds }

export type ViewportArgs = {
  element?: HTMLElement | Window | undefined
}

export interface IViewport {
  getBounds: () => ViewportBounds
  kill: () => void
}

export type TouchStart = {
  x: number
  y: number
}
