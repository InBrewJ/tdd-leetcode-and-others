const { requestToFilter } = require('../../helpers/requestParser')
const SensorAlerts = require('../models').t_sensor_alerts
const errorHandler = require('../../helpers/errorHandler').errorHandler

function put(req, res) {
  const {
    sensorId = null,
    method = null,
    destination = null,
    alertHigh = null,
    alertLow = null
  } = req.body

  if (sensorId === null || method === null) {
    // needs to return json, I believe
    // needs a generic error handler
    // use the packetParser
    res.status(400).send({ res: 'Alerts: Corrupt packet' })
    return
  }

  return SensorAlerts.create({
    sensorId,
    method,
    destination,
    alertHigh,
    alertLow
  })
    .then((sensorAlert) => res.status(204).send(sensorAlert))
    .catch((error) => errorHandler(error, res))
}

function get(req, res) {
  console.log('Getting alerts...')
  const filter = requestToFilter(req)
  return SensorAlerts.findAll(filter)
    .then((sensorAlerts) => res.status(200).send(sensorAlerts))
    .catch((error) => errorHandler(error, res))
}

module.exports = {
  put,
  get
}
