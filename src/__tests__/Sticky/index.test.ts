/**
 * @jest-environment jsdom
 */

import { createTestElement } from '../testUtils'
import Controller from '../../Controller'
import { IController, ISticky } from '../../types'

// Again just copied the rect from the testing site into this element. Hack Hack //\\
const element = createTestElement({
  type: 'div',
  rect: {
    bottom: 4162.25,
    height: 200,
    left: 503,
    right: 1417,
    top: 3962.25,
    width: 914,
  },
  append: true,
})

const ctl = new Controller()
ctl.createViewport()
const sticky = ctl.createSticky({ element }) as ISticky & {
  controller: IController
  element: HTMLElement
}

describe('Sticky class', () => {
  it('Correctly initiates the sticky element', () => {
    expect(sticky.element).toEqual(element)
    expect(sticky.controller['items'].sticky).toContain(sticky)
  })

  it('Correctly updates the sticky position', () => {
    sticky.controller.scroll.scrollY = 4000
    expect(element.style.transform).toBe('translateY(-200px)')
  })

  it('Correctly kills the sticky element', () => {
    sticky.kill()
    expect(sticky.controller['items'].sticky).not.toContain(sticky)
  })
})
