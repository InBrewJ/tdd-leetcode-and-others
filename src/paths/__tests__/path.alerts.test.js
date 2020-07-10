const request = require('supertest')
const app = require('../../app')
const { v4: uuidv4 } = require('uuid')
const sequelize = require('sequelize')
const db = require('../../server/models')

const generatePacketWithTime = (uuid, time, value) => {
  return {
    sensorId: uuid,
    time: +time,
    value
  }
}

// to close the db connection properly
afterAll(() => {
  db.sequelize.close()
})

// No enforced relational linking (for now) between events + alerts
// because we may want to set alerts BEFORE the sensor has sent its first event

describe('/alert path PUT sanity checks', () => {
  test('It should respond with a 204 if an alert packet is valid and has been saved successfully', async () => {
    const _sensorId = uuidv4()
    const packet = {
      sensorId: _sensorId,
      method: 'email',
      alertHigh: 100,
      alertLow: 0,
      destination: 'jason.brewer101@gmail.com'
    }
    const response = await request(app).put('/alerts').send(packet)

    expect(response.statusCode).toBe(204)
  })

  test('It should respond with a 409 for two alerts on the same sensorId', async () => {
    const _sensorId = uuidv4()
    const packet = {
      sensorId: _sensorId,
      method: 'email',
      destination: 'jason.brewer101@gmail.com'
    }
    await request(app).put('/alerts').send(packet)
    const response = await request(app).put('/alerts').send(packet)

    expect(response.statusCode).toBe(409)
  })

  test('Can set alert THEN send packet', async () => {
    const _sensorId = uuidv4()
    const packet = {
      sensorId: _sensorId,
      alertHigh: 50,
      method: 'email',
      destination: 'jason.brewer101@gmail.com'
    }
    await request(app).put('/alerts').send(packet)
    const dataRes = await request(app)
      .put('/data')
      .send(generatePacketWithTime(_sensorId, 10, 55))

    expect(dataRes.statusCode).toBe(204)
  })

  test('Can send packet THEN set alert', async () => {
    const _sensorId = uuidv4()
    const packet = {
      sensorId: _sensorId,
      alertHigh: 50,
      method: 'email',
      destination: 'jason.brewer101@gmail.com'
    }

    await request(app)
      .put('/data')
      .send(generatePacketWithTime(_sensorId, 10, 55))
    const alertRes = await request(app).put('/alerts').send(packet)

    expect(alertRes.statusCode).toBe(204)
  })
})

describe('/alert path GET sanity checks', () => {
  test('It should respond with a 204 if an alert packet is valid and has been saved successfully', async () => {
    const _sensorId = uuidv4()
    const packet = {
      sensorId: _sensorId,
      method: 'email',
      destination: 'jason.brewer101@gmail.com'
    }
    await request(app).put('/alerts').send(packet)

    const response = await request(app).get('/alerts')
    const { body: sensorEvents } = response

    expect(sensorEvents.length).toBeGreaterThan(0)
  })
})
