import isElement from './isElement'

function getComputedStyle(
  element: HTMLElement | Window | undefined,
  value: 'margin' | 'padding' | 'border'
) {
  let styles = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    totals: {
      vertical: 0,
      horizontal: 0,
    },
  }

  if (!isElement(element)) return styles

  const computed = window.getComputedStyle(element as HTMLElement)

  if (!computed) {
    return styles
  }

  styles.top = parseFloat(computed[`${value}Top`])
  styles.bottom = parseFloat(computed[`${value}Bottom`])
  styles.left = parseFloat(computed[`${value}Left`])
  styles.right = parseFloat(computed[`${value}Right`])
  styles.totals.vertical = styles.top + styles.bottom
  styles.totals.horizontal = styles.left + styles.right

  return styles
}

export default getComputedStyle
