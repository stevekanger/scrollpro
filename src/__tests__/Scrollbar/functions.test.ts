/**
 * @jest-environment jsdom
 */

import { createTestElement } from '../testUtils'
import { setStyles } from '../../Scrollbar/functions'

describe('Scrollbar functions', () => {
  it('setStyles correctly sets the styles to an element', () => {
    let track = createTestElement({ type: 'div' }) as HTMLDivElement
    let thumb = createTestElement({ type: 'span' })
    setStyles('vertical', track, thumb)

    expect(track.classList).toContain('track')
    expect(track.style.position).toBe('relative')
    expect(track.style.display).toBe('block')
    expect(track.style.width).toBe('100%')
    expect(track.style.height).toBe('100%')
    expect(track.style.overflow).toBe('hidden')

    expect(thumb.classList).toContain('bar')
    expect(thumb.style.display).toBe('block')
    expect(thumb.style.width).toBe('100%')
    expect(thumb.style.height).toBe('100%')
    expect(thumb.style.position).toBe('absolute')
    expect(thumb.style.right).toBe('0px')
    expect(thumb.style.bottom).toBe('100%')
    expect(thumb.style.pointerEvents).toBe('none')
  })
})
