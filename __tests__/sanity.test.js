const { TestScheduler } = require("jest")
const { ExpectationFailed } = require("http-errors")

describe("Jest sanity", () => {
  test("2 + 2 != 5", () => {
      expect(2 + 2).not.toBe(5);
  })  
})