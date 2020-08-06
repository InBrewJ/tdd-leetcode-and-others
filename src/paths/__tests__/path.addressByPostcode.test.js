const request = require('supertest')
const app = require('../../app')

describe('Search by postcode path', () => {
  test('There should be a 200 response with a valid postcode', async () => {
    const response = await request(app).get(
      '/addressByPostcode?PostCode=N166PA'
    )
    expect(response.statusCode).toBe(200)
  })

  test('It should return addresses based on a valid postcode', async () => {
    const response = await request(app).get(
      '/addressByPostcode?PostCode=N166PA'
    )

    console.log(JSON.parse(response.body.data))

    const { latitude = null, longitude = null, addresses = [] } = JSON.parse(
      response.body.data
    )

    expect(addresses.length).toBeGreaterThan(0)
    expect(latitude).not.toBeNull()
    expect(longitude).not.toBeNull()
  })

  test('It should return 10 downing street properly', async () => {
    const response = await request(app).get(
      '/addressByPostcode?PostCode=sw1a2aa'
    )

    console.log(JSON.parse(response.body.data))

    const { latitude = null, longitude = null, addresses = [] } = JSON.parse(
      response.body.data
    )

    expect(addresses.length).toBeGreaterThan(0)
    expect(latitude).not.toBeNull()
    expect(longitude).not.toBeNull()
  })
})
