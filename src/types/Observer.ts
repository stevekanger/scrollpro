export type ObserverArgs = {
  element: HTMLElement
  normalizeInitialView?: boolean
  offsetStart?: number
  offsetEnd?: number
  start?: number | undefined
  distance?: number | undefined
  callback?: ObserverCallback
}

export type ObserverOptions = {
  normalizeInitialView: boolean
  offsetStart: number
  offsetEnd: number
  start: number | undefined
  distance: number | undefined
  callback: ObserverCallback
}

export interface IObserver {
  setOptions: (options: Partial<ObserverOptions>) => void
  init: () => void
  kill: () => void
  update: () => void
  refresh: () => void
}

export type ObserverEvent = {
  element: HTMLElement
  progress: number
  applyClasses: (element: HTMLElement, progress: number) => void
  applyTween: (
    element: HTMLElement,
    progress: number,
    css: {
      [key: string]: string
    }
  ) => void
}

export type ObserverCallback = ({
  element,
  progress,
  applyClasses,
  applyTween,
}: ObserverEvent) => void
