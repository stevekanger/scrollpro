import type { ContentArgs, IContent, IController } from '../types'
import getBounds from '../utils/getBounds'

class Content implements IContent {
  private controller: IController
  private element: HTMLElement

  constructor(controller: IController, { element }: ContentArgs) {
    this.controller = controller
    this.element = element
    this.init()
  }

  private construct() {
    const { viewport } = this.controller
    if (!viewport) return

    const bounds = getBounds(this.element)
    const viewportBounds = viewport.getBounds().viewable
    const x = bounds.width - viewportBounds.width
    const y = bounds.height - viewportBounds.height

    this.controller.setLimit({ x, y })
  }

  init() {
    this.construct()
  }

  kill() {
    this.controller.content = null
  }

  refresh() {
    this.construct()
  }

  update() {
    const { scrollX, scrollY } = this.controller.scroll
    this.element.style.transform = `translate(${-scrollX}px, ${-scrollY}px)`
  }
}

export default Content
