/**
 * @jest-environment jsdom
 */

import type { Bounds, IViewport, ObserverOptions } from '../../types'
import {
  getDistance,
  getInInitialView,
  getStart,
} from '../../Observer/functions'

describe('Observer functions', () => {
  it('getStart correctly returns the start', () => {
    const options = { start: 50, offsetStart: 0 } as ObserverOptions
    const viewportBounds = { viewable: { height: 400 } }
    const viewport = {
      getBounds: () => viewportBounds,
    } as IViewport

    expect(getStart(2000, false, options, viewport)).toBe(50)
    options.start = undefined
    expect(getStart(300, true, options, viewport)).toBe(0)
    expect(getStart(600, false, options, viewport)).toBe(200)
  })

  it('getDistance correctly returns the distance', () => {
    const options = {
      distance: 50,
      offsetStart: 0,
      offsetEnd: 0,
      normalizeInitialView: false,
    } as ObserverOptions
    const bounds = { height: 400 } as Bounds
    const viewportBounds = { viewable: { height: 400 } }
    const viewport = {
      getBounds: () => viewportBounds,
    } as IViewport

    expect(getDistance(2000, false, options, viewport, bounds)).toBe(50)
    options.distance = undefined
    expect(getDistance(200, true, options, viewport, bounds)).toBe(600)
    options.normalizeInitialView = true
    expect(getDistance(200, true, options, viewport, bounds)).toBe(800)
    options.normalizeInitialView = false
    expect(getDistance(600, false, options, viewport, bounds)).toBe(800)
    viewportBounds.viewable.height = 800
    bounds.height = 600
    expect(getDistance(600, false, options, viewport, bounds)).toBe(1400)
  })

  it('getInInitialView correctly returns if it is in the initial view', () => {
    const viewBounds = { height: 600 } as Bounds
    expect(getInInitialView(200, viewBounds)).toBe(true)
    expect(getInInitialView(600, viewBounds)).toBe(false)
    expect(getInInitialView(599, viewBounds)).toBe(true)
  })
})
