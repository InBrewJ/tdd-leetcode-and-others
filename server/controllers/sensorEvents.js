const SensorEvent = require('../models').t_sensor_events
const errorHandler = require('../../helpers/errorHandler').errorHandler

module.exports = {
  create(req, res) {
    const { sensorId = null, time = null, value = null } = req.body

    if (time === null || sensorId === null) {
      // needs to return json, I believe
      // needs a generic error handler
      // use the packetParser
      res.status(400).send('Corrupt packet')
      done()
    }

    return SensorEvent.create({
      sensorId,
      time,
      value
    })
      .then((sensorEvent) => res.status(204).send(sensorEvent))
      .catch((error) => errorHandler(error, res))
  }
}
