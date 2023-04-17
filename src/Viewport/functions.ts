import type { Bounds } from '../types'
import getComputedStyle from '../utils/getComputedStyle'

export function getViewableBounds(
  bounds: Bounds,
  element: HTMLElement | Window
) {
  const borders = getComputedStyle(element, 'border')
  return {
    top: bounds.top + borders.top,
    bottom: bounds.bottom + borders.bottom,
    left: bounds.left + borders.left,
    right: bounds.right + borders.right,
    width: bounds.width - (borders.left + borders.right),
    height: bounds.height - (borders.top + borders.bottom),
  }
}

export function getDeltaFromKey(
  e: KeyboardEvent,
  limitY: number,
  keyStep: number
) {
  let x = 0
  let y = 0

  switch (e.key) {
    case 'ArrowLeft':
      x = -keyStep
      break
    case 'ArrowUp':
      y = keyStep
      break
    case 'ArrowRight':
      x = keyStep
      break
    case 'ArrowDown':
      y = -keyStep
      break
    case 'PageUp':
      y += window.innerHeight
      break
    case 'PageDown':
      y -= window.innerHeight
      break
    case 'Home':
      y = 0
      break
    case 'End':
      y = limitY || 0
      break
    case 'Space':
      if (
        !(document.activeElement instanceof HTMLInputElement) &&
        !(document.activeElement instanceof HTMLTextAreaElement)
      ) {
        if (e.shiftKey) {
          y -= window.innerHeight
        } else {
          y += window.innerHeight
        }
      }
      break
    default:
      return { x, y }
  }

  return { x, y }
}
