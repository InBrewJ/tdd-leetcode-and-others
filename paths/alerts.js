const express = require('express')
const router = express.Router()
const alertsController = require('../server/controllers').alerts

// any middleware goes here
router.use(function timeLog(req, res, next) {
  // console.log('Time: ', Date.now())
  next()
})

router.get('/', alertsController.get)
router.put('/', alertsController.put)

module.exports = router
