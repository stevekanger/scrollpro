/**
 * @jest-environment jsdom
 */

import Controller from '../../Controller'
import { Bounds, IController, IScrollbar, ScrollbarOptions } from '../../types'
import { createTestElement } from '../testUtils'

const bounds = {
  top: 10,
  bottom: 10,
  right: 10,
  left: window.innerWidth - 20,
  width: 10,
  height: window.innerHeight - 20,
}

const element = createTestElement({
  type: 'div',
  rect: bounds,
})

const ctl = new Controller()
ctl.createViewport()
const scrollbar = ctl.createScrollbar({ element }) as IScrollbar & {
  controller: IController
  track: HTMLElement
  thumb: HTMLElement
  element: HTMLElement
  bounds: Bounds
  options: ScrollbarOptions
  onPointerMove: (e: PointerEvent) => void
  onWheel: (e: WheelEvent) => void
}

beforeEach(() => {
  scrollbar.controller.scroll.deltaY = 0
  scrollbar.controller.scroll.limitY = 600
})

describe('Scrollbar class', () => {
  it('Correctly initialized the scrollbar', () => {
    expect(scrollbar.element).toEqual(element)
    expect(scrollbar.controller['items'].scrollbar).toContain(scrollbar)
    expect(scrollbar.element.children).toContain(scrollbar.track)
    expect(scrollbar.element.children[0].children).toContain(scrollbar.thumb)
    let e = new WheelEvent('wheel', { deltaY: 200 })
    window.dispatchEvent(e)
    expect(scrollbar.controller.scroll.deltaY).toBe(200)
  })

  it('Correctly handles the pointer move', () => {
    const e = { pageY: 200, stopPropagation: () => {} } as PointerEvent
    scrollbar.bounds.height = 600
    scrollbar.onPointerMove(e)
    expect(scrollbar.controller.scroll.deltaY).toBe(200)
  })

  it('Correctly handles the scroll wheel event', () => {
    scrollbar.onWheel(new WheelEvent('wheel', { deltaX: 200, deltaY: 200 }))
    expect(ctl.scroll.deltaX).toBe(200)
    expect(ctl.scroll.deltaY).toBe(200)
  })

  it('Correctly sets the options', () => {
    scrollbar.setOptions({
      axis: 'x',
      useEasing: true,
    })
    expect(scrollbar.options).toEqual({
      axis: 'x',
      useEasing: true,
      orientation: 'vertical',
    })
  })

  it('Correctly kills the scrollbar', () => {
    scrollbar.kill()
    expect(scrollbar.controller['items'].scrollbar).not.toContain(scrollbar)
    expect(scrollbar.element.children).not.toContain(scrollbar.track)
  })
})
