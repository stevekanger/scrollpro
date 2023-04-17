import {
  setScrollDeltas,
  setScrollToDeltas,
  getScrollDiff,
} from '../../Controller/functions'

let testScroll = {
  scrollX: 0,
  scrollY: 0,
  deltaX: 0,
  deltaY: 0,
  limitX: Infinity,
  limitY: Infinity,
  progressX: 0,
  progressY: 0,
}

beforeEach(() => {
  testScroll = {
    scrollX: 0,
    scrollY: 0,
    deltaX: 0,
    deltaY: 0,
    limitX: Infinity,
    limitY: Infinity,
    progressX: 0,
    progressY: 0,
  }
})

describe('Controller Functions', () => {
  it('SetScrollDeltas correctly sets the deltas', () => {
    expect(setScrollDeltas(200, 200, testScroll)).toEqual({
      scrollX: 0,
      scrollY: 0,
      deltaX: 200,
      deltaY: 200,
      limitX: Infinity,
      limitY: Infinity,
      progressX: 0,
      progressY: 0,
    })
  })

  it('SetScrollDeltas correctly handles negative number', () => {
    expect(setScrollDeltas(-200, 0, testScroll).deltaX).toBe(0)
    expect(setScrollDeltas(0, -200, testScroll).deltaY).toBe(0)
  })

  it('SetScrollDeltas correctly handles delta over the limit', () => {
    testScroll.limitX = 400
    expect(setScrollDeltas(600, 0, testScroll).deltaX).toBe(400)
    testScroll.limitY = 400
    expect(setScrollDeltas(0, 600, testScroll).deltaY).toBe(400)
  })

  it('SetScrollToDeltas correctly sets the scroll to the deltas', () => {
    testScroll.deltaX = 200
    testScroll.deltaY = 200
    expect(setScrollToDeltas(testScroll)).toEqual({
      scrollX: 200,
      scrollY: 200,
      deltaX: 200,
      deltaY: 200,
      limitX: Infinity,
      limitY: Infinity,
      progressX: 0,
      progressY: 0,
    })
  })

  it('SetScrollToDeltas correctly sets the scroll progress', () => {
    testScroll.limitX = 200
    testScroll.deltaX = 100
    expect(setScrollToDeltas(testScroll).progressX).toBe(0.5)
    testScroll.limitY = 200
    testScroll.deltaY = 100
    expect(setScrollToDeltas(testScroll).progressY).toBe(0.5)
  })

  it('GetScrollDiff correctly gets the scroll difference', () => {
    testScroll.scrollX = 100
    testScroll.deltaX = 200
    expect(getScrollDiff(testScroll).diffX).toBe(-100)
    testScroll.scrollY = 200
    testScroll.deltaY = 100
    expect(getScrollDiff(testScroll).diffY).toBe(100)
  })
})
