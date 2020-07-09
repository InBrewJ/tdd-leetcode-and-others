const SUPPORTED_PARAMS = ['sensorId', 'since', 'until']

const getParams = (req) => {}

const requestToFilter = (req) => {
  const { sensorId = null } = req.query || {}

  return sensorId
    ? {
        where: {
          sensorId: sensorId
        }
      }
    : undefined
}

module.exports = {
  requestToFilter
}
