const regex = /\{(.*?)\}/g

function replaceString(progress: number) {
  return function (string: string) {
    const s = string.slice(1, -1)
    const vals = s.split(',')

    if (vals.length === 2) {
      const from = Number(vals[0])
      const to = Number(vals[1])
      const val = (to - from) * progress + from

      if (isNaN(val)) {
        console.log(
          `You have a css parse error. ${string} has an invalid number`
        )
        return string
      }

      return val.toString()
    }

    console.log(
      `You have a css parse error. ${string} is required to have a to and from value.`
    )

    return string
  }
}

function applyTween(
  element: HTMLElement,
  progress: number,
  css: {
    [key: string]: string
  }
) {
  if (!css) return

  Object.keys(css).forEach((key: string) => {
    const string = css[key]
    const replaced = string.replace(regex, replaceString(progress))

    if (!element) return

    element.style[key as any] = replaced
  })
}

export default applyTween
