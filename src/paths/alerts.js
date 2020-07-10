const express = require('express')
const router = express.Router()
const sensorAlertsController = require('../server/controllers').sensorAlerts

// any middleware goes here
router.use(function timeLog(req, res, next) {
  // console.log('Time: ', Date.now())
  next()
})

router.get('/', sensorAlertsController.get)
router.put('/', sensorAlertsController.put)

module.exports = router
