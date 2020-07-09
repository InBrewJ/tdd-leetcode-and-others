const express = require('express')
const router = express.Router()
const sensorEventsController = require('../server/controllers').sensorEvents

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  // console.log('Time: ', Date.now())
  next()
})

router.get('/', sensorEventsController.get)

// define the about route
router.put('/', sensorEventsController.put)

module.exports = router
