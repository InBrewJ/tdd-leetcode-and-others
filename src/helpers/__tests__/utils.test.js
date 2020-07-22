const { adder, HelloLBHer, maxArea } = require('../utils')

describe('Adder', () => {
  test('it should add things properly', () => {
    expect(adder(1, 2)).toEqual(3)
  })
})

describe('HelloLBHer', () => {
  test('it should say hi', () => {
    expect(HelloLBHer()).toEqual('Hey, LBH')
  })
})

describe.only('"Container With Most Water" from LeetCode', () => {
  test.only('[1, 8, 6, 2, 5, 4, 8, 3, 7] should return 49', () => {
    const heights = [1, 8, 6, 2, 5, 4, 8, 3, 7]
    expect(maxArea(heights)).toEqual(49)
  })

  test('Seven ones should return 6', () => {
    const heights = [1, 1, 1, 1, 1, 1, 1]
    expect(maxArea(heights)).toEqual(6)
  })

  test('[1,1,3,4,2,1,4] should return 16', () => {
    const heights = [1, 1, 3, 4, 2, 1, 4]
    expect(maxArea(heights)).toEqual(16)
  })

  test('[4,2,1,1,3,3,3] should return 18', () => {
    const heights = [4, 2, 1, 1, 3, 3, 3]
    expect(maxArea(heights)).toEqual(18)
  })

  test('[1,1,16,16,1] should return 16', () => {
    const heights = [1, 1, 16, 16, 1]
    expect(maxArea(heights)).toEqual(16)
  })

  test.only('[1,2,1] should return 2', () => {
    const heights = [1, 2, 1]
    expect(maxArea(heights)).toEqual(2)
  })
})
