import type { ElementBounds, Viewport } from '@/types'
import getElementBounds from './getElementBounds'

export default function getViewportBounds(viewport: Viewport): ElementBounds {
  if (viewport instanceof HTMLElement) {
    return getElementBounds(viewport)
  }

  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  }
}
