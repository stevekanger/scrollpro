function getProgress(start: number, distance: number, scrollY: number) {
  return Math.min(1, Math.max(0, (scrollY - start) / distance))
}

export default getProgress
