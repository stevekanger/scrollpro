/**
 * Linear interpolation function
 *
 * @param start - The starting value
 * @param end - The ending value
 * @param ease - The easing value from 0 - 1
 */
export function lerp(start: number, end: number, ease: number) {
  return (1 - ease) * start + ease * end
}
