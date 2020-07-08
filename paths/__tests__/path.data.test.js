const request = require('supertest')
const app = require('../../app')
const { v4: uuidv4 } = require('uuid')

// ideal packet:
// {
//   sensorId: uuidv4(),
//   time: 0,
//   value: 23.23
// }

describe('Data path sanity checks', () => {
  test('It should respond with a 400 error if there is no sensorId field', async () => {
    const packet = {
      time: 0,
      value: 23.23
    }
    const response = await request(app).put('/data').send(packet)

    expect(response.statusCode).toBe(400)
  })

  test('It should respond with a 400 error if there is no time field', async () => {
    const packet = {
      sensorId: uuidv4(),
      value: 23.23
    }
    const response = await request(app).put('/data').send(packet)

    expect(response.statusCode).toBe(400)
  })
})
