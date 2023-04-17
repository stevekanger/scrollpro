/**
 * @jest-environment jsdom
 */

import type { Bounds, IController, IObserver, ObserverEvent } from '../../types'
import { createTestElement } from '../testUtils'
import Controller from '../../Controller'

const ctl = new Controller()

const viewportElement = createTestElement({
  type: 'div',
  style: {
    border: '5px solid green',
  },
  rect: {
    top: 10,
    bottom: 100,
    left: 10,
    right: 10,
    width: 1000,
    height: 1000,
  },
})

ctl.createViewport({ element: viewportElement })

const bounds = {
  top: 2000,
  bottom: 0,
  left: 0,
  right: 0,
  height: 100,
  width: 100,
}

const element = createTestElement({
  type: 'div',
  rect: bounds,
})

let observerEvent = {
  progress: 0,
  inViewport: false,
} as ObserverEvent
function callback(e: ObserverEvent) {
  observerEvent = e
  console.log(e)
}

const obs = ctl.createObserver({
  element,
  callback,
  tween: {
    css: {
      transform: 'translateX({0, 100}px)',
    },
  },
}) as IObserver & {
  controller: IController
  bounds: Bounds
  start: number
  distance: number
}

describe('Observer class', () => {
  it('correctly initialized the observer', () => {
    expect(obs.controller.items.observer).toContain(obs)
  })

  it('correctly constructs the observer', () => {
    expect(obs.bounds).toEqual(bounds)
    expect(obs.start).toBe(995)
    expect(obs.distance).toBe(1090)
  })

  it('correctly updates the observer', () => {
    obs.controller.scroll.scrollY = 994
    obs.update()
    expect(observerEvent).toEqual({
      inViewport: false,
      progress: 0,
    })

    obs.controller.scroll.scrollY = 1540
    obs.update()
    expect(observerEvent).toEqual({
      inViewport: true,
      progress: 0.5,
    })

    obs.controller.scroll.scrollY = 2085
    obs.update()
    expect(observerEvent).toEqual({
      inViewport: false,
      progress: 1,
    })
  })

  it('correctly kills the observer', () => {
    obs.kill()
    expect(obs.controller.items.observer).not.toContain(obs)
  })
})
