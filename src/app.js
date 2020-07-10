const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')

const app = express()
const data = require('./paths/data')
const alerts = require('./paths/alerts')
const db = require('./server/models')

// The only environment varibles currently supported in a top level
// .env are used for the emailOut alert destination
// When running the server with through Jest, an ethereal.email
// account is used, see:
// https://nodemailer.com/about/

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

// Log requests to the console.
app.use(logger('dev'))

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Converge Lite!')
})

app.use('/data', data)
app.use('/alerts', alerts)

app.on('close', () => db.sequelize.close())

module.exports = app
