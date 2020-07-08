const express = require('express')
const router = express.Router()
const sensorEventsController = require('../server/controllers').sensorEvents

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  // console.log('Time: ', Date.now())
  next()
})

router.get('/', function (req, res) {
  res.send('Data path goes here')
})

// define the about route
router.put('/', sensorEventsController.create)

module.exports = router
