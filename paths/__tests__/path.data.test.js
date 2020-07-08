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
  test('It should respond with a 400 if there is no sensorId field', async () => {
    const packet = {
      time: 1,
      value: 23.23
    }
    const response = await request(app).put('/data').send(packet)

    expect(response.statusCode).toBe(400)
  })

  test('It should respond with a 400 if there is no time field', async () => {
    const packet = {
      sensorId: uuidv4(),
      value: 23.23
    }
    const response = await request(app).put('/data').send(packet)

    expect(response.statusCode).toBe(400)
  })

  test('It should respond with a 204 if the packet structure is valid and the data was saved successfully', async () => {
    const packet = {
      sensorId: uuidv4(),
      time: 1,
      value: 23.23
    }
    const response = await request(app).put('/data').send(packet)

    expect(response.statusCode).toBe(204)
  })

  test('It should respond with a 409 (sensorId, time) pairing is not unique', async () => {
    const packet = {
      sensorId: 'c32f46e8-1802-4787-8109-d31fce0989d7',
      time: 1,
      value: 23.23
    }
    const firstResponse = await request(app).put('/data').send(packet)
    const duplicateResponse = await request(app).put('/data').send(packet)

    expect(duplicateResponse.statusCode).toBe(409)
  })
})
