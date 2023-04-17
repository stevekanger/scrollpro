export type ObserverArgs = {
  element: HTMLElement
  normalizeInitialView?: boolean
  offsetStart?: number
  offsetEnd?: number
  start?: number | undefined
  distance?: number | undefined
  tween?: Tween
  addClasses?: boolean
  callback?: ObserverCallback
}

export type ObserverOptions = {
  normalizeInitialView: boolean
  offsetStart: number
  offsetEnd: number
  start: number | undefined
  distance: number | undefined
  tween: Tween
  addClasses: boolean
  callback: ObserverCallback
}

export interface IObserver {
  init: () => void
  kill: () => void
  update: () => void
  refresh: () => void
}

type TweenCss = {
  [key: string]: string
}

export type Tween = {
  element?: HTMLElement
  css: TweenCss | undefined
}

export type ObserverCallback = (e: ObserverEvent) => void

export type ObserverEvent = {
  progress: number
  inViewport: boolean
}
