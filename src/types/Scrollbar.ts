export type ScrollbarArgs = {
  element: HTMLElement
  axis?: string
  orientation?: string
  useEasing?: boolean
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
  useEasing: boolean
}
