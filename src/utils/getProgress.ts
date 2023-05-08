function getProgress(start: number, distance: number, scrollY: number) {
  const progress = Math.min(1, Math.max(0, (scrollY - start) / distance))
  return isNaN(progress) ? 0 : progress
}

export default getProgress
