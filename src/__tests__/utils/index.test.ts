/**
 * @jest-environment jsdom
 */

import applyTween from '../../utils/applyTween'
import applyClasses from '../../utils/applyClasses'
import applyListeners from '../../utils/applyListeners'
import getBounds from '../../utils/getBounds'
import getComputedStyle from '../../utils/getComputedStyle'
import getOffsetTop from '../../utils/getOffsetTop'
import isElement from '../../utils/isElement'
import { createTestElement } from '../testUtils'

describe('Utility functions', () => {
  it('applyTween correctly applies the css to an element', () => {
    const element = createTestElement({ type: 'div' })
    const css = {
      transform: 'translate({0, 100}px, {0, 200}px)',
    }
    applyTween(element, 0.5, css)
    expect(element.style.transform).toBe('translate(50px, 100px)')
    css.transform = 'skew({0, 400})'
    applyTween(element, 0.25, css)
    expect(element.style.transform).toBe('skew(100)')
  })

  it('applyClasses properly applies the classes to the element', () => {
    const element = createTestElement({ type: 'div' })
    applyClasses(element, 0)
    expect(element.classList).toContain('belowViewport')
    applyClasses(element, 0.5)
    expect(element.classList).toContain('inViewport')
    applyClasses(element, 1)
    expect(element.classList).toContain('aboveViewport')
  })

  it('applylisteners correctly adds/removes a listener', () => {
    let n: number = 69
    let fn = () => (n += 351)
    const element = window
    const condition = true
    applyListeners('add', [{ event: 'click', fn, element, condition }])
    document.body.click()
    expect(n).toBe(420)
    applyListeners('remove', [{ event: 'click', fn, element, condition }])
    document.body.click()
    expect(n).toBe(420)
  })

  it('getBounds correctly returns the bounds of an element', () => {
    const element = createTestElement({
      type: 'div',
      rect: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        width: 10,
        height: 10,
      },
    })
    expect(getBounds(element)).toEqual({
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
      width: 10,
      height: 10,
    })
  })

  it('isElement correctly identifies an element', () => {
    const divElement = createTestElement({ type: 'div' })
    const spanElement = createTestElement({ type: 'span' })
    const notElement = {} as HTMLElement
    expect(isElement(divElement)).toBe(true)
    expect(isElement(spanElement)).toBe(true)
    expect(isElement(notElement)).toBe(false)
  })

  it('getComputedStyle correctly returns the compouted styles', () => {
    const element = createTestElement({
      type: 'div',
      style: {
        border: '10px solid green',
        margin: '10px',
        padding: '10px',
      },
    })
    const expected = {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
      totals: {
        vertical: 20,
        horizontal: 20,
      },
    }
    const notElement = {} as HTMLElement
    expect(getComputedStyle(element, 'padding')).toEqual(expected)
    expect(getComputedStyle(element, 'padding')).toEqual(expected)
    expect(getComputedStyle(element, 'padding')).toEqual(expected)
    expect(getComputedStyle(notElement, 'padding')).toEqual({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      totals: {
        vertical: 0,
        horizontal: 0,
      },
    })
  })

  it('getOffsetTop correctly gets the offset from the top', () => {
    expect(getOffsetTop(200, 100, 0)).toBe(100)
    expect(getOffsetTop(-100, 100, 300)).toBe(100)
  })
})
