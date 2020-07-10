const { destination } = require('../emailOut')

describe('Email destination', () => {
  test('Should send an email with a valid address, subject and message', async () => {
    const destRes = await destination.send({
      to: 'jason.brewer101@gmail.com',
      subject: 'Alert! There is an email!',
      message: 'Not spam'
    })
    expect(destRes).toEqual({ success: true })
  })

  test('Should NOT send an email with garbage inputs', async () => {
    const destRes = await destination.send({
      to: 3,
      subjects: 'spurious',
      messagez: 'Not spam'
    })
    expect(destRes).toEqual({ success: false })
  })
})
