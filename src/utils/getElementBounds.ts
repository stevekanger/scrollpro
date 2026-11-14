import type { ElementBounds } from '@/types'
import isHtmlElement from './isElement'

const defaultBounds: ElementBounds = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
}

/**
 * Gets the element bounds
 *
 * @param el - The html element to get bounds for
 */
export default function getElementBounds(el: HTMLElement): ElementBounds {
  if (!isHtmlElement(el)) {
    return { ...defaultBounds }
  }

  const rect = el.getBoundingClientRect()

  return {
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    width: rect.width,
    height: rect.height,
  }
}
