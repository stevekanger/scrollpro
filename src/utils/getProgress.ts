/**
 * Gets the progress of an element moving through the scene
 *
 * @param from - The elements starting position
 * @param end - The elements ending position
 * @param current - The elements current position
 */
export default function getProgress(
  start: number,
  end: number,
  current: number
) {
  const progress = Math.min(1, Math.max(0, (current - start) / (end - start)))

  return progress ? progress : 0
}
