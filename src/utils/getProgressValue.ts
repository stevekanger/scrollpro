/**
 * Gets a value based on progress
 *
 * @param progress - The current progress (0 - 1)
 * @param from - The starting value
 * @param to - The ending value
 */
export default function getProgressValue(
  progress: number,
  from: number,
  to: number
) {
  return (to - from) * progress + from
}
