/**
 * @jest-environment jsdom
 */

import type { IController, IViewport, Scroll } from '../../types'
import Controller from '../../Controller'
import { createTestElement } from '../testUtils'

const element = createTestElement({
  type: 'div',
  style: {
    position: 'fixed',
    top: '20px',
    bottom: '20px',
    left: '20px',
    right: '20px',
    border: '5px solid green',
  },
})

const ctl = new Controller()
const viewport = ctl.createViewport({ element }) as IViewport & {
  controller: IController
  onWheel: (e: WheelEvent) => void
  onPointerUp: (e: PointerEvent) => void
  onPointerDown: (e: PointerEvent) => void
  onPointerMove: (e: PointerEvent) => void
  onKeyDown: (e: KeyboardEvent) => void
  touchStart: {
    x: number
    y: number
  }
}

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

  viewport.touchStart = {
    x: 0,
    y: 0,
  }
})

describe('Viewport Class', () => {
  it('Correctly handles the scroll wheel event', () => {
    viewport.onWheel(new WheelEvent('wheel', { deltaX: 200, deltaY: 200 }))
    expect(ctl.scroll.deltaX).toBe(200)
    expect(ctl.scroll.deltaY).toBe(200)

    viewport.onWheel(new WheelEvent('wheel', { deltaX: -100, deltaY: -100 }))
    expect(ctl.scroll.deltaX).toBe(100)
    expect(ctl.scroll.deltaY).toBe(100)

    viewport.onWheel(new WheelEvent('wheel', { deltaX: -1000, deltaY: -1000 }))
    expect(ctl.scroll.deltaX).toBe(0)
    expect(ctl.scroll.deltaY).toBe(0)

    viewport.onWheel(new WheelEvent('wheel', { deltaX: 1000, deltaY: 0 }))
    expect(ctl.scroll.deltaX).toBe(1000)
    expect(ctl.scroll.deltaY).toBe(0)
  })

  it('Correctly handles the pointer down event', () => {
    const e = { pageX: 200, pageY: 200, pointerType: 'touch' } as PointerEvent
    viewport.onPointerDown(e)
    expect(viewport.touchStart.x).toBe(200)
    expect(viewport.touchStart.y).toBe(200)
  })

  it('Correctly handles the pointer move event', async () => {
    const { touchMult } = viewport.controller.options
    const e = { pageX: -200, pageY: -200, pointerType: 'touch' } as PointerEvent
    viewport.onPointerMove(e)
    expect(viewport.controller.scroll.deltaX).toBe(200 * touchMult)
    expect(viewport.controller.scroll.deltaY).toBe(200 * touchMult)
  })

  it('Correctly handles the keydown event', async () => {
    viewport.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    expect(viewport.controller.scroll.deltaY).toBe(120)
  })
})
