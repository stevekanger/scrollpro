import createStore from '@/utils/createStore'
import type { Observer, ObserverOptions, ObserverState } from './types'

const defaultOptions: Partial<ObserverOptions> = {
  viewport: window,
}

/**
 * Creates the observer
 *
 * @param options - The observer options
 */
export default function createObserver(options: ObserverOptions): Observer {
  const accessObserverState = createStore<ObserverState>({
    start: 0,
    end: 0,
    progress: 0,
  })

  const accessObserverOptions = createStore<ObserverOptions>({
    ...defaultOptions,
    ...options,
  })

  return {
    accessObserverState,
    accessObserverOptions,
  }
}
