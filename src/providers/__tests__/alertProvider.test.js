const { withAlert, handleAlert } = require('../alertProvider')

const cb0 = (a, b, c) => {
  return new Promise((resolve, reject) => {
    process.nextTick(() => resolve([1, 2, 3]))
  })
}

const alertReturned = {
  sensorId: '6817f7d5-b127-4e39-8322-92ee73de5901',
  method: 'email',
  destination: 'jason.brewer101@gmail.com',
  alertHigh: 100,
  alertLow: 0
}

const alertReturnedUnsupportedMethod = {
  sensorId: '7817f7d5-b127-4e39-8322-92ee73de5901',
  method: 'zeppelin',
  destination: 'jason.brewer101@gmail.com',
  alertHigh: 100,
  alertLow: 0
}

describe('alertProvider sanity', async () => {
  test('it should return the callback assigned to it', async () => {
    const _sensorId = 'be-ace'
    const res = await withAlert(_sensorId, null, null, cb0)
    expect(res).toEqual([1, 2, 3])
  })
})

describe('handleAlert: email', async () => {
  test('When the value is between low and high, do not send an email', async () => {
    const value = 50
    const res = await handleAlert(value, alertReturned)
    expect(res).toEqual({
      method: 'email',
      alertSent: false,
      sentTo: 'jason.brewer101@gmail.com'
    })
  })

  test('When the value is above high, send an email', async () => {
    const value = 200
    const res = await handleAlert(value, alertReturned)
    expect(res).toEqual({
      method: 'email',
      alertSent: true,
      sentTo: 'jason.brewer101@gmail.com'
    })
  })

  test('When the value is below low, send an email', async () => {
    const value = -100
    const res = await handleAlert(value, alertReturned)
    expect(res).toEqual({
      method: 'email',
      alertSent: true,
      sentTo: 'jason.brewer101@gmail.com'
    })
  })

  test('Do not send an email with an unsupported method', async () => {
    const value = -100
    const res = await handleAlert(value, alertReturnedUnsupportedMethod)
    expect(res).toEqual({
      method: 'zeppelin',
      alertSent: false,
      sentTo: 'jason.brewer101@gmail.com'
    })
  })
})
