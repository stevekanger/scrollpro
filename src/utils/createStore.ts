import type {
  SetStoreAction,
  AccessStore,
  SetStoreActionFunction,
  Store,
} from '../types'

/**
 * Creates a data store
 *
 * @param initialState - An object with the initial store state
 */
export default function createStore<T extends object>(
  initialState: T
): AccessStore<T> {
  const store: [T, typeof set] = [{ ...initialState }, set]

  /**
   * Sets properties to the store
   *
   * @param action - Either a partial of the store or a function that returns a partial of the store
   */
  function set(action: SetStoreAction<T>): void {
    const partial =
      typeof action === 'function'
        ? (action as SetStoreActionFunction<T>)(store[0])
        : action

    Object.assign(store[0], partial)
  }

  /**
   * Function that r
   */
  return function accessStore(): Store<T> {
    return store
  }
}
