const SensorAlerts = require('../server/models').t_sensor_alerts

const handleAlert = async (value, dataValues) => {
  const { sensorId, alertHigh, alertLow, method, destination: to } = dataValues
  if (value > alertHigh || value < alertLow) {
    try {
      const { destination = undefined } =
        require(`./destinations/${method}Out`) || {}
      const destRes = await destination.send({
        to,
        subject: `There is a problem with your sensor: ${sensorId}`,
        message: `Sensor ${sensorId} has reached value ${value}. `
      })

      return {
        method,
        alertSent: destRes.success,
        sentTo: 'jason.brewer101@gmail.com'
      }
    } catch (e) {
      console.error(`Could not alert user ${to} :: `, e)
    }
  }
  return {
    method,
    alertSent: false,
    sentTo: 'jason.brewer101@gmail.com'
  }
}

const withAlert = async (sensorId, time, value, cb) => {
  try {
    const alertsRes = await SensorAlerts.findAll({
      where: {
        sensorId
      }
    })
    // There should only ever be one result
    // because of the constraints in Postgres
    // If something went wrong, take the first alert
    const [t_sensor_alerts = null] = alertsRes
    if (t_sensor_alerts) {
      // send alert
      const { dataValues } = t_sensor_alerts || {}
      // Do not await this - we don't want the email sending to be blocking
      handleAlert(value, dataValues)
    }

    // console.log(' :: ', dataValues)
  } catch (error) {
    console.log('error in find alerts :: ', error)
  } finally {
    return cb(sensorId, time, value)
  }
}

module.exports = {
  withAlert,
  handleAlert
}
