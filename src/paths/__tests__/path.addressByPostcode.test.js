const request = require('supertest')
const app = require('../../app')

describe('Search by postcode path', () => {
  test('It should return addresses based on a valid postcode', async () => {
    const response = await request(app).get(
      '/addressByPostcode?PostCode=N166PA'
    )
    expect(response.statusCode).toBe(200)
  })

  test('It should return addresses based on a valid postcode', async () => {
    const response = await request(app).get(
      '/addressByPostcode?PostCode=N166PA'
    )
    const { data = {} } = response.body

    expect(data.addresses.length).toBe(1)
  })
})
