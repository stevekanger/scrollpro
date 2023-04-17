import type { IController } from '../types'

type CSS = {
  [key: string]: string
}

export const waitForScroll = (controller: IController) => {
  let start: number = Date.now()
  let timer: ReturnType<typeof setInterval> | null = null
  return new Promise((resolve, reject) => {
    timer = setInterval(() => {
      if (Date.now() - start > 3000) {
        clearInterval(timer as ReturnType<typeof setInterval>)
        reject()
      }
      if (
        controller.scroll.scrollX === controller.scroll.deltaX &&
        controller.scroll.scrollY === controller.scroll.deltaY
      ) {
        resolve(true)
      }
    }, 200)
  })
}

function createDomRect(props: Partial<DOMRect>) {
  return {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: function () {},
    ...props,
  }
}

export function createTestElement({
  type,
  style = {},
  rect,
  append,
}: {
  type: string
  style?: CSS
  rect?: Partial<DOMRect>
  append?: boolean
}) {
  const element = document.createElement(type)
  Object.entries(style).forEach(([key, value]) => {
    element.style[key as any] = value
  })
  if (rect) element.getBoundingClientRect = jest.fn(() => createDomRect(rect))
  if (append) document.body.append(element)

  return element
}
