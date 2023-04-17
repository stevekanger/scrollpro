export type StickyArgs = {
  element: HTMLElement
  top?: number
  bottom?: number
  start?: number | undefined
  distance?: number | undefined
  ignoreBounds?: boolean
}

export type StickyOptions = {
  top: number
  bottom: number
  start: number | undefined
  distance: number | undefined
  ignoreBounds: boolean
}

export interface ISticky {
  init: () => void
  kill: () => void
  update: () => void
  refresh: () => void
}
