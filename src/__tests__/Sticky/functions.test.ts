/**
 * @jest-environment jsdom
 */

import type { Bounds, IViewport, StickyOptions } from '../../types'
import { getStart, getDistance } from '../../Sticky/functions'
import { createTestElement } from '../testUtils'

// I just copied the bounding rects from the browser testing app into these tests - hacky?
const element = createTestElement({
  type: 'div',
  append: true,
  rect: {
    bottom: 210,
    height: 200,
    left: 10,
    right: 1910,
    top: 10,
    width: 1900,
  },
})

const parentElement = createTestElement({
  type: 'div',
  rect: {
    bottom: 1930,
    height: 1920,
    left: 10,
    right: 1910,
    top: 10,
    width: 1900,
  },
})

parentElement.append(element)

const options: StickyOptions = {
  top: 0,
  bottom: 0,
  start: undefined,
  distance: undefined,
  ignoreBounds: false,
}

const viewport = {
  bounds: {
    bottom: 955,
    height: 945,
    left: 10,
    right: 1910,
    top: 10,
    width: 1900,
    viewable: {
      bottom: 955,
      height: 945,
      left: 10,
      right: 1910,
      top: 10,
      width: 1900,
    },
  },
  refresh: () => {},
  init: () => {},
  kill: () => {},
  getBounds: function () {
    return this.bounds
  },
} as IViewport & { bounds: Bounds & { viewable: Bounds } }

describe('Sticky functions', () => {
  it('getStart correctly return the start position', () => {
    let bounds = element.getBoundingClientRect() as Bounds
    expect(getStart(0, viewport, options, bounds)).toBe(0)
    bounds.top = 940
    expect(getStart(0, viewport, options, bounds)).toBe(930)
    expect(getStart(200, viewport, options, bounds)).toBe(1130)
    bounds.top = 1870
    expect(getStart(0, viewport, options, bounds)).toBe(1860)
    expect(getStart(400, viewport, options, bounds)).toBe(2260)
  })

  it('getDistance correctly returns the distance travel', () => {
    let bounds = element.getBoundingClientRect() as Bounds
    expect(getDistance(element, options, bounds)).toBe(1720)
    bounds.top = 3850
    expect(getDistance(element, options, bounds)).toBe(1720)
  })
})
