const { requestToFilter } = require('../requestParser')
const { v4: uuidv4 } = require('uuid')
const { Op } = require('sequelize')

describe('Request parser', () => {
  test('Should support (sensorId)', () => {
    const _sensorId = uuidv4()
    const inputReq = {
      query: {
        sensorId: _sensorId
      }
    }
    expect(requestToFilter(inputReq)).toEqual({
      where: {
        sensorId: _sensorId
      }
    })
  })

  test('Should support (since)', () => {
    const _since = 123
    const inputReq = {
      query: {
        since: _since
      }
    }
    expect(requestToFilter(inputReq)).toEqual({
      where: {
        time: {
          [Op.gte]: _since
        }
      }
    })
  })

  test('Should support (until)', () => {
    const _until = 123
    const inputReq = {
      query: {
        until: _until
      }
    }
    expect(requestToFilter(inputReq)).toEqual({
      where: {
        time: {
          [Op.lte]: _until
        }
      }
    })
  })

  test('Should support [sensorId & since & until]', () => {
    const _sensorId = uuidv4()
    const _since = 0
    const _until = 100

    const inputReq = {
      query: {
        sensorId: _sensorId,
        since: _since,
        until: _until
      }
    }

    expect(requestToFilter(inputReq)).toEqual({
      where: {
        [Op.and]: [
          {
            sensorId: _sensorId
          },
          {
            time: {
              [Op.gte]: _since
            }
          },
          {
            time: {
              [Op.lte]: _until
            }
          }
        ]
      }
    })
  })
})
