const SensorEvent = require('../models').t_sensor_events

module.exports = {
  create(req, res) {
    const { sensorId = null, time = null, value = null } = req.body

    if (time === null || sensorId === null) {
      res.status(400).send('Corrupt packet')
      done()
    }

    return SensorEvent.create({
      sensorId: req.body.sensorId,
      time: req.body.time,
      value: req.body.value
    })
      .then((sensorEvent) => res.status(204).send(sensorEvent))
      .catch((error) => res.status(400).send(error))
  }
}
