function getProgress(start: number, distance: number, scrollY: number) {
  const progress = Math.min(1, Math.max(0, (scrollY - start) / distance))
  return progress ? progress : 0
}

export default getProgress
