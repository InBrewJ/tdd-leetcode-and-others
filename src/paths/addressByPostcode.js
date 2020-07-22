const express = require('express')
const router = express.Router()
const addressByPostcodeController = require('../server/controllers')
  .addressByPostcode

router.get('/', addressByPostcodeController.get)

module.exports = router
