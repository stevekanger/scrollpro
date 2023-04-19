type Listeners = {
  element: any
  event: string
  fn: (...args: any) => void
  condition: boolean
  options?: {
    [key: string]: any
  }
}[]

function applyListeners(type: 'add' | 'remove', listeners: Listeners) {
  listeners.forEach((listener) => {
    if (!listener.condition) return

    if (type === 'add') {
      listener.element.addEventListener(
        listener.event,
        listener.fn,
        listener.options || {}
      )
      return
    }

    listener.element.removeEventListener(
      listener.event,
      listener.fn,
      listener.options || {}
    )
  })
}

export default applyListeners
