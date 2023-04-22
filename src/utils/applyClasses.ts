function applyClasses(element: HTMLElement, progress: number) {
  if (progress === 0) {
    if (element.classList.contains('belowViewport')) return
    element.classList.add('belowViewport')
    element.classList.remove('aboveViewport', 'inViewport')
  } else if (progress === 1) {
    if (element.classList.contains('aboveViewport')) return
    element.classList.add('aboveViewport')
    element.classList.remove('belowViewport', 'inViewport')
  } else {
    if (element.classList.contains('inViewport')) return
    element.classList.add('inViewport')
    element.classList.remove('belowViewport', 'aboveViewport')
  }
}

export default applyClasses
