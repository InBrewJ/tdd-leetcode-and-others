const errorParser = (errors) => {
  try {
    if (errors[0].type === 'unique violation') {
      return {
        code: 409,
        message: { res: '(sensorId, time) must be unique' }
      }
    }
  } catch (error) {
    console.error('Full error: ', error)
    return {
      code: 400,
      message: { res: 'Packet may be corrupted' }
    }
  }
}

const errorHandler = (error, res) => {
  const { errors = [] } = error
  const { code, message } = errorParser(errors)
  res.status(code).send(message)
}

module.exports = {
  errorHandler
}
