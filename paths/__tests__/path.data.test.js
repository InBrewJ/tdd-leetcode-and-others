const request = require('supertest')
const app = require('../../app')
const { v4: uuidv4 } = require('uuid')
const sequelize = require('sequelize')
const db = require('../../server/models')

// to close the db connection properly
afterAll(() => {
  db.sequelize.close()
})

const generateRandomPacket = () => {
  return {
    sensorId: uuidv4(),
    time: Date.now(),
    value: 123.45
  }
}

const constantSensorIdPacket = (uuid) => {
  return {
    sensorId: uuid,
    time: Date.now(),
    value: 123.45
  }
}

const constantSensorIdPacketWithTime = (uuid, time) => {
  return {
    sensorId: uuid,
    time: +time,
    value: 123.45
  }
}

describe('/data path PUT sanity checks', () => {
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
      time: Date.now(),
      value: 23.23
    }
    const response = await request(app).put('/data').send(packet)

    expect(response.statusCode).toBe(204)
  })

  test('It should respond with a 409 (sensorId, time) pairing is not unique', async () => {
    const oneUuid = uuidv4()
    const oneTime = 20
    const packet = {
      sensorId: oneUuid,
      time: oneTime,
      value: 23.23
    }
    await request(app).put('/data').send(packet)
    const duplicateResponse = await request(app).put('/data').send(packet)

    expect(duplicateResponse.statusCode).toBe(409)
  })
})

describe('/data path GET sanity checks', () => {
  test('It should return all sensor events with no parameters', async () => {
    // Add at least one event

    const packet = {
      sensorId: uuidv4(),
      time: Date.now(),
      value: 23.23
    }
    await request(app).put('/data').send(packet)

    const response = await request(app).get('/data')
    const { body: sensorEvents } = response

    expect(sensorEvents.length).toBeGreaterThan(0)
  })

  test('It should return correct sensor events with a sensorId query', async () => {
    // Add two events from with the same sensor id
    const sensorIdUnderTest = uuidv4()

    await request(app)
      .put('/data')
      .send(constantSensorIdPacket(sensorIdUnderTest))
    await request(app)
      .put('/data')
      .send(constantSensorIdPacket(sensorIdUnderTest))

    // Add four random packets

    await request(app).put('/data').send(generateRandomPacket())
    await request(app).put('/data').send(generateRandomPacket())
    await request(app).put('/data').send(generateRandomPacket())
    await request(app).put('/data').send(generateRandomPacket())

    const response = await request(app).get(
      `/data?sensorId=${sensorIdUnderTest}`
    )
    const { body: sensorEvents } = response

    expect(sensorEvents.length).toBe(2)
  })

  test('it should return json', async () => {
    const sensorIdUnderTest = uuidv4()
    const packet = constantSensorIdPacketWithTime(sensorIdUnderTest, 1000)

    await request(app).put('/data').send(packet)

    const response = await request(app).get(
      `/data?sensorId=${sensorIdUnderTest}`
    )

    const { body: sensorEvents } = response

    // Time is a string because it's a bigint!

    expect(sensorEvents[0]).toEqual(
      expect.objectContaining({
        sensorId: packet.sensorId,
        time: packet.time.toString(),
        value: packet.value
      })
    )
  })

  test('It should return correct sensor events with a [since] query', async () => {
    // Add two events from with the same sensor id
    const sensorIdUnderTest = uuidv4()
    const since = 30

    await request(app)
      .put('/data')
      .send(constantSensorIdPacketWithTime(sensorIdUnderTest, 0))

    await request(app)
      .put('/data')
      .send(constantSensorIdPacketWithTime(sensorIdUnderTest, 20))

    await request(app)
      .put('/data')
      .send(constantSensorIdPacketWithTime(sensorIdUnderTest, 30))

    await request(app)
      .put('/data')
      .send(constantSensorIdPacketWithTime(sensorIdUnderTest, 123))

    const response = await request(app).get(
      `/data?sensorId=${sensorIdUnderTest}&since=${since}`
    )
    const { body: sensorEvents } = response

    expect(sensorEvents.length).toBe(2)
  })

  test('It should return correct sensor events with a [until] query', async () => {
    // Add two events from with the same sensor id
    const sensorIdUnderTest = uuidv4()
    const until = 35

    await request(app)
      .put('/data')
      .send(constantSensorIdPacketWithTime(sensorIdUnderTest, 0))

    await request(app)
      .put('/data')
      .send(constantSensorIdPacketWithTime(sensorIdUnderTest, 20))

    await request(app)
      .put('/data')
      .send(constantSensorIdPacketWithTime(sensorIdUnderTest, 30))

    await request(app)
      .put('/data')
      .send(constantSensorIdPacketWithTime(sensorIdUnderTest, 123))

    const response = await request(app).get(
      `/data?sensorId=${sensorIdUnderTest}&until=${until}`
    )
    const { body: sensorEvents } = response

    expect(sensorEvents.length).toBe(3)
  })
})
