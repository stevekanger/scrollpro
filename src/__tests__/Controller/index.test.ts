/**
 * @jest-environment jsdom
 */

import Controller from '../../Controller'
import { createTestElement, waitForScroll } from '../testUtils'

const ctl = new Controller()

beforeEach(() => {
  ctl.scroll = {
    scrollX: 0,
    scrollY: 0,
    deltaX: 0,
    deltaY: 0,
    limitX: Infinity,
    limitY: Infinity,
    progressX: 0,
    progressY: 0,
  }
})

describe('Controller class', () => {
  it('Correctly handles scrollTo setting deltas', () => {
    ctl.scrollTo({ x: 200, y: 200 })
    expect(ctl.scroll.deltaX).toBe(200)
    expect(ctl.scroll.deltaY).toBe(200)
  })

  it('Correctly handles scrollTo lerping to scroll values', async () => {
    ctl.scrollTo({ x: 200, y: 200 })
    await waitForScroll(ctl)
    expect(ctl.scroll.scrollX).toBe(200)
    expect(ctl.scroll.scrollY).toBe(200)
  })

  it('Correctly handles scroll over limit.', () => {
    ctl.scroll.limitX = 200
    ctl.scroll.limitY = 200
    ctl.scrollTo({ x: 600, y: 600 })
    expect(ctl.scroll.deltaX).toBe(200)
    expect(ctl.scroll.deltaY).toBe(200)
  })

  it('Correctly handles scroll under limit', () => {
    ctl.scrollTo({ x: -200, y: -200 })
    expect(ctl.scroll.scrollY).toBe(0)
    expect(ctl.scroll.scrollX).toBe(0)
  })

  it('Correctly handles setting scroll progress', async () => {
    ctl.scroll.limitX = 800
    ctl.scroll.limitY = 800
    ctl.scrollTo({ x: 400, y: 400 })
    await waitForScroll(ctl)
    expect(ctl.scroll).toEqual({
      scrollX: 400,
      scrollY: 400,
      deltaX: 400,
      deltaY: 400,
      limitX: 800,
      limitY: 800,
      progressX: 0.5,
      progressY: 0.5,
    })
  })

  it('Correctly handles setting the limit', () => {
    ctl.setLimit({ x: 200, y: 200 })
    expect(ctl.scroll.limitX).toBe(200)
    expect(ctl.scroll.limitY).toBe(200)
  })

  it('Correctly adds/removes a listener properly', () => {
    const listener = () => {}
    ctl.on('update', listener)
    expect(ctl['listeners'].update).toContain(listener)
    ctl.off('update', listener)
    expect(ctl['listeners'].update).not.toContain(listener)
  })

  it('Correctly fires a listener', () => {
    let n = 69
    const listener = () => (n = 420)
    ctl.on('refresh', listener)
    ctl.fire('refresh')
    expect(n).toBe(420)
  })

  it('Correctly creates a Viewport', () => {
    const viewport = ctl.createViewport()
    expect(ctl.viewport).toEqual(viewport)
    expect(() => ctl.createViewport()).toThrow(
      'You already have viewport initialized for this controller. Please kill the previous viewport before initializing another content instance.'
    )
  })

  it('Correctly creates Content', () => {
    const element = createTestElement({ type: 'div', append: true })
    const content = ctl.createContent({ element })
    expect(ctl.content).toEqual(content)
    expect(() => ctl.createContent({ element })).toThrow(
      'You already have content initialized for this controller. Please kill the previous content before initializing another content instance.'
    )
  })

  it('Correctly creates a Scrollbar', () => {
    const element = createTestElement({ type: 'div', append: true })
    const scrollbar = ctl.createScrollbar({ element })
    expect(ctl['items'].scrollbar).toContain(scrollbar)
  })

  it('Correctly creates an Observer', () => {
    const element = createTestElement({ type: 'div', append: true })
    const observer = ctl.createObserver({ element })
    expect(ctl['items'].observer).toContain(observer)
  })

  it('Correctly creates a Sticky', () => {
    const element = createTestElement({ type: 'div', append: true })
    const sticky = ctl.createSticky({ element })
    expect(ctl['items'].sticky).toContain(sticky)
  })
})
