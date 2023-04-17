/**
 * @jest-environment jsdom
 */

import { getViewableBounds, getDeltaFromKey } from '../../Viewport/functions'
import { Bounds } from '../../types'
import { createTestElement } from '../testUtils'

let bounds: Bounds = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  width: 0,
  height: 0,
}

beforeEach(() => {
  bounds = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
  }
})

const keyStep = 120
let limitY = 600
const keys: { [key: string]: [string, number] } = {
  ArrowLeft: ['x', -120],
  ArrowUp: ['y', 120],
  ArrowRight: ['x', 120],
  ArrowDown: ['y', -120],
  PageUp: ['y', window.innerHeight],
  PageDown: ['y', -window.innerHeight],
  Home: ['y', 0],
  End: ['y', limitY],
  a: ['y', 0],
  b: ['x', 0],
}

describe('Viewport Functions', () => {
  it('GetViewableBounds correctly sets the viewable area of the viewport', () => {
    bounds.width = 50
    bounds.height = 50
    const element = createTestElement({
      type: 'div',
      style: {
        borderLeftWidth: '10px',
        borderRightWidth: '5px',
        borderTopWidth: '20px',
        borderBottomWidth: '5px',
      },
    })

    expect(getViewableBounds(bounds, element)).toEqual({
      top: 20,
      bottom: 5,
      left: 10,
      right: 5,
      width: 35,
      height: 25,
    })
  })

  Object.keys(keys).forEach((key) => {
    it(`GetDeltaFromKey for ${key} correctly sets the delta`, () => {
      const e = new KeyboardEvent('keydown', { key })
      const [delta, value] = keys[key]
      expect(getDeltaFromKey(e, limitY, keyStep)[delta as 'x' | 'y']).toBe(
        value
      )
    })
  })

  it('GetDeltaFromKey for key Space+Shift correctly sets the delta', () => {
    let e = new KeyboardEvent('keydown', { key: 'Space', shiftKey: true })
    expect(getDeltaFromKey(e, limitY, keyStep).y).toBe(-window.innerHeight)
    e = new KeyboardEvent('keydown', { key: 'Space' })
    expect(getDeltaFromKey(e, limitY, keyStep).y).toBe(window.innerHeight)
  })
})
