const request = require('supertest')
const app = require('../../app')
const { v4: uuidv4 } = require('uuid')
const sequelize = require('sequelize')
const db = require('../../server/models')

// to close the db connection properly
afterAll(() => {
  db.sequelize.close()
})

// No relational linking (for now) because we may want to set alerts
// BEFORE the sensor is live

describe('/alert path PUT sanity checks', () => {
  test('It should respond with a 204 if an alert packet is valid and has been saved successfully', async () => {
    const _sensorId = uuidv4()
    const packet = {
      sensorId: _sensorId,
      method: 'email',
      destination: 'jason.brewer101@gmail.com'
    }
    const response = await request(app).put('/alert').send(packet)

    expect(response.statusCode).toBe(204)
  })
})
