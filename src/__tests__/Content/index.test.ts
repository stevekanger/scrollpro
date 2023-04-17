/**
 * @jest-environment jsdom
 */

import { IContent, IController } from '../../types'
import Controller from '../../Controller'
import { createTestElement } from '../testUtils'

const element = createTestElement({
  type: 'div',
  rect: {
    width: window.innerWidth * 2,
    height: window.innerHeight * 2,
  },
})

const ctl = new Controller()
const viewport = ctl.createViewport()
const content = ctl.createContent({ element }) as IContent & {
  controller: IController
  construct: () => void | any
}

beforeEach(() => {
  ctl.setLimit({ x: 0, y: 0 })
})

describe('Content class', () => {
  it('Correctly handles the construction of the content and sets the limit', () => {
    content.construct()
    expect(content.controller.scroll.limitX).toBe(window.innerWidth)
    expect(content.controller.scroll.limitY).toBe(window.innerHeight)
  })

  it('Correctly handles the init of the content and calls construct', () => {
    content.init()
    expect(content.controller.scroll.limitX).toBe(window.innerWidth)
    expect(content.controller.scroll.limitY).toBe(window.innerHeight)
  })

  it('Correctly handles the refresh of the content and calls construct', () => {
    content.refresh()
    expect(content.controller.scroll.limitX).toBe(window.innerWidth)
    expect(content.controller.scroll.limitY).toBe(window.innerHeight)
  })

  it('Correctly handles the update of the element and sets the transform', () => {
    ctl.setLimit({ x: 400, y: 400 })
    content.controller.scroll.scrollX = content.controller.scroll.deltaX = 200
    content.controller.scroll.scrollY = content.controller.scroll.deltaY = 200
    content.update()
    expect(element.style.transform).toBe('translate(-200px, -200px)')
  })

  it('Correctly kill the content and removes it from the controller', () => {
    content.kill()
    expect(content.controller.content).toBeNull()
  })
})
