const express = require('express')
const router = express.Router()
const sensorEventsController = require('../server/controllers').sensorEvents

// any middleware goes here
router.use(function timeLog(req, res, next) {
  // console.log('Time: ', Date.now())
  next()
})

router.get('/', sensorEventsController.get)
router.put('/', sensorEventsController.put)

module.exports = router
