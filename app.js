//app.js
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')

const app = express()
const data = require('./paths/data')
const db = require('./server/models')

// Log requests to the console.
app.use(logger('dev'))

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Converge Lite!')
})

app.use('/data', data)

module.exports = app

app.on('close', () => db.sequelize.close())
