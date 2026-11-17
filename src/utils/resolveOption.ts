import type { ResolvableOption } from '@/types'

/**
 * Resolves an option that can be an optional function that returns the option
 *
 * @param option - The value to resolve
 */
export default function resolveOption<T>(option: ResolvableOption<T>): T {
  if (typeof option === 'function') {
    return (option as () => T)()
  }

  return option
}
