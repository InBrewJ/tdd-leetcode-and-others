const { requestToFilter } = require('../requestParser')
const { v4: uuidv4 } = require('uuid')

describe('Request parser', () => {
  test('Should support sensorId', () => {
    const id = uuidv4()
    const inputReq = {
      query: {
        sensorId: id
      }
    }
    expect(requestToFilter(inputReq)).toEqual({
      where: {
        sensorId: id
      }
    })
  })
})
