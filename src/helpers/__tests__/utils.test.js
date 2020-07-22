const { adder, HelloLBHer } = require('../utils')

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
