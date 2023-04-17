import isElement from './isElement'

function getBounds(element: HTMLElement | Window) {
  let bounds = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
  }

  if (element === window) {
    bounds.width = window.innerWidth
    bounds.height = window.innerHeight
    return bounds
  }

  if (!isElement(element)) {
    return bounds
  }

  const rect = (element as HTMLElement).getBoundingClientRect()
  bounds.top = rect.top
  bounds.bottom = rect.bottom
  bounds.left = rect.left
  bounds.right = rect.right
  bounds.width = rect.width
  bounds.height = rect.height

  return bounds
}

export default getBounds
