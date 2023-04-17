function getOffsetTop(elTop: number, viewportTop: number, scrollY: number) {
  return elTop + scrollY - viewportTop
}

export default getOffsetTop
