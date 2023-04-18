export type ObserverArgs = {
  element: HTMLElement
  normalizeInitialView?: boolean
  offsetStart?: number
  offsetEnd?: number
  start?: number | undefined
  distance?: number | undefined
  tweenElement?: HTMLElement | undefined
  tweenCss?: TweenCss
  addClasses?: boolean
  callback?: ObserverCallback
}

export type ObserverOptions = {
  normalizeInitialView: boolean
  offsetStart: number
  offsetEnd: number
  start: number | undefined
  distance: number | undefined
  tweenElement: HTMLElement
  tweenCss: TweenCss | undefined
  addClasses: boolean
  callback: ObserverCallback
}

export interface IObserver {
  setOptions: (options: Partial<ObserverOptions>) => void
  init: () => void
  kill: () => void
  update: () => void
  refresh: () => void
}

export type TweenCss = {
  [key: string]: string
}

export type ObserverCallback = (e: ObserverEvent) => void

export type ObserverEvent = {
  progress: number
  inViewport: boolean
}
