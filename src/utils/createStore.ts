import type { Store, SetStoreAction } from '../types'

/**
 * Creates a data store
 *
 * @param initialState - An object with the initial store state
 */
export default function createStore<T extends object>(
  initialState: T
): Store<T> {
  let state = initialState

  /**
   * Gets the store value
   */
  function get(): T {
    return state
  }

  /**
   * Sets the entire store
   *
   * @param action - Either a partial of the store or a function that returns a partial of the store
   */
  function set(action: SetStoreAction<T>): void {
    const partial = typeof action === 'function' ? action(state) : action

    state = {
      ...state,
      ...partial,
    }
  }

  /**
   * Sets a single store value
   *
   * @param key - The store key to set
   * @param val - The store value to set
   */
  function setVal<K extends keyof T>(key: K, val: T[K]) {
    state[key] = val
  }

  return {
    get,
    set,
    setVal,
  }
}
